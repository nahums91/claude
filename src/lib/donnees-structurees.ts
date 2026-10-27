/**
 * Données structurées (schema.org) pour Google : une fiche « Service » par
 * formule, avec son prix dès qu'il est fixé dans offres.ts.
 */
import type { Parcours } from '../config/offres';

export function servicesDuParcours(p: Parcours, siteUrl: URL | undefined) {
  return p.formules.map((f) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${p.titre} : formule ${f.nom}`,
    description: f.description,
    serviceType: p.id === 'alternance' ? 'Coaching alternance' : 'Orientation scolaire et professionnelle',
    areaServed: { '@type': 'Country', name: 'France' },
    provider: { '@id': `${siteUrl}#organisation` },
    ...(typeof f.prix === 'number'
      ? { offers: { '@type': 'Offer', price: f.prix, priceCurrency: 'EUR' } }
      : {}),
  }));
}
