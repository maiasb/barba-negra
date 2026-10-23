# Barba Negra - página de captura

Next.js (export estático) + GSAP. Dados do negócio em `src/data/site.ts`.

```bash
npm install
npm run dev
```

## Publicação (GitHub Pages)

```bash
NEXT_PUBLIC_SITE_URL=https://barbanegra.odevmaia.com.br npm run build
touch out/.nojekyll
# publicar o conteúdo de out/ na branch gh-pages
```

O domínio é `barbanegra.odevmaia.com.br` (CNAME no DNS para `maiasb.github.io`; `public/CNAME` mantém o domínio no Pages). Sem `NEXT_PUBLIC_BASE_PATH`, o build usa a raiz.
