# Relevé des tests

La suite `npm.cmd test` a été exécutée sous PowerShell le 3 novembre 2026 : **44 tests réussis, 0 échec**. Elle comprend les tests fournis et cinq tests de cas limites ajoutés au projet. Les exemples de référence ci-dessous sont calculés à partir des dix données fictives de départ.

## Calculs de référence

- Nombre d'opérations : **10**.
- Total des dépenses : **40 000 FCFA** (3 000 + 4 500 + 2 000 + 5 000 + 1 500 + 8 000 + 4 000 + 3 500 + 2 500 + 6 000).
- P1 : **4 opérations**, total **15 500 FCFA**.
- P2 : **3 opérations**, total **9 500 FCFA**.
- P3 : **3 opérations**, total **15 000 FCFA**.
- Coût minimum : **1 500 FCFA** ; maximum : **8 000 FCFA**.
- O03 : P1, tomate, arrosage, 2 000 FCFA ; O99 : introuvable.
- Le tri par coût croissant commence par O05.

## Scénarios automatisés

| Action | Résultat attendu | Résultat constaté |
| --- | --- | --- |
| Tests des outils fournis | Conversion des nombres et validation réelle des dates | Réussi |
| Ajout et validation d'une opération | Ajout valide ; coût vide, négatif ou non numérique refusé ; identifiant déjà utilisé refusé | Réussi |
| Recherche et tri | Filtres exacts ; coûts numériques croissants ; dates chronologiques ; registre d'origine inchangé | Réussi |
| Synthèse | Total, regroupement par parcelle, minimum et maximum corrects ; liste vide gérée | Réussi |
| Lecture et écriture JSON | JSON indenté relu correctement ; erreur de fichier absent conservée | Réussi |
| Fonctions bonus | Suppression et modification validées ; tri décroissant ; parcelle la plus coûteuse | Réussi |

## Vérifications manuelles du menu

Les scénarios automatisés ci-dessous ont été joués en fournissant des réponses au menu. Ils vérifient l'affichage et la persistance, mais ne remplacent pas un essai par un camarade.

| Action | Résultat attendu | Résultat constaté | Testeur |
| --- | --- | --- | --- |
| Rechercher O03 et la parcelle P2 | Afficher O03 et les 3 opérations de P2 | Réussi | Moi meme dans le terminal de vs code |
| Rechercher la culture aubergine | Afficher ses 3 opérations | Réussi | Moi meme dans le terminal de vs code |
| Trier par coût croissant et par date | O05 en premier ; date dans l'ordre chronologique | Réussi | Moi meme dans le terminal de vs code |
| Afficher la synthèse | Total de 40 000 FCFA et détails exacts par parcelle | Réussi | Moi meme dans le terminal de vs code |
| Ajouter O11 puis le supprimer | Sauvegarder les deux changements ; retrouver ensuite les 10 enregistrements initiaux | Réussi ; O11 absent et total revenu à 10 | Moi meme dans le terminal de vs code |
| Essayer un coût négatif et un choix inconnu | Refuser le coût sans ajouter ; expliquer le choix inconnu et revenir au menu | Réussi | Moi meme dans le terminal de vs code |
| Modifier O03 puis remettre son coût initial | Enregistrer chaque modification et retrouver le coût initial de 2 000 FCFA | Réussi ; le JSON contient de nouveau 10 opérations | Moi meme dans le terminal de vs code |


**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : réalisé
