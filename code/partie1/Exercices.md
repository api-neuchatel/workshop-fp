# Partie 1 - Exercice

Cet exercice est tiré de la conférence "Solving Problems the Clojure Way" de Rafal Dittwald disponible [ici](https://www.youtube.com/watch?v=vK1DazRK_a0).

Vous trouverez dans le fichier `ex.js` une implémentation d'un jeu de Gops (Game of Pure Strategy). Il s'agit d'un jeu de cartes au tour-à-tour pour deux joueurs et un meneur de jeu.

## Gops
A chaque tour, le meneur de jeu tire une carte au hasard de son jeu. La valeur inscrite sur la carte définit le nombre de points qui reviendra au joueur qui la gagne. Ensuite, chaque joueur choisit une carte dans son jeu et la pose sur la table. Le joueur ayant posé la plus grande carte gagne la carte du meneur de jeu. Finalement, les 3 cartes sont défossées et le jeu continue jusqu'à ce que le meneur de jeu n'ait plus de cartes.

Dans notre implémentation, chaque joueur adopte une stratégie différente. Le joueur 1 tire une carte au hasard de son jeu alors que le joueur 2 joue systématiquement la même carte que le meneur de jeu.

Vous pouvez exécuter le programme plusieurs fois pour visualiser différentes partie de Gops entre les deux joueurs. Pour cela, utilisez la commande `node ex.js`.

Voici un exemple de partie de Gops:

```
*** New turn! ***
Card is 3
Player 1 drew 5
Player 2 drew 3

*** New turn! ***
Card is 5
Player 1 drew 4
Player 2 drew 5

*** New turn! ***
Card is 2
Player 1 drew 3
Player 2 drew 2

*** New turn! ***
Card is 1
Player 1 drew 2
Player 2 drew 1

*** New turn! ***
Card is 4
Player 1 drew 1
Player 2 drew 4

Score: 6 - 9
Player 2 wins!
```

## L'exercice
Le code proposé contient passablement d'effets de bords! Votre tâche consiste à:

- Supprimer tous les effets de bords des fonctions `shuffle`, `getRandomCard`, `getCard`, `player1Strategy` et `player2Strategy`.
- Adapter la fonction `game` pour qu'elle produise __le même output__ que ci-dessus, mais en utilisant vos nouvelles fonctions.