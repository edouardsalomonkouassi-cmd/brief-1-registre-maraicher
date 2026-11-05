// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';
import { modifierOperation, parcelleLaPlusCouteuse, supprimerOperation, trierParCoutDecroissant } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/operations.json';

function afficherMenu() {
  console.log('\n--------------------- MENU ---------------------');
  console.log('1. Ajouter une opération');
  console.log('2. Lister les opérations');
  console.log('3. Rechercher (identifiant, parcelle, culture)');
  console.log('4. Trier (coût, date)');
  console.log('5. Synthèse des dépenses');
  console.log('6. Supprimer une opération');
  console.log('7. Modifier une opération');
  console.log('0. Quitter');
}

function afficherErreurs(erreurs) {
  for (const erreur of erreurs) {
    console.log(`  - ${erreur}`);
  }
}

async function demanderOperation() {
  const id = await demander('Identifiant (ex. O11) : ');
  if (id === null) return null;
  const date = await demander('Date (AAAA-MM-JJ) : ');
  if (date === null) return null;
  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) return null;
  const culture = await demander('Culture (ex. tomate) : ');
  if (culture === null) return null;
  const operation = await demander(`Opération (${OPERATIONS.join(', ')}) : `);
  if (operation === null) return null;
  const coutFCFA = await demander('Coût en FCFA : ');
  if (coutFCFA === null) return null;

  return {
    id: id.toUpperCase(),
    date,
    parcelle: parcelle.toUpperCase(),
    culture: culture.toLowerCase(),
    operation: operation.toLowerCase(),
    coutFCFA,
  };
}

async function ajouter(operations) {
  console.log('\n--- Ajouter une opération ---');
  const saisie = await demanderOperation();
  if (saisie === null) return false;

  const precedent = operations.map((operation) => ({ ...operation }));
  const erreurs = ajouterOperation(operations, saisie);
  if (erreurs.length > 0) {
    console.log('Opération refusée :');
    afficherErreurs(erreurs);
    console.log(`Le registre compte toujours ${operations.length} opération(s).`);
    return true;
  }

  try {
    await enregistrerJson(FICHIER_DONNEES, operations);
  } catch (erreur) {
    operations.splice(0, operations.length, ...precedent);
    throw erreur;
  }
  console.log(`Opération ${saisie.id} ajoutée. Le registre compte ${operations.length} opération(s).`);
  return true;
}

function lister(operations) {
  console.log(`\n--- Liste des opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));
}

async function rechercher(operations) {
  console.log('\n--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par parcelle');
  console.log('3. Les opérations d’une culture');
  const choix = await demander('Votre choix : ');
  if (choix === null) return false;

  if (choix === '1') {
    const id = await demander('Identifiant : ');
    if (id === null) return false;
    const identifiant = id.toUpperCase();
    const operation = trouverParId(operations, identifiant);
    console.log(operation ? formaterOperation(operation) : `Opération ${identifiant} introuvable.`);
  } else if (choix === '2') {
    const saisie = await demander('Parcelle : ');
    if (saisie === null) return false;
    const parcelle = saisie.toUpperCase();
    const resultats = filtrerParParcelle(operations, parcelle);
    console.log(`${resultats.length} opération(s) sur la parcelle ${parcelle} :`);
    console.log(listerOperations(resultats));
  } else if (choix === '3') {
    const saisie = await demander('Culture : ');
    if (saisie === null) return false;
    const culture = saisie.toLowerCase();
    const resultats = filtrerParCulture(operations, culture);
    console.log(`${resultats.length} opération(s) pour la culture ${culture} :`);
    console.log(listerOperations(resultats));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
  return true;
}

async function trier(operations) {
  console.log('\n--- Trier ---');
  console.log('1. Par coût croissant');
  console.log('2. Par date, de la plus ancienne à la plus récente');
  console.log('3. Par coût décroissant');
  const choix = await demander('Votre choix : ');
  if (choix === null) return false;

  if (choix === '1') {
    console.log(listerOperations(trierParCout(operations)));
  } else if (choix === '2') {
    console.log(listerOperations(trierParDate(operations)));
  } else if (choix === '3') {
    console.log(listerOperations(trierParCoutDecroissant(operations)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
  return true;
}

function afficherSynthese(operations) {
  console.log('\n--- Synthèse des dépenses enregistrées ---');
  console.log(`Nombre d'opérations : ${operations.length}`);
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);
  console.log('Par parcelle :');
  for (const [parcelle, details] of Object.entries(syntheseParParcelle(operations))) {
    console.log(`  ${parcelle} : ${details.nombre} opération(s), ${details.total} FCFA`);
  }

  const minMax = coutMinMax(operations);
  if (minMax === null) {
    console.log('Coût minimum et maximum : aucune donnée');
  } else {
    console.log(`Coût minimum : ${minMax.min} FCFA · Coût maximum : ${minMax.max} FCFA`);
    const parcelle = parcelleLaPlusCouteuse(operations);
    console.log(`Parcelle la plus coûteuse : ${parcelle.parcelle} (${parcelle.total} FCFA)`);
  }
  console.log('Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.');
}

async function supprimer(operations) {
  const saisie = await demander('Identifiant : ');
  if (saisie === null) return false;
  const id = saisie.toUpperCase();
  const precedent = operations.map((operation) => ({ ...operation }));
  const operation = supprimerOperation(operations, id);
  if (!operation) {
    console.log(`Opération ${id} introuvable.`);
    return true;
  }
  try {
    await enregistrerJson(FICHIER_DONNEES, operations);
  } catch (erreur) {
    operations.splice(0, operations.length, ...precedent);
    throw erreur;
  }
  console.log(`Opération ${id} supprimée. Le registre compte ${operations.length} opération(s).`);
  return true;
}

async function modifier(operations) {
  const saisieId = await demander('Identifiant : ');
  if (saisieId === null) return false;
  const id = saisieId.toUpperCase();
  const champ = await demander('Champ à modifier (date, parcelle, culture, operation, coutFCFA) : ');
  if (champ === null) return false;
  const valeur = await demander('Nouvelle valeur : ');
  if (valeur === null) return false;

  const precedent = operations.map((operation) => ({ ...operation }));
  const valeurNormalisee = champ === 'parcelle' ? valeur.toUpperCase()
    : champ === 'culture' || champ === 'operation' ? valeur.toLowerCase()
      : valeur;
  const erreurs = modifierOperation(operations, id, champ, valeurNormalisee);
  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    afficherErreurs(erreurs);
    return true;
  }
  try {
    await enregistrerJson(FICHIER_DONNEES, operations);
  } catch (erreur) {
    operations.splice(0, operations.length, ...precedent);
    throw erreur;
  }
  console.log(`Opération ${id} modifiée.`);
  return true;
}

function messageErreur(erreur) {
  return erreur instanceof Error ? erreur.message : String(erreur);
}

async function main() {
  ouvrirSaisie();
  try {
    console.log('==================================================');
    console.log('   REGISTRE DES OPÉRATIONS MARAÎCHÈRES');
    console.log('   Exploitation maraîchère pédagogique');
    console.log('==================================================');

    let operations;
    try {
      operations = await chargerJson(FICHIER_DONNEES);
      console.log(`${operations.length} opération(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
    } catch (erreur) {
      console.log(`Impossible de lire ${FICHIER_DONNEES} : ${messageErreur(erreur)}. Le registre démarre vide.`);
      operations = [];
    }

    let continuer = true;
    while (continuer) {
      afficherMenu();
      const choix = await demander('Votre choix : ');
      if (choix === null) break;

      try {
        switch (choix) {
          case '0':
            console.log('Au revoir !');
            continuer = false;
            break;
          case '1':
            continuer = await ajouter(operations);
            break;
          case '2':
            lister(operations);
            break;
          case '3':
            continuer = await rechercher(operations);
            break;
          case '4':
            continuer = await trier(operations);
            break;
          case '5':
            afficherSynthese(operations);
            break;
          case '6':
            console.log('\n--- Supprimer une opération ---');
            continuer = await supprimer(operations);
            break;
          case '7':
            console.log('\n--- Modifier une opération ---');
            continuer = await modifier(operations);
            break;
          default:
            console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
        }
      } catch (erreur) {
        const message = messageErreur(erreur);
        console.log(message.startsWith('TODO') ? `À compléter : ${message}` : `Erreur inattendue : ${message}`);
      }
    }
  } finally {
    fermerSaisie();
  }
}

main();
