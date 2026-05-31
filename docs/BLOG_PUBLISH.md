# Blog publishing (technical)

**Editors:** use [BLOG_EDITOR.md](./BLOG_EDITOR.md) (Japanese, Decap CMS).

## Architecture

1. **carclean2026blog** — CMS repo; edit at `/admin`, push to `main`
2. **GitHub Action** — syncs `src/content/blog` + `public/posts` → `fins250903-arch/carclean0511`
3. **carclean0511** — Vercel production for https://carinteriorcleaning.jp/blog/

Manual sync (if Action is disabled):

```bash
npm run sync:main
```

Then deploy `base_template` / `carclean0511` on Vercel.
