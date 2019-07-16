# Partie 1 - Exercice

Cet exercice est tiré de la conférence "Solving Problems the Clojure Way" de Rafal Dittwald disponible [ici](https://www.youtube.com/watch?v=vK1DazRK_a0).

Vous trouverez dans le fichier `ex.js` une implémentation d'un jeu de Gops (Game of Pure Strategy). Il s'agit d'un jeu de cartes au tour-à-tour pour deux joueurs et un meneur de jeu.

## Gops
A chaque tour, le meneur de jeu tire une carte au hasard de son jeu. Cette carte porte le nom de "bounty". La valeur inscrite sur celle-ci définit le nombre de points qui reviendra au joueur qui la gagne. Ensuite, chaque joueur choisit une carte dans son jeu et la pose sur la table. Le joueur ayant posé la plus grande carte gagne le bounty. Finalement, les 3 cartes sont défaussées et le jeu continue jusqu'à ce que le meneur de jeu n'ait plus de cartes.

Dans notre implémentation, chaque joueur adopte une stratégie différente. Le joueur 1 tire une carte au hasard de son jeu alors que le joueur 2 joue systématiquement la même carte que le meneur de jeu.

Vous pouvez exécuter le programme plusieurs fois pour visualiser différentes partie de Gops entre les deux joueurs. Pour cela, utilisez la commande `node ex.js`.

Voici un exemple de partie de Gops:

```
*** New turn! ***
Bounty is 5
Player 1 plays 1
Player 2 plays 5

*** New turn! ***
Bounty is 1
Player 1 plays 2
Player 2 plays 1

*** New turn! ***
Bounty is 3
Player 1 plays 3
Player 2 plays 3

*** New turn! ***
Bounty is 2
Player 1 plays 4
Player 2 plays 2

*** New turn! ***
Bounty is 4
Player 1 plays 5
Player 2 plays 4

Score: 7 - 5
Player 1 wins!
```

## L'exercice
Le code proposé contient passablement d'effets de bord! Votre tâche consiste à en supprimer un maximum et à rassembler au maximum le code qui en contient et dont on ne peut pas se passer.

### Partie 1
- Commencez par supprimer tous les effets de bords des fonctions `shuffle`, `getRandomCard`, `getCard`, `player1Strategy` et `player2Strategy`. Ces fonctions doivent devenir __pures__!

### Partie 2
On s'attaque finalement à l'adaptation de la fonction `game`.
- Commencez par écrire une fonction `without` qui prend en paramètre un tableau et un élément de ce même tableau et qui retourne une copie du tableau sans l'élément en question. Attention: cette fonction doit être pure également. Utilisez `without` dans `game` pour supprimer des decks les cartes tirées par le meneur et les joueurs.
- Créez une fonction `endMessage` qui prend en paramètre les scores des joueurs et qui génère la string de résultat. Cette fonction doit également être pure. Utilisez-là pour afficher la résultat dans la console à la fin de la fonction `game`.
- Mettez les valeurs `bountyDeck` ainsi que les decks et scores des joueurs dans un objet `state` et implémentez une fonction `nextState` qui prend un state en paramètre et génère le state suivant. Cette fonction doit également être pure. Utilisez-là pour mettre à jour le state dans la fonction `game`.
- Créez une fonction `turnMessage` qui prend en paramètre un state et génère le message affiché à chaque tour. Cette fonction doit également être pure et vous pouvez l'utiliser dans `game`.
- Constatez que quasiment tout le code de base a été factorisé dans de nouvelles fonctions, toutes pures et que seule la fonction `game` produit des effets de bord de manière très restreinte et locale. Votre code n'est-il pas plus clair ainsi? :-)