/**
 * robots.txt généré automatiquement à partir de l'adresse du site
 * (SITE_URL dans src/config/site.ts) : rien à modifier ici.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
