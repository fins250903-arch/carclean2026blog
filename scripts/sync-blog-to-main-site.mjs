/**
 * Copy blog posts from carclean2026blog into base_template (production site).
 * Run from repo root: node scripts/sync-blog-to-main-site.mjs
 */
import { cp, rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.resolve(__dirname, '..');
const mainRoot = path.resolve(blogRoot, '..', 'base_template');

const sources = [
	{ from: path.join(blogRoot, 'src/content/blog'), to: path.join(mainRoot, 'src/content/blog') },
	{ from: path.join(blogRoot, 'public/posts'), to: path.join(mainRoot, 'public/posts') },
];

for (const { from, to } of sources) {
	await rm(to, { recursive: true, force: true });
	await mkdir(path.dirname(to), { recursive: true });
	await cp(from, to, { recursive: true });
	console.log(`Synced ${from} -> ${to}`);
}

console.log('Done. Deploy base_template (carinteriorcleaning.jp) to publish new posts.');
