# Partie 2 - Exercices

Cette partie, composée de deux exercices vous permet dans un premier temps de découvrir les principes que nous avons évoqués à travers l'`ex1.js`, puis dans un deuxième temps, d'implémenter un certain nombre de fonctions "utiles" grâce à l'`ex2.js`.

Commencez par le classique :

```bash
npm install // Installation des dépendances
npm test    // Lancement des tests en continu
```

## Exercice 1

### First class functions

- Stockez la fonction `_add` dans la constante `add` démontrant ainsi qu'il est possible de stocker une fonction de la même manière que n'importe quelle valeur.
- Implémentez la fonction `doubleArray` qui reçoit en paramètre un tableau et qui applique la fonction `f` (qui double chaque élément du tableau).

### Higher-order functions 

- Créez la fonctoin `add5` qui reçoit en paramètre un nombre et qui retourne une fonction qui ajoute la valeur 5. Dans l'idéal, utilisez la fonction `_add`.

## Exercice 2

### Pratique

- Créez la fonction `map` qui reçoit en paramètre un tableau et une fonction et qui retourne un tableau composé de l'application de la fonction à chaque élément du tableau
- Créez la fonction `filter` qui reçoit en paramètre un tableau et un predicate (fonction qui retourne un boolean) et qui retourne un tableau composé des éléments qui respectent cette condition
- Créez la fonction `findPersonById` qui reçoit en paramètre un entier et qui retourne la personne qui correspond à cet identifiant. Aidez-vous de la fonction `filter` que vous avez implémentée. Remarquez que votre fonction a accès à `people`, vous venez donc de créer votre première closure!
- Puis créez les fonctions `peopleYoungerThan30`, `peopleAcronyms`, `peopleAcronymsUppercaseStartWithD` en utilisant les fonctions que vous avez développé.
- Finalement, créez la fonction `commentsByMovie`, elle nécessitera sans doute que vous appelez la fonction `flat` définie pour vous:

```javascript
flat([[1,2,3][4,5,6]]) ==> [1,2,3,4,5,6];
```

