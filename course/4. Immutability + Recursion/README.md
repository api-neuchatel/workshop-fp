# Partie 4: Immuabilité et Récursion

## 4.1: Immuabilité
Les valeurs muables rendent le raisonnement et le debugging de code dans les langages passant les paramètres aux fonctions par référence très compliqué. Prenons l'exemple suivant:

```js
var birthDate = new Date(1985, 11, 26)
var alice = { name: "Alice", birthDate: birthDate }

birthDate.setFullYear(2000)
var bob = { name: "Bob", birthDate: birthDate }

console.log(alice.name + ": " + alice.birthDate.getFullYear()) // "Alice: 2000"
console.log(bob.name + ": " + bob.birthDate.getFullYear()) // "Bob: 2000"
```
La raison à cela est que `alice` et `bob` utilisent le même objet `birthDate` en mémoire. Dès lors, la modification de `birthDate` modifie la date de naissance d'Alice et de Bob alors que ce n'est pas ce qui était voulu en écrivant ce code.

L'__immuabilité__ permet de palier élégament à ce problème. De manière générale, une valeur immuable signifie qu'une fois écrite en mémoire, elle ne peut plus être modifiée, ce qui n'implique pas pour autant qu'on ne peut rien en faire. Pour la modifier, on en crée simplement une copie. Dans ce cas, si au lieu de faire `birthDate.setFullYear(2000)` on avait fait `birthDate = new Date(2000, birthDate.getMonth(), birthDate.getDay())`, `alice` et `bob` travailleraient chacun avec leur propre copie de `birthDate` et le problème serait résolu.

En programmation fonctionnelle, on évite également au maximum les valeurs muables, ce qui permet une meilleure lisibilité du code et facilite le raisonnement à propos du programme. Cette notion est liée à celle des fonctions sans effets de bords. En effet une fonction sans side effects ne peut pas travailler avec des valeurs muables.

## 4.2: Récursion
Revenons sur nos implémentations de `map` et de `filter` sur les tableaux. En partie 2, nous avons écrit ceci:

```js
// Type: ([Double], Double => A) => [A]
function map(numbers, f) {
  var tmp = []
  for(i = 0; i < numbers.length; i++) {
     tmp.push(f(numbers[i]))
  }
  return tmp
}

// Type: ([Double], Double => Boolean) => [Double]
function filter(numbers, p) {
  var tmp = []
  for(i = 0; i < numbers.length; i++) {
    if(p(numbers[i])) {
      tmp.push(numbers[i])
    }
  }
  return tmp
}
```

Ces deux implémentations souffrent de 3 désavantages majeurs:
- Elles ne sont __pas immuables__ et donc pas sans effets de bords (ici `tmp` est créé en mémoire, puis on ajoute des valeurs au même objet).
- Elles ne sont __pas scalable__. Supposons que `f` et `p` soient deux fonctions dont le temps d'exécution est conséquent. Pour améliorer la rapidité du code, on pourrait penser à le paralléliser, ce qui n'est pas aisé (mais pas impossible) avec des for loops.
- Elles ne sont pas __faciles à vérifier__. Une autre méthode pour assurer le bon fonctionnement de programmes est l'analyse statique du code. En bref, on passe le code dans un autre programme qui peut démontrer ou non mathématiquement son exactitude. Ces implémentations manquent de __structure__ ce qui rend leur analyse statique difficile.

La récursion permet de résoudre élégamment ces trois problèmes en une fois.
