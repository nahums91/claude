/**
 * ============================================================================
 *  TOUTES LES OFFRES DU SITE
 * ============================================================================
 *
 *  C'est le seul fichier à modifier pour changer un prix, une durée, une
 *  inclusion ou un lien de réservation. Le site (cartes, tableau comparatif,
 *  données pour Google) se met à jour tout seul.
 *
 *  Règles simples :
 *  - prix : un nombre (ex. 117) ou un texte entre crochets tant que tu ne l'as
 *    pas fixé (ex. '[PRIX]'). 0 affiche « Gratuit ».
 *  - demandes : les boutons des formules mènent au formulaire /demande, avec la
 *    formule déjà sélectionnée. Tu reçois la demande par e-mail et tu réponds
 *    avec tes créneaux.
 *  - le texte entre [CROCHETS] est un emplacement à compléter.
 *
 *  Si tu fais une erreur de format (ex. un prix négatif, un lien sans https),
 *  la commande `npm run build` s'arrête et t'indique la ligne à corriger,
 *  plutôt que de publier une page cassée.
 * ============================================================================
 */
import { z } from 'astro/zod';

/* ---------------------------------------------------------------------------
 * 1. Parcours et formules
 *
 *  Chaque formule a :
 *  - id : identifiant technique, ne pas modifier (utilisé dans le tableau)
 *  - miseEnAvant : true pour la carte bleu nuit (une seule par parcours)
 *  - reservation.type : 'demande' (formulaire de demande, réponse par e-mail)
 *    ou 'stripe' (paiement direct, sans rendez-vous)
 * ------------------------------------------------------------------------- */
const parcours = [
  {
    id: 'alternance',
    numero: 1,
    titre: 'Décroche ton alternance',
    resume:
      'CV, lettre de motivation, profil LinkedIn, préparation aux entretiens et suivi sur l’année scolaire.',
    pourQui: 'les étudiants en recherche d’alternance.',
    formules: [
      {
        id: 'pret',
        nom: 'Prêt',
        prix: 87,
        precisionPrix: '',
        duree: 'Livraison sous 5 jours ouvrés',
        format: 'Sans visio',
        description: 'Refonte de ton CV, de ta lettre de motivation et de ton profil LinkedIn.',
        points: [
          'Refonte du CV',
          'Refonte de la lettre de motivation',
          'Refonte du profil LinkedIn',
          'Livraison sous 5 jours ouvrés',
        ],
        miseEnAvant: false,
        reservation: {
          type: 'stripe',
          libelle: 'Commander',
          // Lien de paiement Stripe. Après paiement, Stripe redirige vers
          // /commande où la personne envoie ses documents.
          lien: 'https://buy.stripe.com/[LIEN-ESSENTIEL]',
        },
      },
      {
        id: 'prepare',
        nom: 'Préparé',
        prix: 107,
        precisionPrix: '',
        duree: 'Visio de 1 h · livraison sous 2 jours ouvrés',
        format: 'Refonte + visio',
        description:
          "La refonte complète, plus une visio de restitution pour t’approprier tes documents et préparer tes entretiens.",
        points: [
          'Tout le contenu de la formule Prêt',
          'Livraison des documents sous 2 jours ouvrés',
          'Visio de restitution de 1 h',
          'Préparation aux entretiens',
        ],
        miseEnAvant: false,
        reservation: {
          type: 'demande',
          libelle: 'Faire une demande',
          lien: '/demande?formule=prepare',
        },
      },
      {
        id: 'accompagne',
        nom: 'Accompagné',
        prix: 117,
        precisionPrix: 'Prix de lancement',
        duree: 'Sur l’année scolaire en cours',
        format: 'Refonte + visios collectives et individuelles',
        description:
          'La formule Préparé, plus des visios collectives chaque semaine dans le groupe privé et une visio individuelle par mois, sur toute l’année scolaire.',
        points: [
          'Tout le contenu de la formule Préparé',
          'Visios collectives hebdomadaires dans le groupe privé (Podia)',
          '1 visio de suivi individuelle par mois',
          'Groupe privé : entraide, partage d’offres, motivation',
          'Visio individuelle supplémentaire : 35 €',
        ],
        miseEnAvant: true,
        reservation: {
          type: 'demande',
          libelle: 'Faire une demande',
          lien: '/demande?formule=accompagne',
        },
      },
    ],
    /**
     * Tableau comparatif. Pour chaque ligne :
     *   true = inclus, false = non inclus, ou un texte court (ex. '1 visio').
     * Les clés (pret, prepare, accompagne) correspondent aux id ci-dessus.
     */
    comparatif: [
      { critere: 'Refonte du CV', pret: true, prepare: true, accompagne: true },
      { critere: 'Refonte de la lettre de motivation', pret: true, prepare: true, accompagne: true },
      { critere: 'Refonte du profil LinkedIn', pret: true, prepare: true, accompagne: true },
      { critere: 'Délai de livraison des documents', pret: '5 jours ouvrés', prepare: '2 jours ouvrés', accompagne: '2 jours ouvrés' },
      { critere: 'Visio de restitution (1 h)', pret: false, prepare: true, accompagne: true },
      { critere: 'Préparation aux entretiens', pret: false, prepare: true, accompagne: true },
      { critere: 'Visios collectives hebdomadaires (groupe Podia)', pret: false, prepare: false, accompagne: true },
      { critere: 'Visio de suivi individuelle', pret: false, prepare: false, accompagne: '1 par mois' },
      { critere: 'Groupe privé des élèves (Podia)', pret: false, prepare: false, accompagne: true },
      { critere: 'Visio individuelle supplémentaire', pret: false, prepare: false, accompagne: '35 €' },
    ],
    /**
     * Prestations à la carte : un seul élément, sans prendre une formule complète.
     * - detail : délai ou durée, affiché sous le nom
     * - reservation : même fonctionnement que les formules ('demande' ou 'stripe')
     */
    aLaCarte: [
      {
        id: 'carte-cv',
        nom: 'Refonte du CV',
        description: 'Refonte de ton CV.',
        detail: 'Livraison sous 5 jours ouvrés',
        prix: 35,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-cv' },
      },
      {
        id: 'carte-lettre',
        nom: 'Refonte de la lettre de motivation',
        description: 'Refonte de ta lettre de motivation.',
        detail: 'Livraison sous 5 jours ouvrés',
        prix: 25,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-lettre' },
      },
      {
        id: 'carte-linkedin',
        nom: 'Refonte du profil LinkedIn',
        description: 'Refonte de ton profil LinkedIn.',
        detail: 'Livraison sous 5 jours ouvrés',
        prix: 35,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-linkedin' },
      },
      {
        id: 'carte-entretiens',
        nom: 'Préparation aux entretiens',
        description: 'Préparation aux entretiens, en visio.',
        detail: 'Visio de 1 h',
        prix: 40,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-entretiens' },
      },
    ],
  },
  {
    id: 'orientation',
    numero: 2,
    titre: 'Clarifiez votre projet',
    resume:
      'Choisir une formation ou une école, ou construire un projet professionnel clair avec un plan d’action.',
    pourQui: 'les étudiants (avec un parent ou un proche s’ils le souhaitent) et les projets de reconversion.',
    formules: [
      {
        id: 'orientation-scolaire',
        nom: 'Orientation scolaire',
        prix: 45,
        precisionPrix: '',
        duree: '1 h',
        format: 'Visio, avec un parent ou un proche',
        description:
          'Une séance avec l’étudiant et un parent ou un proche pour choisir une formation ou une école.',
        points: [
          'Séance de 1 h en visio',
          'Avec un parent ou un proche',
          'Choix de formation ou d’école',
        ],
        miseEnAvant: false,
        reservation: {
          type: 'demande',
          libelle: 'Faire une demande',
          lien: '/demande?formule=orientation-scolaire',
        },
      },
      {
        id: 'orientation-pro',
        nom: 'Orientation professionnelle',
        prix: 60,
        precisionPrix: '',
        duree: '1 h',
        format: 'Visio',
        description:
          'Pour un étudiant qui se sent perdu ou un projet de reconversion : construire un projet clair et un plan d’action.',
        points: [
          'Séance de 1 h en visio',
          'Étudiant perdu ou projet de reconversion',
          'Projet clair et plan d’action',
        ],
        miseEnAvant: false,
        reservation: {
          type: 'demande',
          libelle: 'Faire une demande',
          lien: '/demande?formule=orientation-pro',
        },
      },
    ],
    comparatif: [],
    aLaCarte: [],
  },
];

/* ---------------------------------------------------------------------------
 * 2. E-book (en autonomie)
 * ------------------------------------------------------------------------- */
const ebook = {
  titre: '[TITRE DE L’E-BOOK]',
  sousTitre: '[SOUS-TITRE OU PROMESSE DE L’E-BOOK]',
  prix: '[PRIX]' as number | string,
  points: ['[CE QUE CONTIENT L’E-BOOK 1]', '[CE QUE CONTIENT L’E-BOOK 2]', '[CE QUE CONTIENT L’E-BOOK 3]'],
  // Lien d'achat externe : Systeme.io, Gumroad ou Stripe Payment Link.
  lien: 'https://[LIEN-ACHAT-EBOOK]',
  // Image de couverture : dépose-la dans /public puis indique son chemin, ex. '/ebook-couverture.webp'.
  couverture: '',
};

/* ---------------------------------------------------------------------------
 * 3. Envoi des documents de la formule Prêt (après paiement, page /commande)
 *
 *  Par défaut, le client envoie ses documents par e-mail (adresse de site.ts).
 *  Si un jour tu préfères un formulaire avec envoi de fichiers (ex. Tally),
 *  colle son lien ici : la page /commande affichera alors un bouton vers ce
 *  formulaire à la place de l'adresse e-mail.
 * ------------------------------------------------------------------------- */
const commande = {
  lienFormulaire: '',
};

/* ===========================================================================
 *  Vérification automatique (ne pas modifier en dessous)
 * ========================================================================= */
const prixSchema = z.union([z.number().min(0), z.string().min(1)]);
const lienSchema = z.string().startsWith('https://', 'Un lien doit commencer par https://');
// Lien externe (https://…) ou page du site (/…)
const lienOuPageSchema = z
  .string()
  .regex(/^(https:\/\/|\/)/, 'Un lien doit commencer par https:// ou par / pour une page du site');

const formuleSchema = z.object({
  id: z.string(),
  nom: z.string(),
  prix: prixSchema,
  precisionPrix: z.string(),
  duree: z.string(),
  format: z.string(),
  description: z.string(),
  points: z.array(z.string()),
  miseEnAvant: z.boolean(),
  reservation: z.object({
    type: z.enum(['demande', 'stripe']),
    libelle: z.string(),
    lien: lienOuPageSchema,
  }),
});

const schema = z.object({
  parcours: z.array(
    z.object({
      id: z.string(),
      numero: z.number(),
      titre: z.string(),
      resume: z.string(),
      /** Public visé, affiché sur la carte du parcours. */
      pourQui: z.string(),
      formules: z.array(formuleSchema).min(1),
      comparatif: z.array(
        z.object({ critere: z.string() }).catchall(z.union([z.boolean(), z.string()])),
      ),
      aLaCarte: z.array(
        z.object({
          id: z.string(),
          nom: z.string(),
          description: z.string(),
          detail: z.string(),
          prix: prixSchema,
          reservation: z.object({
            type: z.enum(['demande', 'stripe']),
            libelle: z.string(),
            lien: lienOuPageSchema,
          }),
        }),
      ),
    }),
  ),
  ebook: z.object({
    titre: z.string(),
    sousTitre: z.string(),
    prix: prixSchema,
    points: z.array(z.string()),
    lien: lienSchema,
    couverture: z.string(),
  }),
  commande: z.object({ lienFormulaire: z.union([z.literal(''), lienSchema]) }),
});

export const offres = schema.parse({ parcours, ebook, commande });

export type Formule = z.infer<typeof formuleSchema>;
export type Parcours = (typeof offres.parcours)[number];

/* ---------------------------------------------------------------------------
 *  Petites fonctions utilitaires pour l'affichage
 * ------------------------------------------------------------------------- */

/** Affiche un prix : 117 → « 117 € », 0 → « Gratuit », '[PRIX]' → « [PRIX] ». */
export function formaterPrix(prix: number | string): string {
  if (typeof prix === 'string') return prix;
  if (prix === 0) return 'Gratuit';
  return `${prix.toLocaleString('fr-FR')} €`;
}

/** Plus petit prix connu d'un parcours, pour afficher « à partir de ». */
export function prixMinimum(p: Parcours): number | null {
  const prix = p.formules.map((f) => f.prix).filter((x): x is number => typeof x === 'number');
  return prix.length ? Math.min(...prix) : null;
}

export function trouverParcours(id: string): Parcours {
  const p = offres.parcours.find((x) => x.id === id);
  if (!p) throw new Error(`Parcours introuvable : ${id}`);
  return p;
}
