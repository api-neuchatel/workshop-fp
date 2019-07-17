# Partie 1 - Exercice

Cet exercice est tiré de la conférence "Solving Problems the Clojure Way" de Rafal Dittwald disponible [ici](https://www.youtube.com/watch?v=vK1DazRK_a0).

Vous trouverez dans le fichier `ex.js` une implémentation d'un jeu de Gops (Game of Pure Strategy). Il s'agit d'un jeu de cartes au tour-à-tour pour deux joueurs et un meneur de jeu.

## Gops
A chaque tour, le meneur de jeu tire une carte au hasard de son jeu. Cette carte porte le nom de "bounty". La valeur inscrite sur celle-ci définit le nombre de points qui reviendra au joueur qui la gagne. Ensuite, chaque joueur choisit une carte dans son jeu et la pose sur la table. Le joueur ayant posé la plus grande carte gagne le bounty. Finalement, les 3 cartes sont défaussées et le jeu continue jusqu'à ce que le meneur de jeu n'ait plus de cartes.

Dans notre implémentation, chaque joueur adopte une stratégie différente. Le joueur 1 tire une carte au hasard de son jeu alors que le joueur 2 joue systématiquement la même carte que le meneur de jeu.

Vous pouvez exécuter le programme plusieurs fois pour visualiser différentes partie de Gops entre les deux joueurs. Pour cela, utilisez la commande `npm start` (CTRL + C pour sortir du programme).

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

Commencez par exécuter les commandes suivantes au sein de votre Terminal
```bash
npm install         // Installation des dépendances
npm test            // Lancement des tests en continu
```

### Partie 1
- Commencez par supprimer tous les effets de bords des fonctions `shuffle`, `getRandomCard`, `getCard`, `player1Strategy` et `player2Strategy`. Ces fonctions doivent devenir __pures__!

### Partie 2
On s'attaque finalement à l'adaptation de la fonction `game`.
- Créez une fonction `endMessage` qui prend en paramètre les scores des joueurs et qui génère la string de résultat. Cette fonction doit également être pure
- Implémentez la fonction `nextState`, celle-ci prend en paramètre un state et génère le state suivant. Cette fonction doit également être pure. Pour ce faire, effectuez les opérations suivantes :
    - Appelez la fonction `getRandomCard` sur le `state.bountyDeck` afin de recupérer la `bountyCard`
    - Appelez la fonction `player1Strategy` sur le `state.player1Deck` afin de recupérer la `player1Card`
    - Appelez la fonction `player2Strategy`sur le `state.player2Deck` afin de recupérer la `player2Card`
    - Appelez la fonction `without` sur le `state.bountyDeck` afin de retirer la `bountyCard` et ainsi obtenir le nouveau `bountyDeck`
    - Appelez la fonction `without` sur le `state.player1Deck` afin de retirer la `player1Card` et ainsi obtenir le nouveau `player1Deck`
    - Appelez la fonction `without` sur le `state.player2Deck` afin de retirer la `player2Card` et ainsi obtenir le nouveau `player2Deck`
    - Calculez le `player1Score` en additionnant la `bountyCard` si la carte `player1Card` est plus grande que la carte `player2Card`
    - Calculez le `player2Score` en additionnant la `bountyCard` si la carte `player2Card` est plus grande que la carte `player2Card`
    - Aggrégez toutes ces données dans une valeur et retournez le nouveau state
- Créez une fonction `turnMessage` qui prend en paramètre un state et génère le message affiché à chaque tour.
- Modifiez la fonction `game` en utilisant les fonctions `nextState`, `turnMessage` et `endMessage`
- Constatez que quasiment tout le code de base a été factorisé dans de nouvelles fonctions, toutes pures et que seule la fonction `game` produit des effets de bord de manière très restreinte et locale. Votre code n'est-il pas plus clair ainsi? :-)
