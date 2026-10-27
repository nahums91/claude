/**
 * Contenus des sections « Comment ça se passe », « Témoignages » et « FAQ ».
 *
 * Tout ce qui est entre [CROCHETS] est à compléter.
 * - Témoignages : ajoute ou retire des entrées librement (idéalement 3).
 * - FAQ : chaque entrée devient une question dépliable. Tant qu'une question
 *   contient encore des [CROCHETS], elle n'est pas envoyée à Google
 *   (données structurées FAQPage).
 */

/** Les 3 étapes, formulées de façon neutre (ni « tu » ni « vous »). */
export const etapes = [
  {
    titre: 'Choisir sa formule',
    texte:
      'Un parcours (alternance ou orientation), puis la formule adaptée. En cas de doute, une simple demande permet d’être orienté.',
  },
  {
    titre: 'Envoyer sa demande',
    texte:
      'Un formulaire avec la formule choisie, puis une réponse par e-mail avec les créneaux disponibles. Pour la formule Prêt, paiement en ligne et envoi des documents.',
  },
  {
    titre: 'Avancer ensemble',
    texte: 'Refonte des documents, séances en visio et suivi, selon la formule choisie.',
  },
];

export const temoignages = [
  { texte: '[TÉMOIGNAGE 1]', auteur: '[PRÉNOM]', contexte: '[FORMATION OU SITUATION]', formule: '[FORMULE]' },
  { texte: '[TÉMOIGNAGE 2]', auteur: '[PRÉNOM]', contexte: '[FORMATION OU SITUATION]', formule: '[FORMULE]' },
  { texte: '[TÉMOIGNAGE 3]', auteur: '[PRÉNOM]', contexte: '[FORMATION OU SITUATION]', formule: '[FORMULE]' },
];

export const faq = [
  { question: '[QUESTION 1]', reponse: '[RÉPONSE 1]' },
  { question: '[QUESTION 2]', reponse: '[RÉPONSE 2]' },
  { question: '[QUESTION 3]', reponse: '[RÉPONSE 3]' },
  { question: '[QUESTION 4]', reponse: '[RÉPONSE 4]' },
  { question: '[QUESTION 5]', reponse: '[RÉPONSE 5]' },
  { question: '[QUESTION 6]', reponse: '[RÉPONSE 6]' },
];

/** Vrai si un texte contient encore un emplacement [À COMPLÉTER]. */
export const estProvisoire = (texte: string) => /\[[^\]]+\]/.test(texte);

/**
 * Sections affichées seulement quand leur contenu est rédigé
 * (tant qu'il reste des [CROCHETS], la section et ses liens sont masqués).
 */
export const faqPrete = faq.filter((q) => !estProvisoire(q.question) && !estProvisoire(q.reponse));
export const temoignagesPrets = temoignages.filter((t) => !estProvisoire(t.texte) && !estProvisoire(t.auteur));
