import { readFileSync, writeFileSync, existsSync } from 'fs';

const file = './build/browserUtils.js';
if (existsSync(file)) {
  const content = readFileSync(file, 'utf8').replace(/export \{\};?\n?/g, '');
  writeFileSync(file, content);
}
