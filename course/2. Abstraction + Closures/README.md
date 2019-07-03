# Partie 2: Functions as First Class Citizen, Higher Order Functions et Closures

## 2.1: Abstraction
Comme discuté brièvement en partie 1, la programmation fonctionnelle permet d'écrire facilement du code modulable en permettant la composition de fonctions. Prenons par exemple la fonction suivante, qui prend en paramètre un tableau de nombres et qui double la valeur de chaque élément de ce tableau.

```js
// Type: [Double] => [Double]
function double(numbers) {
  var tmp = []
  for(i = 0; i < numbers.length; i++) {
    tmp.push(2*numbers[i])
  }
  return tmp
}
```

Que ce passerait-il si on voulait généraliser cette fonction pour qu'elle ne fasse pas que des multiplications par 2 mais aussi par 3? Pire, si on voulait pouvoir appliquer à chaque élément du tableau une __fonction quelconque__?

Pour aller plus loin, considérons la fonction suivante, qui filtre un tableau de nombres pour en extraire les éléments pairs:

```js
// Type: [Double] => [Double]
function even(numbers) {
  var tmp = []
  for(i = 0; i < numbers.length; i++) {
    if(numbers[i] % 2 === 0) {
      tmp.push(numbers[i])
    }
  }
  return tmp
}
```
Encore une fois... que ferait-on si on voulait filter les nombres divibles par 3 ou selon un __prédicat quelconque__? En plus, on constate que le code des deux fonctions `double` et `even` est assez similaire au final. La programmation fonctionnelle apporte des solutions élégantes pour palier à ces problèmes.

## 2.2: Functions as First Class Citizen
Dans certains langages (dont les langages fonctionnels mais aussi d'autres, comme Javascript), on considère les fonctions comme *first class citizen*. Cela signifie qu'elles peuvent être traitées comme n'importe quelles valeurs. En particulier, on peut __mettre des fonctions dans des variables__ ou encore les __passer en paramètre à d'autres fonctions__.

```js
// Type: Double => Double
let add = function(x, y) { return x + y }

// Type: (Double, Double, Double => Double) => Double
let apply = function(a, b, f) { return f(a, b) }

add(2, 5) // 5
apply(2, 3, add) // 5
```

*Note: dans le code ci-dessus `add` et `apply` sont des variables (constantes)!*

Parfois, il est un peu pénible de devoir trouver des noms pour des fonctions dont le comportement est évident. On peut alors définir des __fonctions anonymes__ (ou lambda). Ainsi, on peut faire:

```js
apply(2, 3, (x, y) => x * y) // 6
```

## 2.3: Higher Order Functions
Le terme __higher order function__ designe une fonction qui prend une autre fonction en paramètre (comme `apply` ci-dessus) ou alors qui retourne une fonction. Par exemple:

```js
function greet(gender) {
  return function(firstname, lastname) { return gender + " " + firstname + " " + lastname }
}
```
Dans ce cas, `greet("Mr")` retourne une fonction qui prend deux paramètres (`firstname` et `lastname`).
Evaluer `greet("Mr")("Jean", "Dupond")` retourne "Mr Jean Dupond". Ceci est très pratique pour faire de l'évaluation partielle de fonctions. Par exemple, on pourrait supposer que ce code a été écrit à un endroit où le sexe de la personne est déjà connu, mais pas son nom ni son prénom.

Plus sur l'évaluation partielle en Partie 3!

## 2.4: Closures
Les __closures__ sont des lambda dont l'environnement d'exécution leur est propre.

```js
let people = {1: "ARNAUD", 2: "XAVIER", 3 "DAMIEN"};

// Type: (Int) => String
let personneById = id => personnes[id];
personneById(2) // "XAVIER"
```
## 2.5: Wrap-up
Revenons à l'exemple de la section 2.1. Avec ces nouveaux outils, on peut créer une version plus générique de `double` comme ceci:

```js
// Type: ([Double], Double => A) => [A]
function map(numbers, f) {
  var tmp = []
  for(i = 0; i < numbers.length; i++) {
     tmp.push(f(numbers[i]))
  }
  return tmp
}
```

Et one version générique de `even` comme ceci:

```js
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

Pour aller plus loin... on pourrait même factoriser encore le code de ces deux fonctions comme ceci:

```js
// Type: ([Double], Double => Boolean, Double => A) => [A]
function filterAndMap(numbers, p, f) {
  var tmp = []
  for(i = 0; i < numbers.length; i++) {
    if(p(numbers[i])) {
      tmp.push(f(numbers[i]))
    }
  }
  return tmp
}

// Type: ([Double], Double => A) => [A]
let map = (xs, f) => filterAndMap(xs, _ => true, f)
// Type: ([Double], Double => Boolean) => [Double]
let filter = (xs, p) => filterAndMap(xs, p, x => x)

```

Ainsi donc

```js
map([1, 2, 3, 4, 5, 6, 8, 9], x => 2*x) // [2, 4, 6, 8, 10, 12, 14, 16, 18]
filter([1, 2, 3, 4, 5, 6, 7, 8, 9], x => x % 2 === 0) // [2, 4, 6, 8]
```

Le gain est que le comportement de `map` et `filter` peut maintenant très facilement être adapté à toutes les circonstances et de manière très lisible. Ce sont des __higher order functions__ que l'on peut utiliser avec des __closures__.
