# TODO - Barba Negra

Lista única de pendências do projeto. Não deixe TODO espalhado no código: registre aqui.

## Dados do cliente

- [ ] **Barbeiros:** trocar "Barbeiro 1, 2 e 3" pelos nomes e fotos reais (`BARBEIROS` em `src/data/site.ts`). As avaliações do Google citam Júnior, Thiago e Rafael; confirmar se são a equipe atual.
- [ ] **Preços:** decidir se os valores dos serviços entram na página (hoje não aparecem, pois não constam no Instagram).
- [ ] **Fotos originais:** pedir ao cliente as fotos em alta resolução (hero com 1600 px ou mais; cards com cerca de 1000 px). As do Instagram têm 640 px.
- [ ] **Logo:** obter em SVG ou PNG de alta resolução (o atual é um recorte de 100 px da foto de perfil).

## SEO (código)

- [ ] Adicionar coordenadas (`geo`: -1.2848619, -47.9265733) ao JSON-LD em `src/app/page.tsx`.
- [ ] Deixar "Barbearia em Castanhal" como texto real do `h1` (hoje está só no `aria-label`) em `src/components/Hero.tsx`.
- [ ] Alinhar o sitemap com o canonical (URL com barra final) em `src/app/sitemap.ts`.
- [ ] Incluir `priceRange` e `areaServed` no JSON-LD (depende dos dados do cliente).
- [ ] Criar uma imagem dedicada para compartilhamento (Open Graph, 1200x630).

## SEO (fora do código)

- [ ] Reivindicar e manter completo o perfil no Google Meu Negócio (site, fotos, horários, serviços).
- [ ] Contratar domínio próprio. Depois: build sem `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_SITE_URL` com o domínio, e configurar o domínio no Pages.
- [ ] Enviar o sitemap e pedir indexação no Google Search Console.
- [ ] Manter nome, endereço e telefone idênticos no site, no Google e no Instagram.

## Imagens

- [ ] Script de conversão para WebP/AVIF com `srcset` em 2 ou 3 tamanhos (o export estático não otimiza imagens sozinho).
- [ ] Remover do repositório as imagens sem uso: `hero-salao.jpg`, `post4.jpg`, `post6.jpg`. Decidir sobre `banner.jpg` (4,8 MB, original; o site usa `hero-banner.jpg`).
- [ ] Trocar a foto do formulário (`form.jpeg`, 736 px) por uma de maior resolução, se houver.

## Visual e testes

- [ ] Testar o layout no celular (não foi testado; o navegador de teste não redimensionou).
- [ ] Conferir visualmente as seções Unidade e rodapé (não foram vistas renderizadas).
- [ ] Melhorar o contraste do subtítulo do agendamento, que passa por cima do pente na foto do formulário.

## Infraestrutura

- [ ] Atualizar o workflow `.github/workflows/deploy.yml` quando o GitHub encerrar o suporte a Node 20 nas actions e migrar o `ubuntu-latest` para o Ubuntu 26.
- [ ] Apagar a branch `gh-pages`, que não é mais usada desde a troca para o deploy por GitHub Actions.
- [ ] Opcional: reescrever a mensagem do commit `06dcbe7`, que descreve só uma parte do que contém (exige force-push na `main`).
