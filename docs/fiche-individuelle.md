# Fiche individuelle

**Prénom et nom** : Kouadio Edouard Salomon KOUASSI.  
**Compte GitHub** : edouardsalomonkouassi-cmd.  


1. **Une fonction réalisée et son fonctionnement**  
   `syntheseParParcelle` parcourt chaque opération. Pour chaque parcelle, elle crée un compteur et un total s'ils n'existent pas encore, puis ajoute un au nombre d'opérations et le coût au total. Elle renvoie un objet récapitulatif sans modifier la liste d'origine.

2. **Une difficulté et sa solution**  
   Une saisie de coût est du texte et peut contenir des espaces ou une virgule. Le programme utilise `versNombre`, qui convertit les formats acceptés et renvoie `NaN` pour une valeur non numérique ou vide. La validation refuse ensuite les valeurs négatives ou invalides avant d'ajouter l'opération.

3. **L'entraide**  
   Je peux citer : KAMAGATE, CHECK Tidiane et mes condisciples du mini projet 1.

**Note de préparation**

- **Projet** : registre en JavaScript qui enregistre les opérations maraîchères dans un fichier JSON et permet de les consulter et d'en résumer les coûts.
- **Fonction à expliquer** : `syntheseParParcelle` parcourt les opérations, compte celles de chaque parcelle, additionne leurs coûts et renvoie le résultat sans modifier la liste d'origine.
- **Validation** : le coût saisi est converti en nombre ; une valeur vide, non numérique ou négative est refusée.
- **Limite** : le registre suit les dépenses, mais pas les revenus ; il ne calcule donc pas la rentabilité.
- **À montrer** : une recherche, la synthèse par parcelle et une saisie refusée, puis expliquer clairement chaque étape de la fonction choisie.
