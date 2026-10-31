# Nahum.Apc — site de coaching alternance et orientation

Site vitrine statique construit avec [Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com).
Rapide (Lighthouse mobile : 98 à 100 en performance, 100 en accessibilité), sans base de
données et sans serveur à maintenir. Hébergement gratuit sur Netlify.

---

## Sommaire

1. [Lancer le site sur ton ordinateur](#1-lancer-le-site-sur-ton-ordinateur)
2. [Modifier le contenu](#2-modifier-le-contenu)
3. [Mettre le site en ligne sur Netlify](#3-mettre-le-site-en-ligne-sur-netlify)
4. [Recevoir les demandes par e-mail](#4-recevoir-les-demandes-par-e-mail)
5. [Encaisser la formule Prêt avec Stripe](#5-encaisser-la-formule-prêt-avec-stripe)
6. [Brancher ton nom de domaine](#6-brancher-ton-nom-de-domaine)
7. [Avant la mise en ligne : la liste à cocher](#7-avant-la-mise-en-ligne--la-liste-à-cocher)
8. [Comment le site est organisé](#8-comment-le-site-est-organisé)

---

## 1. Lancer le site sur ton ordinateur

Prérequis : [Node.js](https://nodejs.org) version 22 ou plus (prends la version « LTS »).

```bash
npm install      # une seule fois, installe les outils
npm run dev      # lance le site : ouvre http://localhost:4321
```

Chaque modification d'un fichier s'affiche instantanément dans le navigateur.

Autres commandes utiles :

```bash
npm run build    # fabrique la version finale du site dans le dossier dist/
npm run preview  # affiche cette version finale, pour vérifier avant de publier
npm run check    # vérifie qu'il n'y a pas d'erreur dans le code
```

---

## 2. Modifier le contenu

Tu n'as besoin de toucher qu'à **trois fichiers**, dans `src/config/`. Le texte entre
`[CROCHETS]` est un emplacement à compléter.

### `offres.ts` : tes offres et tes prix

C'est ici que tu changes un prix, une durée, une inclusion ou un lien. Le site se met à
jour partout tout seul : cartes, tableau comparatif, page de demande, CGV, données Google.

- **Formules du parcours alternance** : Prêt, Préparé, Accompagné.
  - `prix` : un nombre (ex. `117`) ou `'[PRIX]'` tant qu'il n'est pas fixé.
  - `precisionPrix` : petite mention à côté du prix (ex. `'Prix de lancement'`). Laisse `''` pour rien afficher.
  - `miseEnAvant: true` : la carte en bleu nuit avec le badge « Recommandée ».
- **Tableau comparatif** (`comparatif`) : `true` = inclus, `false` = non inclus, ou un texte court.
- **Prestations à la carte** (`aLaCarte`) : CV, lettre, LinkedIn, entretiens. Ajoute ou retire des lignes librement.
- **Orientation** : orientation scolaire et professionnelle.
- **E-book** (`ebook`) : titre, prix, contenu, lien d'achat (Systeme.io, Gumroad ou Stripe).
  Tant que le lien n'est pas renseigné, le bouton affiche « Bientôt disponible ».
- **Envoi des documents de la formule Prêt** (`commande`) : vide par défaut, le client envoie
  ses documents par e-mail. Si tu colles un lien de formulaire (ex. Tally), un bouton vers ce
  formulaire remplace l'adresse e-mail.

Si tu fais une erreur de format (un prix négatif, un lien sans `https://`…), la commande
`npm run build` s'arrête et t'indique quoi corriger, au lieu de publier une page cassée.

### `site.ts` : ton identité

- `SITE_URL` : l'adresse du site (à changer quand tu auras ton nom de domaine, voir étape 6).
- `boutonPrincipal` : le texte et le lien du bouton principal (en-tête, hero, barre mobile).
- `profil` : la section « Qui suis-je ? » (rôle, phrase de présentation, parcours en frise).
- `photoHero` et `profil.photo` : tes photos, si un jour tu en veux (dépose-les dans `public/`).
- `contact`, `reseaux` : e-mail et réseaux sociaux (laisse `''` pour masquer un réseau).
- `legal` : nom, statut, SIRET, adresse, mention TVA, médiateur. Ces informations remplissent
  automatiquement les mentions légales, les CGV et le pied de page.

### `contenus.ts` : sections de l'accueil

- `etapes` : « Comment ça se passe » en 3 étapes.
- `temoignages` : 3 témoignages (avec l'accord écrit des personnes).
- `faq` : les questions et réponses. Dès qu'une question est rédigée, elle est aussi envoyée
  à Google (données structurées FAQPage).

### Autres textes

- **Sous-titre du hero** : `src/components/accueil/Hero.astro`, ligne `[SOUS-TITRE DU HERO…]`.
- **Pages légales** : `src/pages/mentions-legales.astro`, `cgv.astro`, `confidentialite.astro`.
- **Couleurs et polices** : tout en haut de `src/styles/global.css`.

### Tutoiement ou vouvoiement

- **Tu** : hero, parcours alternance, e-book, page de commande.
- **Vous** : parcours orientation (parents, reconversions) et pages légales.
- **Neutre** (ni « tu » ni « vous ») : sections communes, formulaire de demande, 404.

---

## 3. Mettre le site en ligne sur Netlify

Gratuit, et le site se met à jour tout seul à chaque modification envoyée sur GitHub.

1. Crée un compte sur [netlify.com](https://www.netlify.com) en te connectant avec GitHub.
2. **Add new site > Import an existing project > GitHub**, puis choisis ce dépôt.
3. Netlify lit le fichier `netlify.toml` : il n'y a rien à régler. Clique sur **Deploy**.
4. Au bout d'une minute, ton site est en ligne à une adresse du type `xxx.netlify.app`.
   Dans **Site configuration > Change site name**, renomme-le en `nahum-apc`, pour obtenir
   `nahum-apc.netlify.app` (l'adresse déjà prévue dans `site.ts`).

---

## 4. Recevoir les demandes par e-mail

Les boutons « Faire une demande » mènent au formulaire **`/demande`**, avec la formule déjà
sélectionnée. Il fonctionne avec **Netlify Forms**, gratuit jusqu'à 100 demandes par mois.

Une fois le site déployé :

1. Dans Netlify, ouvre ton site puis **Forms** : le formulaire « demande » apparaît
   automatiquement après le premier déploiement.
2. Va dans **Site configuration > Notifications > Emails and webhooks >
   Form submission notifications**, puis **Add notification > Email notification**.
3. Indique ton adresse (ex. snkcontent1@gmail.com) et choisis le formulaire « demande ».

Chaque demande arrive dans ta boîte mail, avec l'adresse du client : tu lui réponds avec tes
créneaux. Les demandes restent aussi consultables dans l'onglet **Forms** de Netlify.

> Fais une demande de test après la mise en ligne pour vérifier que tu la reçois bien.

---

## 5. Encaisser la formule Prêt avec Stripe

La formule Prêt (87 €) se paie directement en ligne, avec un **lien de paiement Stripe**.

1. Crée un compte sur [stripe.com](https://stripe.com) et complète ton profil d'entreprise
   (il faut ton SIRET).
2. **Catalogue de produits > Ajouter un produit** : « Formule Prêt », 87 €, paiement unique.
3. **Liens de paiement > Nouveau** : choisis ce produit.
   - Onglet **Après le paiement** : « Ne pas afficher la page de confirmation » puis
     **Rediriger vers votre site** : `https://ton-domaine/commande`.
   - Coche la collecte de l'adresse e-mail du client.
4. Copie le lien (`https://buy.stripe.com/…`) et colle-le dans `offres.ts`, à la place de
   `https://buy.stripe.com/[LIEN-ESSENTIEL]`.

Après le paiement, le client arrive sur `/commande` : la page lui indique quoi t'envoyer
(CV, lettre, lien LinkedIn, poste visé) et à quelle adresse.

Pour les autres formules, tu peux créer de la même façon un lien de paiement par formule et
l'envoyer au client par e-mail avec tes créneaux.

---

## 6. Brancher ton nom de domaine

1. Achète ton nom de domaine (OVH, Gandi, Namecheap… comptez environ 10 € par an).
2. Dans Netlify : **Domain management > Add a domain**, puis saisis ton domaine.
3. Netlify t'indique les réglages DNS à faire chez ton registraire. Le plus simple est de
   choisir **Netlify DNS** et de remplacer les « serveurs DNS » chez ton registraire par ceux
   donnés par Netlify. Compte jusqu'à 24 h pour la prise en compte.
4. Le certificat HTTPS (le cadenas) est créé automatiquement et gratuitement.
5. Mets à jour `SITE_URL` dans `src/config/site.ts` (ex. `'https://www.nahum-apc.fr'`) et
   renvoie la modification sur GitHub : le sitemap, `robots.txt` et les aperçus de partage
   utiliseront la nouvelle adresse.
6. Pense aussi à changer l'adresse de redirection dans ton lien de paiement Stripe.

---

## 7. Avant la mise en ligne : la liste à cocher

- [ ] Remplir le sous-titre du hero.
- [ ] Remplir `site.legal` : nom, statut, SIRET, adresse, mention TVA, date.
- [ ] **Adhérer à un médiateur de la consommation** (obligatoire pour vendre à des
      particuliers) et l'indiquer dans `site.legal.mediateur`.
- [ ] Compléter les passages entre crochets des **CGV** et de la **politique de
      confidentialité**, puis les faire relire.
- [ ] Coller le lien de paiement Stripe de la formule Prêt.
- [ ] Ajouter le lien LinkedIn (ou le laisser vide pour le masquer).
- [ ] Ajouter de vrais témoignages et les questions de la FAQ (ou les retirer de l'accueil
      dans `src/pages/index.astro` en attendant).
- [ ] Compléter l'e-book, ou laisser « Bientôt disponible ».
- [ ] Activer les notifications e-mail du formulaire (étape 4) et faire une demande de test.
- [ ] Vérifier l'aperçu de partage avec l'[outil de LinkedIn](https://www.linkedin.com/post-inspector/).

Pour retrouver tous les emplacements à compléter, cherche `[` dans le dossier `src/`.

---

## 8. Comment le site est organisé

```
src/
  config/          ← tes contenus (offres, identité, FAQ…) : les seuls fichiers à modifier
  pages/           ← une page = un fichier (index = accueil, alternance, orientation,
                     demande, commande, pages légales, 404)
  components/      ← les briques réutilisables (boutons, cartes, en-tête, tableau…)
    accueil/       ← les sections de la page d'accueil
  layouts/         ← le gabarit commun (balises SEO, en-tête, pied de page)
  styles/          ← la charte graphique (couleurs, polices, animations)
public/            ← fichiers servis tels quels (favicon, image de partage og.png)
netlify.toml       ← réglages de déploiement Netlify
```

**Choix techniques**

- **Astro** génère des pages HTML statiques, presque sans JavaScript : le site s'affiche vite,
  même en 4G depuis TikTok ou Instagram.
- **Tailwind CSS** pour la mise en forme ; la charte (couleurs, polices) est centralisée dans
  `src/styles/global.css`.
- **Polices hébergées sur le site** (Plus Jakarta Sans, Geist Mono, Instrument Serif) : plus
  rapide, et aucune donnée envoyée à Google Fonts.
- **Animations** en CSS, désactivées automatiquement si le visiteur a activé « Réduire les
  animations » sur son téléphone.
- **Pas de cookies ni de traceurs** : pas besoin de bandeau cookies. Si tu ajoutes un jour un
  pixel Meta ou TikTok, il faudra un bandeau de consentement et mettre à jour la politique de
  confidentialité.
- **SEO** : balises title et description par page, aperçus de partage (Open Graph), sitemap,
  `robots.txt`, données structurées (Organization, Service par formule, FAQPage).
