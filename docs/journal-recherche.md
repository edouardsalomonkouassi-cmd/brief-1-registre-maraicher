# Journal de recherche

Les notes ci-dessous résument les notions utilisées pendant la réalisation. Les liens de référence permettent de retrouver les documentations ; il faut pouvoir expliquer le code retenu.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
| Lire et écrire des données JSON sans bloquer le programme | Documentation Node.js, `node:fs/promises` ; [fiche 2](../fiches/2-donnees-json.md) | `readFile` et `writeFile` renvoient des promesses ; `JSON.parse` lit le texte et `JSON.stringify` le transforme en texte indenté. | `src/stockage.js` |
| Vérifier une saisie et transformer un coût en nombre | Code fourni `src/outils.js` ; [fiche 3](../fiches/3-ajouter-lister.md) | Une chaîne vide ne doit pas devenir un coût nul ; `versNombre` distingue une valeur vide ou invalide en renvoyant `NaN`. Une date doit aussi exister réellement. | `src/registre.js` |
| Rechercher dans une liste et ne pas modifier le registre lors d'un tri | Documentation JavaScript/MDN, méthodes des tableaux `find`, `filter`, `sort` et `slice` ; [fiche 4](../fiches/4-rechercher-trier.md) | `find` renvoie un élément ou `undefined`, `filter` crée une liste filtrée ; `sort` modifie son tableau, donc le tri reçoit une copie. | `src/registre.js`, `src/recherche.js`, `src/bonus.js` |
| Calculer des totaux et regrouper des résultats par parcelle | [Fiche 5](../fiches/5-synthese.md), pseudo-code fourni | Un accumulateur commence à zéro ; un objet peut utiliser le code de parcelle comme clé et mémoriser le nombre et le total. | `src/synthese.js`, `src/bonus.js` |
| Poser des questions dans un terminal | Code fourni `src/saisie.js` ; [documentation Node.js, readline](https://nodejs.org/api/readline.html) | `demander` attend une réponse et peut renvoyer `null` si la saisie est fermée ; le menu doit alors s'arrêter proprement. | `app.js` |
| Compléter le projet conformément aux règles et vérifier les cas limites | Brief [SUJET.md](../SUJET.md), fiches du projet et tests fournis ; assistance d'un assistant IA pour la réalisation | Les résultats de référence et les tests aident à contrôler l'implémentation ; les tests ne remplacent pas la vérification humaine ni la relecture agronomique. | Code et documents du projet |

**À noter** : j'ai effectuer des recherches sur google, avec l'ia de google pour des explications claires des termes comme `sort` et autres. Mes camardes m'ont aussi aide
