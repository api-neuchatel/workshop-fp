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

### Listes récursives
Afin de transformer les fonctions précédentes en fonctions récursives, une première étape est de pouvoir représenter les tableaux comme des structures de données récursives. Ceci n'est pas obligatoire, mais permet d'écrire du code beaucoup plus lisible.

En effet, les tableaux indexés n'ont par nature aucune structure récursive. Itérer sur un tableau se fait par incrément d'indices. Considérons maintenant une conceptuellement récursive des tableaux. Supposons que l'on travaille sur un tableau contenant des éléments de type `A` (par exemple des entiers, des strings, etc...). Appelons le premier élément de ce tableau la tête (`head`). Il s'agit d'un élément de type `A`. Le reste du tableau est appelé la queue (`tail`) et est de type `[A]`. 

Similairement, la queue du tableau est elle-même un tableau... qui contient également une tête et une queue. Cette queue est aussi un tableau qui contient elle-même une nouvelle tête et une nouvelle queue, etc... Ce schéma se répète jusqu'à ce que la nouvelle queue ainsi créée soient en fait une liste vide.

Définissons à présent deux fonctions qui permettent de représenter un tableau standard sous la forme d'un tableau récursif.

```js
// Type: [A] => A
let head = xs => xs[0]

// Type: [A] => [A]
let tail = xs => xs.slice(1)

let numbers = [1, 2, 3, 4, 5]
head(numbers) // 1
tail(numbers) // [2, 3, 4, 5]
head(tail(numbers)) // 2
tail(tail(numbers)) // [3, 4, 5]
```

De plus, nous aurons besoin d'une function de composition qui permette d'ajouter un élément `x` au début d'un tableau `xs`.

```js
// Type: A => [A] => [A]
let prepend = x => xs => x === null ? xs : [x].concat(xs)

prepend(0)([1, 2, 3, 4]) // [0, 1, 2, 3, 4]
prepend(null)([1, 2, 3, 4]) // [1, 2, 3, 4]
```

### Implémentation récursive de `map` et `filter`
Armés de ces nouvelles structures, nous sommes prêts à passer à l'implémentation résursive de nos deux higher order functions favorites.

```js
let map = xs => f => {
  // code
}

let filter = xs => p => {
  // code
}
```

La première étape de la conception d'une fonction récursive est de se demander quelle sera la condition d'arrêt, que l'on appelle également le bas de la récursion (bottom of the recursion). Sans elle, notre fonction récursive ne pourra jamais retourner et donc ne s'arrêtera jamais. Dans les deux cas, notre condition est `xs.length === 0`. On complète:

```js
let map = xs => f => {
  if(xs.length === 0) { return [] }
  // code
}

let filter = xs => p => {
  if(xs.length === 0) { return [] }
  // code
}
```

Dans le cas de `map`, si `xs` n'est pas vide, compte tenu de notre structure de liste récursive, que fait-on? Simplement, on applique `f` à la tête de la liste, puis on récurse sur la queue. Bien sûr, il ne faut pas oublier de combiner tous nos `f(head(xs))` ensemble, il faut donc `prepend` notre nouvelle valeur à la queue à laquelle on aura déjà appliqué `f`.

```js
let map = xs => f => {
  if(xs.length === 0) { return [] }
  return prepend(f(head(xs)))(map(tail(xs))(f))
}
```

On peut écrire de manière plus concise:
```js
let map = xs => f => xs.length === 0 ? [] : prepend(f(head(xs)))(map(tail(xs))(f))
```

Pour `filter`, le raisonnement est presque similaire. On teste `p(head(xs))`, si on obtient `true`, on `prepend` la tête à notre nouvelle liste, sinon on ne fait rien.

```js
let filter = xs => p => {
  if(xs.length === 0) { return [] }
  let queue = filter(tail(xs))(p)
  return p(head(xs)) ? prepend(head(xs))(queue) : queue
}
```

Qu'a-t-on gagné?
- Le code ne contient plus de side effects.
- Le code devient facile à paralléliser avec des constructions fonctionnelles (chaque nouvel appel de la fonction peut se faire dans un nouveau thread, par exemple).
- Nous avons gagné énormément en structure! Plus besoin de gérer une boucle et un état (le compteur). Le code s'exprime comme une répétition de plusieurs fois la même opération pure, simplement évaluée avec des paramètres différents. Ceci rend l'analyse statique beaucoup plus efficace.

## 4.3: Pour aller plus loin
Javascript n'a pas été conçu pour que la récursion y soit agréable, dès lors l'écriture de ces fonctions n'est pas très lisible. D'autre langages prévoient une syntaxe bien plus élégante pour l'écriture de fonctions récursives, par exemple Scala (ici pour des listes de type `A = Int`:

```scala
def map(xs: List[Int], f: Int => Int): List[Int] = xs match {
  case Nil => Nil
  case y :: ys => f(y) :: map(ys, f)
}

def filter(xs: List[Int], p: Int => Boolean): List[Int] = xs match {
  case Nil => Nil
  case y :: ys => if(p(y)) y :: filter(ys, p) else filter(ys, p)
}
```

```clojure
(defn map [f coll]
  (if (seq coll)
      (cons (f (first coll)) (map f (rest coll)))

(defn filter [p coll]
  (if (seq coll)
      (if (p (first coll))
        (cons (first coll) (filter p (rest coll)))
        (filter p (rest coll)))))
```

Ici, `Nil` désigne la liste vide et l'opérateur `::` est l'équivalent de notre `prepend`. Notez la syntaxte du `match ... case`, appelé pattern-matching qui facilite largement la lecture.
