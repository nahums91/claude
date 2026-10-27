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

  /**
   * Présentation de ton profil (section « Qui suis-je » de l'accueil).
   */
  profil: {
    role: 'Coach alternance et orientation',
    pitch:
      'Ce que j’ai appris en 5 ans d’alternance, je le partage pour que ton entrée dans le monde pro ne dépende pas de qui tu connais.',
    // Photo de profil facultative : dépose-la dans /public puis indique son chemin (ex. '/nahum.jpg').
    photo: '',
    // Ton parcours. Mets « actuel: true » sur l'étape à mettre en avant (point cuivre).
    parcours: [
      {
        periode: '5 ans d’alternance',
        titre: 'Tech Sales',
        texte: 'Différentes fonctions : SDR, Business Developer, puis Sales Specialist.',
        actuel: false,
      },
      {
        periode: 'Diplômé',
        titre: 'Grande école de commerce',
        texte: 'Programme Grande École (PGE).',
        actuel: false,
      },
      {
        periode: 'En parallèle',
        titre: 'Créateur de contenu',
        texte: 'Plusieurs milliers d’abonnés sur TikTok, Instagram et LinkedIn, pour aider les étudiants à trouver une alternance et réduire l’asymétrie d’information.',
        actuel: true,
      },
    ],
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
    /**
     * Médiateur de la consommation : obligatoire dès que tu vends à des
     * particuliers. Tu dois adhérer à un médiateur agréé (liste sur
     * economie.gouv.fr/mediation-conso) et indiquer ses coordonnées ici.
     */
    mediateur: {
      nom: '[NOM DU MÉDIATEUR]',
      site: '[SITE DU MÉDIATEUR]',
    },
    /** Date de dernière mise à jour des pages légales */
    dateMiseAJour: '[DATE]',
  },
} as const;
