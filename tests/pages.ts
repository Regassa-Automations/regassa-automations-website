import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/** Every built HTML page in dist/, as a site path with a trailing slash ("/", "/work/", "/404.html"). */
export function builtPages(distDir = 'dist'): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.html')) {
        const rel = relative(distDir, full).split(sep).join('/');
        out.push(rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, ''));
      }
    }
  };
  walk(distDir);
  return out.sort();
}
