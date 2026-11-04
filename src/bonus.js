// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Pas de modèle pour ce fichier : à vous de combiner ce que vous avez appris.
import { versNombre } from './outils.js';
import { trouverParId, verifierOperation } from './registre.js';
import { syntheseParParcelle } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['date', 'parcelle', 'culture', 'operation', 'coutFCFA'];

// Supprime du registre l'opération qui a cet identifiant.
// Renvoie l'opération supprimée, ou undefined si elle n'existe pas (le registre ne change pas).
export function supprimerOperation(operations, id) {
  const index = operations.findIndex((operation) => operation.id === id);
  if (index === -1) {
    return undefined;
  }
  return operations.splice(index, 1)[0];
}

// Modifie UN champ d'une opération. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'opération ne change pas.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierOperation(operations, id, champ, valeur) {
  const operation = trouverParId(operations, id);
  if (!operation) {
    return [`Opération ${id} introuvable.`];
  }
  if (champ === 'id') {
    return ["L'identifiant ne peut pas être modifié."];
  }
  if (!CHAMPS_MODIFIABLES.includes(champ)) {
    return [`Le champ « ${champ} » ne peut pas être modifié.`];
  }

  const saisie = { ...operation, [champ]: valeur };
  const erreurs = verifierOperation(saisie, operations.filter((element) => element !== operation));
  if (erreurs.length > 0) {
    return erreurs;
  }

  operation[champ] = champ === 'coutFCFA' ? versNombre(valeur) : valeur;
  return [];
}


// Renvoie une COPIE triée par coût décroissant : la plus chère d'abord.
export function trierParCoutDecroissant(operations) {
  throw new Error('TODO Bonus : coder trierParCoutDecroissant dans src/bonus.js');
}

// Renvoie la parcelle dont le total des coûts est le plus élevé : { parcelle, total },
// ou null si le registre est vide. En cas d'égalité : la première parcelle rencontrée.
export function parcelleLaPlusCouteuse(operations) {
  throw new Error('TODO Bonus : coder parcelleLaPlusCouteuse dans src/bonus.js');
}
