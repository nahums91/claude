/**
 * Informations générales du site : identité, contact, réseaux, mentions légales.
 *
 * Tout ce qui est entre [CROCHETS] reste à compléter.
 * Les offres (prix, formules, liens de réservation) sont dans `offres.ts`.
 */

/**
 * Adresse publique du site, sans slash final.
 * Tant que tu n'as pas de nom de domaine, on utilise l'adresse gratuite fournie
 * par Netlify. Remplace-la par exemple par 'https://www.nahum-apc.fr'.
 */
export const SITE_URL = 'https://nahum-apc.netlify.app';

export const site = {
  nom: 'Nahum.Apc',
  /** Ton prénom, utilisé dans les données structurées. */
  prenom: 'Nahum',
  /** Description par défaut, utilisée par Google et lors des partages. 150 à 160 caractères. */
  descriptionParDefaut:
    'Coaching alternance et orientation : CV, lettre de motivation, LinkedIn, entretiens, choix de formation. Choisissez votre formule et réservez en ligne.',
  langue: 'fr-FR',

  /**
   * Photo du hero (facultative). Laisse '' pour garder le « dossier de candidature ».
   * Pour en ajouter une : dépose-la dans /public (ex. public/hero.jpg, format
   * portrait, 1200 px de large) puis indique '/hero.jpg'.
   */
  photoHero: '',

  /**
   * Bouton principal, affiché dans l'en-tête, le hero et la barre mobile.
   * Par défaut, il mène au choix du parcours sur l'accueil.
   */
  boutonPrincipal: {
    libelle: 'Choisir ma formule',
    lien: '/#parcours',
  },

  contact: {
    email: 'snkcontent1@gmail.com',
  },

  /**
   * Réseaux sociaux. Laisse une chaîne vide ('') pour masquer un réseau.
   */
  reseaux: {
    tiktok: 'https://www.tiktok.com/@nahum_apc',
    instagram: 'https://www.instagram.com/nahum_apc',
    linkedin: '', // [LIEN LINKEDIN]
  },

  /**
   * Mentions légales (obligatoires pour un site professionnel en France).
   * Elles alimentent les pages Mentions légales, CGV et Confidentialité.
   */
  legal: {
    nomComplet: '[PRÉNOM NOM]',
    statut: '[STATUT, ex. EI]',
    siret: '[SIRET]',
    adresse: '[ADRESSE OU DOMICILIATION]',
    mentionTva: '[ex. TVA non applicable, art. 293 B du CGI]',
    // Coordonnées de l'hébergeur : à vérifier sur netlify.com au moment de la mise en ligne.
    hebergeur: {
      nom: 'Netlify, Inc.',
      adresse: '512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
      site: 'https://www.netlify.com',
    },
  },
} as const;
