// Pre-build script: convert content/docs/*.md → src/docs/*.md.vue
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { existsSync } from 'node:fs';

const DOCS_DIR = 'content/docs';
const OUTPUT_DIR = 'src/docs';

// Simple markdown → HTML converter (handles headings, code, lists, links, bold)
function mdToHtml(md) {
  let html = md
    // Escape HTML entities
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Code blocks (fenced)
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Line breaks → <br>
    .replace(/\n/g, '<br>');
  // Clean up double <br> after block elements
  html = html.replace(/(<\/(?:h[1-3]|pre|p|ul|ol|li|blockquote)>)<br>/g, '$1');
  html = html.replace(/<br>(<h[1-3]|<pre|<ul|<ol)/g, '$1');
  return html;
}

async function main() {
  if (!existsSync(DOCS_DIR)) {
    console.error(`[md2vue] docs dir not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(DOCS_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  for (const file of mdFiles) {
    const name = basename(file, '.md');
    const md = await readFile(join(DOCS_DIR, file), 'utf-8');
    const html = mdToHtml(md);
    const vue = `<template>\n  <div class="doc-content prose prose-invert max-w-none">\n    ${html}\n  </div>\n</template>\n`;
    await writeFile(join(OUTPUT_DIR, `${name}.md.vue`), vue, 'utf-8');
    console.log(`[md2vue] → src/docs/${name}.md.vue`);
  }

  console.log(`[md2vue] Done. ${mdFiles.length} files converted.`);
}

main().catch(err => { console.error(err); process.exit(1); });
