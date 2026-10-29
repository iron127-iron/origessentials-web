// Pre-build script: convert content/docs/*.md → src/docs/*.md.vue
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { existsSync } from 'node:fs';

const DOCS_DIR = 'content/docs';
const OUTPUT_DIR = 'src/docs';

/** Simple, correct markdown → HTML converter */
function mdToHtml(md) {
  // Strip YAML frontmatter
  md = md.replace(/^---\n[\s\S]*?\n---\n?/, '');

  const lines = md.split('\n');
  const htmlLines = [];
  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer = [];
  let inList = false;

  function flushCode() {
    if (codeBuffer.length > 0) {
      const escaped = codeBuffer.join('\n');
      htmlLines.push(`<pre><code class="language-${codeLang || 'text'}">${escaped}</code></pre>`);
      codeBuffer = [];
    }
    inCodeBlock = false;
  }

  function flushList() {
    if (inList) {
      htmlLines.push(inList === 'ul' ? '</ul>' : '</ol>');
      inList = false;
    }
  }

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  for (const line of lines) {
    // Code fence
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.slice(3).trim();
        codeBuffer = [];
      } else {
        flushCode();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(esc(line));
      continue;
    }

    flushList();

    // Empty line
    if (line.trim() === '') continue;

    // Headings
    if (line.startsWith('### ')) { htmlLines.push(`<h3>${esc(line.slice(4))}</h3>`); continue; }
    if (line.startsWith('## '))  { htmlLines.push(`<h2>${esc(line.slice(3))}</h2>`); continue; }
    if (line.startsWith('# '))   { htmlLines.push(`<h1>${esc(line.slice(2))}</h1>`); continue; }

    // Blockquote
    if (line.startsWith('> ')) { htmlLines.push(`<blockquote><p>${esc(line.slice(2))}</p></blockquote>`); continue; }

    // Unordered list
    if (line.startsWith('- ')) {
      if (!inList) { htmlLines.push('<ul>'); inList = 'ul'; }
      htmlLines.push(`<li>${processInline(esc(line.slice(2)))}</li>`);
      continue;
    }

    // Ordered list
    const orderedMatch = line.match(/^(\d+)\. (.+)$/);
    if (orderedMatch) {
      if (!inList) { htmlLines.push('<ol>'); inList = 'ol'; }
      htmlLines.push(`<li>${processInline(esc(orderedMatch[2]))}</li>`);
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) { htmlLines.push('<hr>'); continue; }

    // Table
    if (line.includes('|')) {
      htmlLines.push(`<p>${processInline(esc(line))}</p>`);
      continue;
    }

    // Paragraph
    htmlLines.push(`<p>${processInline(esc(line))}</p>`);
  }

  flushCode();
  flushList();

  return htmlLines.join('\n');
}

function processInline(text) {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Links
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return text;
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
