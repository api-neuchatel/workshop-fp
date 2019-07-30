# Partie 5: Projet

## Functional Reactive Programming (FRP)
La programmation fonctionnelle réactive est une approche qui apporte une solution dans la manière de gérer les effets de bords.
En programmation réactive, tous les évènements correspondent à une suite de valeurs discrètes (Stream) auxquelles sont appliquées des traitements grâce à des éléments issus de la programmation fonctionnelle.

Selon Wikipedia:
> Functional reactive programming (FRP) is a programming paradigm for reactive programming (asynchronous dataflow programming) using the building blocks > of functional programming (e.g. map, reduce, filter). FRP has been used for programming graphical user interfaces (GUIs), robotics, games, and music, > aiming to simplify these problems by explicitly modeling time.[citation needed]

## BaconJS

Dans la cadre de ce projet, nous allons utiliser la librairie BaconJS qui est une implémentation de FRP en Javascript.

> A small functional reactive programming lib for JavaScript. Turns your event spaghetti into clean and declarative feng shui bacon, by switching from imperative to functional. It's like replacing nested for-loops with functional programming concepts like map and filter. Stop working on individual events and work with event-streams instead. Transform your data with map and filter. Combine your data with merge and combine. Then switch to the heavier weapons and wield flatMap and combineTemplate like a boss. It's the _ of Events. Too bad the symbol ~ is not allowed in Javascript.  https://baconjs.github.io/

Dans BaconJS, on retrouve deux constructions principales :
- L' EventStream, qui représente un ensemble de valeurs à travers le temps (touches clavier par exemple)
- La Property, qui représente une notion de valeur qui change au travers du temps (la position actuelle d'un objet par exemple)

Pour plus d'informations à ce sujet : https://medium.com/@fknussel/event-streams-vs-properties-e55b53be8f42

## Input as EventStream

<img src="snes-pad.jpg" alt="drawing" width="300"/>

Les entrées clavier (ou d'une manette de jeux) peuvent être considérées comme un ensemble de valeurs discrètes à travers le temps.

![Input as EventStream](input-as-event-stream.png)

Le schéma ci-dessus présente deux EventStream, le `keyDownStream` qui représente les boutons qui ont été pressés, et le `keyUpStream` qui représente les boutons qui ont été relâchés.

Dès lors, il est possible de fusionner les deux streams d'évènements en un stream unique grâce à la fonction `merge()` et ainsi obtenir un `keysStream`.

Grâce à la fonction `scan()` (qui est en sorte de `reduce()`, mais qui fournit les valeurs intermédaires plutôt que la valeur finale), il est possible de calculer une valeur `inputProperty` qui correspond à l'état des entrées.

## Output as EventStream

![Output as EventStream](output-as-event-stream.png)

Si les entrées peuvent être vues comme un Stream d'évènements, les sorties peuvent l'être également.

Créons maintenant un EventStream `frameStream` qui correspond au nombre d'images par seconde. Ce stream peut être utilisé pour échantillonner `inputStream` grâce à la fonction `sample()` pour générer un `sampleStream`.
A partir de cet échantillon d'entrées, il est possible de calculer la position du joueur (grâce à une fonction pure) avec un `scan()` qui mettra cette valeur dans une `positionProperty`. Il ne reste plus qu'à appeler une fonction impure `draw()` qui lors du changement de valeur dessine à l'écran.

Les diagrammes sous forme de marbles sont très utilisés pour représenter les flux d'évènements. Si l'API et les concepts divergent quelque peu, il est possible de retrouver des schémas interactifs de RxJS sur https://rxmarbles.com/

## Exercice

### Partie 1

Prenez connaissance de la classe `main.js`, celle-ci contient trois fonctions :

- Le bootstrapping (main), en bas du fichier ou les streams sont créés, combinés et reduits
- Le fonction impure `draw()` qui va dessiner l'état courant à l'écran
- La fonction pure `computeStates()` qui va calculer les prochains états en fonction de l'état courant, de l'`inputProperty` et d'un ensemble de fonctions pures

Le but ici n'est pas ici que vous soyez capable de réécrire ce code mais que vous compreniez comment les concepts présentés ci-dessus peuvent être implémentés.

### Partie 2

Cette partie vous propose d'implémenter quelques fonctions pures permettant à notre petit jeu de prendre vie.

Commencez au sein d'un premier Terminal de lancer les commandes suivantes :

```bash
npm install             // Installlation des dépendances
npm run serve           // Démarrage d'un serveur local (http://localhost:9000)
```

Si votre navigateur ne s'est pas lancé, ouvrez le à l'URL http://localhost:9000 qui devrait vous afficher notre jeu.

Dans un second Terminal ("+" en haut à droite du Terminal de Visual Studio Code), lancez la commande habituel pour les tests

```bash
npm test
```

Puis, implémentez les fonctions suivantes dans le fichier `src.js` :

- `addScore()` : Le score doit augmenter au fil du temps
- `isStill()` : Le personnage est tranquille si il ne bouge pas à gauche ou à droite
- `isMovingInDirections()` : Le personnage est maintenant capable de bouger grâce aux flèches directionnelles
- `rewind10Fames()` : Il est possible de revenir 10 frames dans le passé grâce à la touche R
- `moveMonsters()` : Les monstres bougent
- `isJumpReachedLimit()` : Le personnage a une limite de hauteur de saut
- `collideWithMonsters()` : Retourne si une collision a lieu entre le personnage et un des monstres. *Hint: vous pouvez utiliser la fonction [some](https://www.w3schools.com/jsref/jsref_some.asp) de l'API standard Javascript*

Pour les plus assidu.e.s, vous pouvez supprimer d'autres fonctions et tentez votre propre implémentation ! Ou effectuez des améliorations sur le gameplay.
