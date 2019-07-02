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
Encore une fois... que ferait-on si on voulait filter les nombres divibles par 3 ou selon un __prédicat quelconque__? En plus, on constate que le code des deux fonctions `double` et `even` est assez similaire au final. La programmation fonctionnelle apporte des solutions élégantes pour palier à ce problème.

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
function linear(a, b) {
  return function(x) { return a*x + b }
}
```
Dans ce cas, `linear(2, 3)` retourne une fonction qui correspond à une droite ax + b = 0 et prenant un paramètre `x`.
Evaluer `linear(2, 3)(4)` donne la position y du point x = 4, selon la droite ax + b = 0.

## 2.4: Closures
