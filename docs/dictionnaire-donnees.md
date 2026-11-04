# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique de l'opération | Texte | Obligatoire et absent du registre | — | `O03` |
| `date` | Jour où l'opération a été réalisée | Texte au format `AAAA-MM-JJ` | Date réelle, par exemple `2026-10-21` | Jour | `2026-10-21` |
| `parcelle` | Code de la zone concernée | Texte | Obligatoire ; aucune liste fermée | — | `P1` |
| `culture` | Culture présente sur la parcelle | Texte | Obligatoire ; aucune liste fermée | — | `tomate` |
| `operation` | Travail réalisé | Texte | Une valeur de la liste autorisée | — | `arrosage` |
| `coutFCFA` | Dépense associée à l'intervention | Nombre | Nombre supérieur ou égal à zéro | FCFA | `2000` |

**Valeurs autorisées pour `operation`** : `semis`, `arrosage`, `désherbage`, `repiquage`, `récolte`.

**Exemple d'enregistrement** : `{ "id": "O03", "date": "2026-10-21", "parcelle": "P1", "culture": "tomate", "operation": "arrosage", "coutFCFA": 2000 }`.

**Sources** : définitions et règles du [brief](../SUJET.md), exemples du fichier [operations.json](../donnees/operations.json). Les unités et champs absents (revenus, surface, production récoltée) ne sont pas déduits.
