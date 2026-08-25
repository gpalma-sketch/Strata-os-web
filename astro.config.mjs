// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is the production origin (stratalabai.com, registered at GoDaddy).
// It drives the canonical link, the hreflang alternates and the OG image URL,
// so it must match whatever the DNS actually points at.
export default defineConfig({
  site: 'https://stratalabai.com',
  trailingSlash: 'ignore',
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
