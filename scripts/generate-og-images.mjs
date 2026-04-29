import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const WIDTH = 1200;
const HEIGHT = 630;
const PAGE_DIR = path.join(ROOT, 'src/pages');
const STYLE_PATH = path.join(ROOT, 'src/styles/global.css');
const LOGO_PATH = path.join(ROOT, 'public/assets/brand/full-logo.svg');
const OUTPUT_DIR = path.join(ROOT, 'dist/assets/og');

const site = {
  brand: 'ug4v.com',
  fallbackDescription: 'Be intelligent. Be lazy. Be reality. BEYOND GEKIERO.',
};

const css = await fs.readFile(STYLE_PATH, 'utf8');
const tokens = Object.fromEntries(
  [...css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi)].map((match) => [match[1], match[2].trim()]),
);
const colorScheme = css.match(/color-scheme:\s*(dark|light)/)?.[1] ?? 'dark';
const logoData = Buffer.from(await fs.readFile(LOGO_PATH)).toString('base64');

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const pageFiles = (await fs.readdir(PAGE_DIR)).filter((file) => file.endsWith('.mdx')).sort();

for (const file of pageFiles) {
  const source = await fs.readFile(path.join(PAGE_DIR, file), 'utf8');
  const frontmatter = readFrontmatter(source);
  const slug = file === 'index.mdx' ? 'index' : file.replace(/\.mdx$/, '');
  const title = frontmatter.title ?? site.brand;
  const description = frontmatter.description ?? site.fallbackDescription;
  const image = renderOgImage({
    title,
    description,
    slug,
    site,
    tokens,
    colorScheme,
    logoData,
  });

  await sharp(Buffer.from(image)).png().toFile(path.join(OUTPUT_DIR, `${slug}.png`));
}

function readFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2].trim().replace(/^['"]|['"]$/g, '')]),
  );
}

function renderOgImage({ title, description, slug, site, tokens, colorScheme, logoData }) {
  const dark = colorScheme === 'dark';
  const surface = token(tokens, 'surface', dark ? '#100c1a' : '#fbf4ff');
  const surfaceLow = token(tokens, 'surface-container-low', dark ? '#151121' : '#f5eeff');
  const surfaceHigh = token(tokens, 'surface-container-highest', dark ? '#282238' : '#e2d8f5');
  const text = token(tokens, 'on-surface', dark ? '#ede4fa' : '#312c3c');
  const muted = token(tokens, 'on-surface-variant', dark ? '#afa8bc' : '#5e596b');
  const primary = token(tokens, 'primary', dark ? '#c39bff' : '#713fb8');
  const secondary = token(tokens, 'secondary', dark ? '#ff6c95' : '#b60051');
  const tertiary = token(tokens, 'tertiary', dark ? '#81ecff' : '#006571');
  const titleLines = wrapText(title, 15, 3);
  const descriptionLines = wrapText(description, 33, 3);
  const routeLabel = slug === 'index' ? '/' : `/${slug}/`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${surface}"/>
      <stop offset="0.54" stop-color="${surfaceLow}"/>
      <stop offset="1" stop-color="${dark ? '#0b0712' : '#ffffff'}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${primary}"/>
      <stop offset="0.52" stop-color="${tertiary}"/>
      <stop offset="1" stop-color="${secondary}"/>
    </linearGradient>
    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="${primary}" flood-opacity="${dark ? 0.22 : 0.18}"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <path d="M 0 502 C 200 460 320 590 540 536 C 760 482 830 392 1200 438 L 1200 630 L 0 630 Z" fill="${surfaceHigh}" opacity="${dark ? 0.52 : 0.66}"/>
  <path d="M 84 532 L 1116 532" stroke="url(#accent)" stroke-width="6" stroke-linecap="round"/>
  <g filter="url(#soft-shadow)">
    <rect x="84" y="76" width="1032" height="478" rx="32" fill="${surfaceHigh}" fill-opacity="${dark ? 0.62 : 0.78}" stroke="${primary}" stroke-opacity="${dark ? 0.2 : 0.16}"/>
  </g>
  <image href="data:image/svg+xml;base64,${logoData}" x="100" y="102" width="224" height="96" preserveAspectRatio="xMinYMid meet"/>
  <text x="1048" y="142" fill="${muted}" font-family="${fontStack()}" font-size="24" font-weight="800" text-anchor="end" letter-spacing="0">${escapeXml(routeLabel)}</text>
  ${titleLines
    .map(
      (line, index) =>
        `<text x="112" y="${292 + index * 72}" fill="${text}" font-family="${fontStack()}" font-size="${titleLines.length > 2 ? 58 : 64}" font-weight="800" letter-spacing="0">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}
  ${descriptionLines
    .map(
      (line, index) =>
        `<text x="116" y="${412 + index * 38}" fill="${muted}" font-family="${fontStack()}" font-size="27" font-weight="700" letter-spacing="0">${escapeXml(line)}</text>`,
    )
    .join('\n  ')}
</svg>`;
}

function token(tokens, key, fallback) {
  return tokens[key] ?? fallback;
}

function fontStack() {
  return 'LINE Seed JP, Hiragino Sans, Yu Gothic, system-ui, sans-serif';
}

function wrapText(input, maxUnits, maxLines) {
  const words = [...input];
  const lines = [];
  let line = '';
  let units = 0;

  for (const char of words) {
    const weight = /[ -~]/.test(char) ? 0.55 : 1;
    if (units + weight > maxUnits && line) {
      lines.push(line);
      line = '';
      units = 0;
    }
    line += char;
    units += weight;
  }

  if (line) {
    lines.push(line);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[。、,.，\s]+$/, '')}...`;
  }

  return lines;
}

function escapeXml(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
