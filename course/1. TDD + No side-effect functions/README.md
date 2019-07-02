# Partie 1: Test Driven Development (TDD) et No side-effect Functions

## 1.1: TDD
__TODO__

## 1.2: No side-effect Functions
En programmation fonctionnelle, on évite au maximum les effets de bord.

Selon Wikipedia:
> En informatique, une fonction est dite à effet de bord (traduction mot à mot de l'anglais side effect, dont le sens est plus proche d'effet secondaire) si elle modifie un état en dehors de son environnement local, c'est-à-dire a une interaction observable avec le monde extérieur autre que retourner une valeur.

Plus simplement, une fonction à effet de bords est une fonction qui modifie l'état global d'un programme. Ceci comprend la modification de variables extérieures, l'écriture dans des fichiers, une base de données, les interactions au clavier, etc...

En pratique, on aime définir des fonctions dont le comportement dépend uniquement de ses paramètres. Comme nous le verrons plus tard, ceci permet une grande composabilité des fonctions et facilite la compréhension des programmes grâce à une complexité moindre. En effet, les programmes fonctionnels ne contiennent quasiment pas d'état à proprement parler.

Voici quelques exemples de fonctions sans effets de bord:
```js
// Type: Double => Double
function add(x, y) {
  return x + y
}
```

```js
// Type: Double => Double
function perimeter(r) {
  return 2*Math.PI*r
}
  ```
  
```js
// Type: Date => String
function getDay(date) {
  return date.day
}
  ```
  
Dès lors, une fonction sans paramètre crée nécessairement des effets de bord, à moins qu'elle ne retourne une constante.
```js
// Type: Void => Date
// Side effect!
function getDate() {
  return Date()
}
```
  
Toutefois, dans un langage non fonctionnel, la signature d'une fonction ne permet pas de définir si elle crée un effet de bord ou non. Par exemple:
```js
// Type: Date => Date
function nextDay(date) {
  date.setDay(date.getDay()+1); // Side-effects
  return date;
}
```

*Note: selon la définition présentée ici, les programmes fonctionnels sont totalement inutiles puisqu'ils ne font rien! En pratique, on pense les programmes fonctionnels de telle sorte à placer les effets de bords en périphérie du code et le code fonctionnel au coeur. Ceci sera expliqué plus précisément en partie 5.*
