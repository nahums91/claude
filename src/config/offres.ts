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
 * 1. Diagnostic (payant) : pour les personnes qui ne savent pas quelle
 *    formule choisir. On fait le point sur leur situation et on identifie
 *    la formule adaptée.
 * ------------------------------------------------------------------------- */
const diagnostic = {
  nom: 'Diagnostic',
  duree: '[DURÉE, ex. 45 min]',
  format: 'Visio',
  prix: '[PRIX]' as number | string,
  description: 'Un point complet sur la situation pour identifier la formule adaptée.',
  lien: '/demande?formule=diagnostic',
};

/* ---------------------------------------------------------------------------
 * 2. Parcours et formules
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
      'CV, lettre de motivation, profil LinkedIn, préparation aux entretiens et suivi pendant ta recherche.',
    pourQui: 'les étudiants en recherche d’alternance.',
    formules: [
      {
        id: 'essentiel',
        nom: 'Essentiel',
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
          // /commande-essentiel où la personne envoie ses documents.
          lien: 'https://buy.stripe.com/[LIEN-ESSENTIEL]',
        },
      },
      {
        id: 'accompagne',
        nom: 'Accompagné',
        prix: 107,
        precisionPrix: '',
        duree: 'Visio de 1 h · livraison sous 2 jours ouvrés',
        format: 'Refonte + visio',
        description:
          "La refonte complète, plus une visio de restitution pour t’approprier tes documents et préparer tes entretiens.",
        points: [
          'Tout le contenu de la formule Essentiel',
          'Livraison des documents sous 2 jours ouvrés',
          'Visio de restitution de 1 h',
          'Préparation aux entretiens',
        ],
        miseEnAvant: false,
        reservation: {
          type: 'demande',
          libelle: 'Faire une demande',
          lien: '/demande?formule=accompagne',
        },
      },
      {
        id: 'suivi',
        nom: 'Suivi',
        prix: 117,
        precisionPrix: '',
        duree: 'Sur l’année scolaire en cours',
        format: 'Refonte + visios régulières',
        description:
          "L'offre Accompagné, plus des visios de suivi régulières pendant ta recherche et l'accès au groupe privé.",
        points: [
          'Tout le contenu de la formule Accompagné',
          'Visios de suivi régulières pendant ta recherche',
          'Accès au groupe privé des élèves (Podia)',
          'Entraide, partage d’offres, motivation',
        ],
        miseEnAvant: true,
        reservation: {
          type: 'demande',
          libelle: 'Faire une demande',
          lien: '/demande?formule=suivi',
        },
      },
    ],
    /**
     * Tableau comparatif. Pour chaque ligne :
     *   true = inclus, false = non inclus, ou un texte court (ex. '1 visio').
     * Les clés (essentiel, accompagne, suivi) correspondent aux id ci-dessus.
     */
    comparatif: [
      { critere: 'Refonte du CV', essentiel: true, accompagne: true, suivi: true },
      { critere: 'Refonte de la lettre de motivation', essentiel: true, accompagne: true, suivi: true },
      { critere: 'Refonte du profil LinkedIn', essentiel: true, accompagne: true, suivi: true },
      { critere: 'Délai de livraison des documents', essentiel: '5 jours ouvrés', accompagne: '2 jours ouvrés', suivi: '2 jours ouvrés' },
      { critere: 'Visio de restitution (1 h)', essentiel: false, accompagne: true, suivi: true },
      { critere: 'Préparation aux entretiens', essentiel: false, accompagne: true, suivi: true },
      { critere: 'Visios de suivi sur l’année scolaire', essentiel: false, accompagne: false, suivi: '[RYTHME]' },
      { critere: 'Groupe privé des élèves (Podia)', essentiel: false, accompagne: false, suivi: true },
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
        detail: '[DÉLAI DE LIVRAISON]',
        prix: 35,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-cv' },
      },
      {
        id: 'carte-lettre',
        nom: 'Refonte de la lettre de motivation',
        description: 'Refonte de ta lettre de motivation.',
        detail: '[DÉLAI DE LIVRAISON]',
        prix: 25,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-lettre' },
      },
      {
        id: 'carte-linkedin',
        nom: 'Refonte du profil LinkedIn',
        description: 'Refonte de ton profil LinkedIn.',
        detail: '[DÉLAI DE LIVRAISON]',
        prix: 35,
        reservation: { type: 'demande', libelle: 'Faire une demande', lien: '/demande?formule=carte-linkedin' },
      },
      {
        id: 'carte-entretiens',
        nom: 'Préparation aux entretiens',
        description: 'Préparation aux entretiens, en visio.',
        detail: '[DURÉE]',
        prix: '[PRIX]',
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
 * 3. E-book (en autonomie)
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
 * 4. Formulaire de commande Essentiel (envoi des documents après paiement)
 * ------------------------------------------------------------------------- */
const commandeEssentiel = {
  // Lien du formulaire Tally (gratuit, accepte l'envoi de fichiers).
  lienFormulaire: 'https://tally.so/r/[ID-FORMULAIRE]',
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
  diagnostic: z.object({
    nom: z.string(),
    duree: z.string(),
    format: z.string(),
    prix: prixSchema,
    description: z.string(),
    lien: lienOuPageSchema,
  }),
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
  commandeEssentiel: z.object({ lienFormulaire: lienSchema }),
});

export const offres = schema.parse({ diagnostic, parcours, ebook, commandeEssentiel });

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
