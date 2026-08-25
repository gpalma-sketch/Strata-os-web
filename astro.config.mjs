// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

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
