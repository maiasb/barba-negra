# Barba Negra - página de captura

Next.js (export estático) + GSAP. Dados do negócio em `src/data/site.ts`.

```bash
npm install
npm run dev
```

## Publicação (GitHub Pages)

```bash
NEXT_PUBLIC_BASE_PATH=/barba-negra NEXT_PUBLIC_SITE_URL=https://maiasb.github.io/barba-negra npm run build
touch out/.nojekyll
# publicar o conteúdo de out/ na branch gh-pages
```

Com domínio próprio, build sem `NEXT_PUBLIC_BASE_PATH` e com `NEXT_PUBLIC_SITE_URL` do domínio.
