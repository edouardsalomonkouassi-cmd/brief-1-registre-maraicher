# Fiche agronomique

> Une page, relue par le coach agronomie, d'après la fiche de référence. Vous décrivez des opérations ; vous ne donnez pas de conseil de culture. Les dates des données sont fictives.

**Culture prise comme exemple : tomate.** Le registre associe des opérations à cette culture, sans fournir de calendrier agricole propre à une région.

| Opération (exemple d'identifiant) | Place générale dans le cycle | Éléments à relever sur la parcelle |
| --- | --- | --- |
| `semis` (`O01`) | Démarrage de la culture : mise en place des graines ou préparation du lot semé. | Parcelle concernée, date et culture inscrite. |
| `repiquage` (`O04`) | Déplacement de jeunes plants vers leur emplacement de culture. | Parcelle, date et intervention effectivement réalisée. |
| `arrosage` (`O03`) | Entretien de la culture pendant sa croissance ; peut revenir à plusieurs moments. | Date et coût de l'intervention ; aucun volume d'eau n'est enregistré. |
| `désherbage` (`O06`) | Entretien pendant la croissance, lorsque cette intervention est effectuée. | Date, parcelle et coût ; le registre ne décrit pas les adventices. |
| `récolte` (`O02`) | Prélèvement des produits lorsque la culture est récoltée. | Date et parcelle ; le registre ne compte ni quantité ni qualité récoltée. |



**Donnée manquante et conséquence** : la quantité et la valeur des récoltes ne sont pas enregistrées. On ne peut pas calculer le rendement, les recettes ou la rentabilité. La surface et les volumes d'eau manquent également, donc les coûts ne peuvent pas être comparés par hectare ni par quantité d'eau utilisée.

**Pourquoi le total des coûts ne mesure-t-il pas la rentabilité ?** Il additionne les dépenses connues, mais ne tient pas compte des recettes ni des autres éléments économiques. Une dépense seule ne donne pas le bénéfice.

Sources : liste des opérations et exemple de cycle contenu dans "SUJET.md" ; les enregistrements "operations.json".

Relu par le coach le : XXXX-XX-XX
