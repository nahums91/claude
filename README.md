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

## Recevoir les demandes par e-mail

Les boutons « Faire une demande » et « Demander un diagnostic » mènent au
formulaire **`/demande`** (la formule est déjà sélectionnée). Il fonctionne avec
**Netlify Forms**, gratuit jusqu'à 100 demandes par mois, sans aucun code serveur.

Une fois le site déployé sur Netlify :

1. Ouvre ton site dans Netlify, puis **Forms** : le formulaire « demande » apparaît
   automatiquement après le premier déploiement.
2. Va dans **Site configuration > Notifications > Emails and webhooks >
   Form submission notifications**, puis **Add notification > Email notification**.
3. Indique ton adresse (ex. snkcontent1@gmail.com) et choisis le formulaire « demande ».

Chaque demande arrive alors dans ta boîte mail ; tu réponds au client avec tes créneaux.
Les demandes restent aussi consultables dans l'onglet **Forms** de Netlify.
