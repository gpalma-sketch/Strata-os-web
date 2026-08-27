// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { CLAVES_RUTA, rutas } from './src/data/rutas';

// `site` is the production origin (stratalabai.com, registered at GoDaddy).
// It drives the canonical link, the hreflang alternates and the OG image URL,
// so it must match whatever the DNS actually points at.
export default defineConfig({
  site: 'https://stratalabai.com',
  trailingSlash: 'ignore',
  // Todas las páginas se siguen pre-renderizando en el build; el adaptador
  // solo existe para las dos rutas de `src/pages/api/`, que llevan
  // `prerender = false` y son las únicas que se ejecutan en el servidor.
  // Ahí es donde vive la clave de Supabase, así que nunca llega al navegador.
  adapter: vercel(),
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-GB' },
      },
      /**
       * LAS CINCO PÁGINAS TIENEN SLUG DISTINTO EN CADA IDIOMA (/precios ↔
       * /en/pricing), y la opción `i18n` de la integración empareja páginas
       * quitando el prefijo de idioma y comparando lo que queda. Con slugs
       * localizados eso no empareja nada: cada página se declararía a sí misma
       * como su única versión, y el buscador no sabría que son la misma.
       *
       * Aquí se le da la pareja, leída del MISMO mapa que usan el menú, el
       * selector ES/EN y los <link rel="alternate"> de `Base.astro`. Es lo que
       * evita que el sitemap y el HTML digan cosas distintas de la misma URL.
       */
      serialize(item) {
        const url = new URL(item.url);
        const ruta = url.pathname.replace(/\/+$/, '') || '/';
        const clave = CLAVES_RUTA.find(
          (c) => rutas[c].es.slug === ruta || `/en${rutas[c].en.slug}` === ruta
        );
        if (clave) {
          // La barra final se copia del `<loc>` que genera la integración: un
          // sitemap que declare /precios/ como página y /precios como su propia
          // alternativa está diciendo que son dos URL distintas.
          const barra = item.url.endsWith('/') ? '/' : '';
          // El fichero lleva `// @ts-check`: sin esta anotación `loc` es `any`
          // implícito y `astro check` lo cuenta como error. Es la única pieza
          // de este reparto que vive en un `.mjs`, así que no hereda los tipos
          // que sí tienen los `.astro` y los `.ts`.
          /** @param {'es' | 'en'} loc */
          const href = (loc) =>
            new URL(
              (loc === 'es' ? rutas[clave].es.slug : `/en${rutas[clave].en.slug}`) + barra,
              url.origin
            ).href;
          item.links = [
            { lang: 'es-ES', url: href('es') },
            { lang: 'en-GB', url: href('en') },
          ];
        }
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Static build: every <Image /> is pre-rendered to webp at build time.
    responsiveStyles: true,
  },
});
