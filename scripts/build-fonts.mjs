import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = join(root, 'node_modules/@fontsource-variable/m-plus-1');
const filesDir = join(packageDir, 'files');
const outFontsDir = join(root, 'public/fonts');
const outCssPath = join(root, 'public/fonts.css');

mkdirSync(outFontsDir, { recursive: true });
cpSync(filesDir, outFontsDir, { recursive: true });

const wghtCss = readFileSync(join(packageDir, 'wght.css'), 'utf8');
const rewritten = wghtCss
  .replaceAll("font-family: 'M PLUS 1 Variable'", "font-family: 'M PLUS 1'")
  .replaceAll('url(./files/', 'url(/fonts/');

writeFileSync(outCssPath, rewritten);
console.log(`Wrote ${outCssPath} and copied fonts to ${outFontsDir}`);
