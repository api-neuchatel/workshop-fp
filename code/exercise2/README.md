# Partie 2 - Exercices

Cette partie, composée de deux exercices vous permet dans un premier temps de découvrir les principes que nous avons évoqués à travers l'`ex1.js`, puis dans un deuxième temps, d'implémenter un certain nombre de fonctions "utiles" grâce à l'`ex2.js`.

Commencez par le classique :

```bash
npm install // Installation des dépendances
npm test    // Lancement des tests en continu
```

## Exercice 1

### First class functions

- Stockez la fonction `_double` dans la constante `double` démontrant ainsi qu'il est possible de stocker une fonction de la même manière que n'importe quelle valeur.

### Higher-order functions 

- Créez la fonctoin `add5` qui reçoit en paramètre un nombre et qui retourne une fonction qui ajoute la valeur 5. Dans l'idéal, utilisez la fonction `_add`.

## Exercice 2

Cet exercice vous propose de manipuler quelques structures de données au travers de higher order functions. Au lieu de considérer que l'on va effectuer des __traitements__ sur les données, on verra à travers cet exercice qu'on peut les __transformer__. En particulier, nos deux transformations élémentaires `map` et `filter` nous permettent déjà de réaliser bon nombre d'opérations élémentaires, comme nous allons le voir.

Notre ensemble de données est composé de `people`, un ensemble de personnes ayant chacune un `name`, un `id` ainsi qu'un `age`. Ces personnes ont la possibilité de noter différents `movies`. Chaque `movie` est caractérisé par un `name`, un `author` ainsi qu'un ensemble de `comments`, qui décrivent en fait des notes que les différents `people` leur ont attribué. Ces données sont disponibles dans le fichier `ex2.js`.

### Pratique

- Créez la fonction `map` qui reçoit en paramètre un tableau et une fonction et qui retourne un tableau composé de l'application de la fonction à chaque élément du tableau.
- Créez la fonction `filter` qui reçoit en paramètre un tableau et un predicate (fonction qui retourne un boolean) et qui retourne un tableau composé des éléments qui respectent cette condition.
- Créez la fonction `findPersonById` qui reçoit en paramètre un entier et qui retourne la personne qui correspond à cet identifiant. Aidez-vous de la fonction `filter` que vous avez implémentée. Remarquez que votre fonction a accès à `people`, vous venez donc de créer votre première closure!
- Puis créez les fonctions `peopleYoungerThan30`, `peopleAcronyms`, `peopleAcronymsUppercaseStartWithD` en utilisant les fonctions que vous avez développé.
- Finalement, créez la fonction `commentsByMovie`, elle nécessitera sans doute que vous appelez la fonction `flat` définie pour vous:

```javascript
flat([[1,2,3][4,5,6]]) ==> [1,2,3,4,5,6];
```

