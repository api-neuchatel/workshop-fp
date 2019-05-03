# Workshop - FP

## Avant
Chaque participant doit disposer d'un environnement fonctionnel (Node + NPM)  
Imposer les outils?

## Partie 0
#### Théorie 15mn
- Présentation du programme
- Présentation du paradigme fonctionnel (sondage?! quelques questions?)
  - Depuis combien de temps ça existe?
  - Pourquoi c'est de retour?
  - Quelles différences avec la programmation impérative?
  - A quoi ça sert?
  - Est-ce qu'il faut avoir un doctorat en mathématiques?

## Partie 1
### TDD + Side-effects free functions

#### Théorie 10mn

```javascript
// Type: (Int, Int) => Int
function add(v1, v2) {
  return v1 + v2;
}
```

```javascript
// Type: (Int) => Int
function circonference(r) {
  return 2*Math.PI*r;
}
```

```javascript
// Type: Unit => Int
// Une fonction qui ne reçoit rien en paramètre et qui retourne une valeur
// => Retourne soit une constante
// => Créé un side-effects
function dayOfWeek() {
  return new Date().day;
}
```

En programmation fonctionnelle, on évite au maximum les effets de bords, une fonction qui ne provoque pas d'effets de bord et dont le résultat dépend uniquement de ses paramètres est référentiellement transparente (referential transparency)

```javascript
// Type: Date => Int
function dayOfWeek(date) {
  return date.getDay();
}
```

Toutefois, dans un langage qui n'est pas fonctionnelle, la signature ne signifie pas à
déterminer si un effet de bord a été créé ou non.

```javascript
// Type: Date => Date
function nextDay(date) {
  date.setDay(date.getDay()+1); // Side-effects
  return date;
}
```

#### Pratique 20mn

Implémentation de quelques fonctions qui ne provoquent pas de side-effects (dont les tests sont fournis)
Par exemple :
- Fonction très simple (formule mathématique)
- Avec l'API Date de Javascript
- Somme des nombre d'un tableau

## Partie 2
### Functions as first class citizen + Higher order functions + Lambda + Closures
#### Théorie 10mn

Le "Functions as first class citizen" définit
que les fonctions sont traitées comme n'importe quelle valeur. Elles peuvent être stockées dans des variables et passés en paramètres d'autres fonctions.

```javascript
// Type: (Int, Int) => Int
const add = (v1, v2) => v1 + v2;

// Type: (Int, Int, (Int, Int) => Int) => Int
const apply = (v1, v2, f) => f(v1,v2);

apply(5,2,add); // => 7
// L'appel à une fonction peut se faire avec une fonction qui n'a psa de nom => lambda
apply(5,2, (v1, v2) => v1 * v2) // => 10
```

Le terme "Higher order functions" définit qu'il est possible de créer une fonction à partir d'une autre fonction en appliquant par exemple de l'application partielle

```javascript
// Type: (Int, Int) => Int
const add = (v1, v2) => v1 + v2;
const add2 = v => add(2,v);
```

Une closure définit simplement une fonction qui utilise des valeurs propre à son environnement.

```javascript
const personnes = {1: "ARNAUD", 2: "XAVIER", 3 "DAMIEN"};

// Type: (Int) => String
const personneById = (id) => personnes[id];

personneById(2); // => "XAVIER"
```

#### Pratique 20mn
- Pratique par des exemples concrets où l'utilisation de ces principes simplifie  grandement le code

## Partie 3
### Currying + Lazy evaluation
#### Théorie 10mn

- Comment démontrer le Lazy evaluation en Javascript avec un exemple simple?
- Comment montrer l'utilité du Currying avec des exemples concrets?

```javascript
const fibbonacci = (100) => {
  let fib = 0;
  return () => {
    fib = fib + fib + 1; // Side-effects?
    return fib;
  }
}

const fib = fibbonacci();
fib(); // => 1
fib(); // => 2
fib(); // => 3
```

#### Pratique 20mn

- Trouver des exercices....

## Partie 4
### Immutability + Recursion
#### Théorie 10mn
 [L'exercice de Xavier](https://playcode.io/302769?tabs=console&script.js&output)  
 Relation avec les fonctions reduce(),fold(),inject()

#### Pratique 30mn
- Transformation de boucles impératives
- Réduction de données grâce à reduce()

## Projet
#### Pratique 60mn
- Data Science
- Functional Platformer
  - Présentation du projet sous forme de flux
  - FRP / BaconJS

## Allez plus loin

Langages fonctionnelles : Haskell, ELM, ReasonML, Clojure/script, F#, Elixir, Erlang
Le "cas" Scala
