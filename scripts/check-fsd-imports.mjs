import { readdir, readFile } from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';

const root = resolve('src');
const layerRank = { shared: 0, entities: 1, features: 2, widgets: 3, pages: 4, app: 5 };
const violations = [];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? collectFiles(path) : [path];
    }),
  );
  return nested.flat();
}

function checkPublicApi(importPath, file) {
  const parts = importPath.slice(2).split('/');
  const [layer] = parts;

  if (['pages', 'widgets', 'features', 'entities'].includes(layer) && parts.length > 2) {
    violations.push(`${file}: deep import '${importPath}', use ${parts.slice(0, 2).join('/')}`);
  }

  if (layer === 'shared' && parts.length > 3) {
    violations.push(`${file}: deep shared import '${importPath}', use a segment public API`);
  }
}

function checkLayerDirection(importPath, file) {
  const sourceParts = file.split('/');
  const sourceLayer = sourceParts[0];
  const targetLayer = importPath.slice(2).split('/')[0];

  if (!(sourceLayer in layerRank) || !(targetLayer in layerRank)) return;
  if (layerRank[targetLayer] >= layerRank[sourceLayer]) {
    violations.push(`${file}: layer '${sourceLayer}' cannot import '${targetLayer}'`);
  }
}

for (const absolutePath of await collectFiles(root)) {
  if (!['.ts', '.tsx'].includes(extname(absolutePath))) continue;

  const file = relative(root, absolutePath).split(sep).join('/');
  const source = await readFile(absolutePath, 'utf8');
  const imports = [...source.matchAll(/from\s+['"](@\/[^'"]+)['"]/g)].map((match) => match[1]);

  for (const importPath of imports) {
    checkPublicApi(importPath, file);
    checkLayerDirection(importPath, file);
  }
}

if (violations.length) {
  console.error(`FSD import violations:\n${violations.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log('FSD layer directions and public API imports are valid.');
