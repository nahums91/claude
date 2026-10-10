# Nahum.Apc — site de coaching alternance et orientation

Site vitrine statique construit avec [Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com).

> README provisoire : la version complète (déploiement Netlify, nom de domaine,
> Cal.com, Stripe) arrive à la dernière étape.

## Lancer le site en local

Prérequis : [Node.js](https://nodejs.org) 22 ou plus.

```bash
npm install      # une seule fois
npm run dev      # puis ouvre http://localhost:4321
```

## Modifier les offres

Tout est dans **`src/config/offres.ts`** : noms, prix, durées, inclusions, liens
Cal.com / Stripe / e-book. Les infos générales (email, réseaux, mentions légales)
sont dans **`src/config/site.ts`**.

Le texte entre `[CROCHETS]` est un emplacement à compléter.
