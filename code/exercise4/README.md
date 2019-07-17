# Partie 4 - Exercice

Commencez par exécuter les traditionnelles commandes :

```bash
npm install // Installation des dépendances
npm test    // Lancement des tests en continu
```

## Immutability + Recursion    
Pour cet exercice, notez que les fonctions `head`, `tail` et `prepend`, vues pendant la séance de live coding ont été réimplémentées pour vous dans `ex.js`.

- Créez la fonction `sumArrayImperativeLoop` qui permet de faire la somme des nombres d'un tableau grâce à un boucle impérative et une variable mutable.
- Créez la fonction `sumArrayRecusion` qui permet de faire la somme des nombres d'un tableau grâce à la récursivitité.

Reduce est une opération typiquement fonctionnelle qui permet de réduire les éléments d'un tableau à une seule valeur en appliquant successivement une fonction sur un accumulateur et un élément du tableau. Par exemple:

```js
reduce([1, 2, 3, 4, 5], (accumulator, item) => accumulator + item)) // 15
```

Le fonctionnement pas à pas de reduce dans cet exemple est le suivant:
1. Calculer la valeur du premier accumulateur: `acc0 = 1 + 2`
2. Calculer la valeur du 2ème accumulateur: `acc1 = acc0 + 3`
3. Calculer la valeur du 3ème accumulateur: `acc2 = acc1 + 4`
4. Calculer la valeur du 4ème accumulateur: `acc3 = acc2 + 5`
5. Finalement, la valeur du dernier accumulateur est retournée

- Créez la fonction `sumArrayReduce` qui permet de faire la somme dans nombres d'un tableau grâce à la méthode `reduce()` de Array en Javascript.
- Pour les plus avancés, implémentez `reduce` de manière récursive!

Notez dès à présent que la majorité des fonctions que nous avons implémentées sont offertes en natif par le langage Javascript : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array.

Toutefois, ce ne sont pas des fonctions, mais bien des méthodes disponibles sur le prototype de Array. Nous vous proposons dès à présent et dans le cadre du projet de les utiliser !
