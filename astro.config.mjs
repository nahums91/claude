// Configuration Astro.
// - site : l'adresse publique du site. Elle sert au sitemap, aux URL canoniques
//   et aux images Open Graph. À remplacer par ton nom de domaine quand tu l'auras.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/config/site.ts';

export default defineConfig({
  site: SITE_URL,
  // URL sans slash final : /alternance plutôt que /alternance/
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // La page de confirmation de commande n'a rien à faire dans Google.
      filter: (page) => !page.includes('/commande-essentiel'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
