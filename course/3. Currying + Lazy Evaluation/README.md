# Partie 3: Currying et Lazy Evaluation

## 3.1: Currying
En partie 2, nous avons vu que les higher order functions nous permettraient de faire de l'évaluation partielle de fonctions. Pour rappel, nous avions pris l'exemple suivant:

```js
function greet(gender) {
  return function(firstname, lastname) { return gender + " " + firstname + " " + lastname }
}
```

Le __currying__ est une forme particulière d'évaluation partielle lors de laquelle les arguments d'une fonction sont évalués l'un après l'autre. Reprenons notre exemple: la version standard de cette fonction serait

```js
// Type: (String, String, String) => String
function greet(gender, firstname, lastname) {
  return gender + " " + firstname + " " + lastname
}

greet("Mr", "Jean", "Dupond") // "Mr Jean Dupond"
```

A l'inverse, on peut en créer une version currifiée:

```js
// Type: String => String => String => String
function greet(gender) {
  return function(firstname) {
    return function(lastname) {
      return gender + " " + firstname + " " + lastname
    }
  }
}

greet("Mr")("Jean")("Dupond") // "Mr Jean Dupond"
```

Cette définition étant relativement lourde, on peut utiliser la syntaxe raccourcie des lambda pour écrire de manière équivalente

```js
let greet = gender => firstname => lastname => gender + " " + firstname + " " + lastname

greet("Mr")("Jean")("Dupond") // "Mr Jean Dupond"
```

Cette syntaxe nous permet d'évaluer `greet` partiellement à différents endroits du programme, ce qui peut se révéler très pratique dans un langage fonctionnel où on veut éviter d'avoir des variables muables (plus sur l'immuabilité en partie 4).

```js
let greetMr = greet("Mr")
// code
let greetFirstname = greetMr("Jean")
// code
print(greetFirstname("Dupond"))
```

## 3.2: Lazy Evaluation
La __lazy evaluation__ permet de retarder l'évaluation d'une valeur au sein de programme. Le currying en est un exemple mais nous abordons ici un autre concept intéressant rendu possible et élégant par la programmation fonctionnelle: les __streams__.

Supposons que l'on souhaite représenter une séquence infinie de valeurs, par exemple les entiers de 0 à l'infini. Une solution naïve pourrait être ceci:

```js
var integers = []
for(i = 0; i < MAX_VALUE; i++) {
    integers.push(i)
}
```

Bien sûr, ce n'est ni efficace au niveau de la mémoire et encore moins au niveau du temps d'exécution. Une solution bien plus élégante serait de pouvoir définir une valeur de départ ainsi qu'une fonction qui permette de calculer la prochaine valeur du stream à partir de la valeur précédente. Par exemple, on aimerait pouvoir écrire (notez le currying):

```js
let stream = Stream.init(0)(x => x + 1) // 0, 1, 2, 3, ... (infini!)

Stream.take(stream)(5) // [0, 1, 2, 3, 4]
Stream.map(stream)(x => 2*x) // 0, 2, 4, 6, ... (infini!)
Stream.filter(stream)(x => isPrime(x)) // 2, 3, 5, 7, ... (infini!)
Stream.takeUntil(stream)(x => 2*x >= 12) // [0, 1, 2, 3, 4, 5, 6]
```

La force de cet outil est qu'on peut alors partir d'un stream __infini__, lui appliquer des modifications de notre choix à l'aide de `map` et `filter`, puis récupérer les valeurs que l'on souhaite dans un tableau de taille finie. Par exemple, pour récupérer les nombres premiers plus petits que 100: `Stream.takeUntil(Stream.filter(stream)(isPrime))(x => x >= 100)`.

En réalité, l'implémentation d'un objet __stream__ comme ceci en Javascript n'est pas si compliquée.

```js
let Stream = {
  init: x => f => {
    return {
      value: x,
      next() { return Stream.init(f(x))(f) }
    }
  }
}
```

Décortiquons le code précédent. On voit qu'un stream n'est en fait rien d'autre qu'un tuple de deux éléments: la valeur courante du stream, ainsi qu'une __fonction__ qui permet de calculer l'élément suivant, qui n'est rien d'autre qu'un stream lui-même ayant `f(x)` comme valeur et `f` comme fonction d'incrément. Par exemple:

```js
let stream = Stream.init(1)(x => x + 1) // { value: 1, next: Stream.init(2, x => x + 1) }
stream.next() // { value: 2, next: Stream.init(3, x => x + 1) }
stream.next().next() // { value: 3, next: Stream.init(4, x => x + 1) }
// ...
```
Notez que dans notre objet `Stream`, `next` est en fait une fonction qui n'a __pas encore été évaluée__. Ceci permet de calculer la prochaine valeur du stream au bon vouloir de l'utilisateur, __à l'extérieur__ de l'objet. Si on évaluait `next` dans l'objet `Stream`, créer un stream se solderait par une erreur de mémoire, puisque tous les éléments seraient calculés les uns après les autres immédiatement.

Dès lors, on peut implémenter une fonction `take`:

```js
// Type: Stream[A] => Int => [A]
let take = stream => n => {
  var tmp = []
  nextStream = stream
  for(i = 0; i < n; i++) {
    tmp[i] = nextStream.value
    nextStream = nextStream.next()
  }
  return tmp
}
```

*Note: on verra en partie 4 que l'on peut réaliser la même opération de manière beaucoup plus élégante en utilisant une fonction récursive.*

Alors que `take` se contente d'évaluer le stream n fois, il peut être intéressant de considérer une implémentation possible de `map`, qui elle doit retourner un stream infini:

```js
// Type: Stream[A] => (A => B) => Stream[B]
let map = s => f => {
  return {
    value: f(s.value),
    next() { return Stream.map(s.next())(f) }
  }
}
```

Sa définition est quasiment identique à celle de `init`.
