# Partie 1: Test Driven Development (TDD) et No side-effect Functions

## 1.1: TDD
Assurer le bon fonctionnement de logiciels est un enjeu incontournable du développement. Au fil des années, différentes approches de développement ont été mises en place et testées. L'une d'elle, issue de l'Extreme Programming, __TDD__, propose d'écrire les tests unitaires *avant* l'écriture du code.

Au lieu d'écrire des dizaines, voire centaines de lignes de code, puis de les tester à la fin (aheum...), on commence par écrire les tests de fonctionalités des classes et fonctions que l'on doit implémenter, puis on s'attaque au code à proprement parler. L'idée est de faire passer progressivement les batteries de test écrites au préalable.

En pratique, TDD repose sur un principe de développement par cycles courts:

1. Ecrivez un test.
2. Exécutez tous les tests et voyez si le nouveau test passe.

    *Si le nouveau test passe déjà, inutile de modifier inutilement le code!*
3. Si nécessaire, écrivez le code
4. Exécutez les tests et assurez-vous que tous passent
5. Refactorez votre code
6. Répétez


Cela se traduit positivement. Notamment car,
- En général TDD permet d'atteindre un très bon niveau de coverage.
- Le refactoring fait partie intégrante du cycle de développement, ce qui aide à garder un code simple et allant à l'essentiel.
- TDD force les développeurs à concevoir les fonctionnalités de leur code avant l'implémentation. Le code qui est ensuite produit est en général de meilleure qualité, plus facilement maintenable et facile à comprendre.

Dans le cadre de ce workshop, nous reprenons l'idée de TDD lors des différents exercices qui vous seront proposés. En effet, ils seront fournis avec leurs batteries de tests respectifs. Votre but sera alors de réaliser les implémentations demandées de telle sorte à passer tous les tests.

Nous vous proposons de vous essayer à TDD pour vos projets personnels. Cela ne nécessite aucun outil ni connaissance supplémentaire!

## 1.2: No side-effect Functions
En programmation fonctionnelle, on évite au maximum les effets de bord.

Selon Wikipedia:
> En informatique, une fonction est dite à effet de bord (traduction mot à mot de l'anglais side effect, dont le sens est plus proche d'effet secondaire) si elle modifie un état en dehors de son environnement local, c'est-à-dire a une interaction observable avec le monde extérieur autre que retourner une valeur.

Plus simplement, une fonction à effet de bords est une fonction qui modifie l'état global d'un programme. Ceci comprend la modification de variables extérieures, l'écriture dans des fichiers, une base de données, les interactions au clavier, etc...

En pratique, on aime définir des fonctions dont le comportement dépend uniquement de ses paramètres. De telles fonctions sont dites __pures__. Comme nous le verrons plus tard, ceci permet une grande composabilité des fonctions et facilite la compréhension des programmes grâce à une complexité moindre. En effet, les programmes fonctionnels ne contiennent quasiment pas d'état à proprement parler.

Voici quelques exemples de fonctions sans effets de bord:
```js
// Type: Double, Double => Double
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

## 1.3: A vous de jouer!
Vous trouverez les exercices relatives à cette partie [ici](https://github.com/association-api/workshop-fp/tree/master/code/exercise1).
