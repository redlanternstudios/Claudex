#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function usage() {
  console.error('Usage: node scripts/render-redlantern-doc.mjs <input.html> <output.pdf>');
  process.exit(2);
}

const [, , inputArg, outputArg] = process.argv;
if (!inputArg || !outputArg) usage();

const input = resolve(inputArg);
const output = resolve(outputArg);

if (!existsSync(input)) {
  console.error(`Missing input HTML: ${input}`);
  process.exit(1);
}

if (!existsSync(chromePath)) {
  console.error(`Missing Chrome renderer: ${chromePath}`);
  process.exit(1);
}

const result = spawnSync(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--print-to-pdf-no-header',
  '--no-margins',
  `--print-to-pdf=${output}`,
  pathToFileURL(input).href
], { stdio: 'inherit' });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Rendered RedLantern PDF: ${output}`);
