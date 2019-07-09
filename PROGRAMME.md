# Workshop Functional Programming

## TODO
  - [X] Arnaud - Installation + contrôle via code (test installation)
  - [X] Arnaud - Introduction
  - [x] Xavier - Partie 1 (Théorie)
  - [x] Xavier - Partie 1 (Pratique)
  - [X] Xavier - Partie 2 (Théorie)
  - [x] Arnaud - Partie 2 (Pratique)
  - [x] Xavier - Partie 3 (Théorie)
  - [x] Arnaud - Partie 3 (Pratique)
  - [x] Xavier - Partie 4 (Théorie)
  - [x] Arnaud - Partie 4 (Pratique)
  - [ ] Arnaud - Partie 5 (Platformer)

## Avant le workshop
- Prérequis des participants: solide expérience de programmation, maîtriser JS est un +
- Demander aux participants d'installer le nécessaire (probablement Node) sur leurs machines?

## Introduction
**Durée 10-15mn**

- Présentation du programme
- Présentation du paradigme fonctionnel (sondage?! quelques questions?)
  - Depuis combien de temps ça existe?
  - Intérêt dans l'industrie d'aujourd'hui?
  - Difficultés que l'on rencontre et le besoin d'outils pour les besoins modernes (data analysis, besoin de modèles pour prouver mathématiquement que des programmes sont corrects, ...)
  - Quelles différences avec la programmation impérative?
  - A quoi ça sert?
  - Est-ce qu'il faut avoir un doctorat en mathématiques?
  - Avec exemples concrets...

## Partie 1 (TDD + no side-effect functions)
**Théorie : Durée 10 min**

  - Live coding d'une classe utilitaire (à définir) en TDD. Ecrire des tests, puis passer à l'implémentation fonction par fonction. Si possible trouver un exemple où l'implémentation naïve d'une fonction fait foirer un autre test pour montrer l'intérêt (p. ex. en popant une valeur d'une stack muable) => le reste du workshop s'appuie sur un principe TDD où l'on fournit les tests et les participants doivent écrire les code pour les faire passer.
  - Théorie no side-effect functions avec exemples

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

**Pratique : Durée 20mn**

Par exemple :
- Fonction très simple (formule mathématique)
- Avec l'API Date de Javascript
- Somme des nombre d'un tableau

## Partie 2
### Functions as first class citizen + Higher order functions + Lambda + Closures
**Théorie : Durée 10mn**

Théorie basée sur l'abstraction. Par exemple, on se rend compte que plusieurs opérations que l'on fait souvent sur des tableaux ont en fait une bonne partie de leur fonctionnement qui est commun:

```js
// Type: A => A
function f(x) { return ... }
// Type: A => Boolean
function predicate(x) { return ... }
var data = [...]

// map
var tmp = []
for(i = 0; i < data.length; i++) {
    tmp.push(f(data[i]))
}

// filter
var tmp = []
for(i = 0; i < data.length; i++) {
    if(predicate(data[i])) {
        tmp.push(data[i])
    }
}
```

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

**Pratique : Durée: 20mn**

## Partie 3
### Currying + Lazy evaluation

**Théorie : Durée 20mn**

Implémenter `map()` et `filter()` (pour l'instant OK si on a une boucle et des side-effects)

- Currying (lien avec l'évaluation partielle de fonctions?)
- Lazy evaluation. (baser la théorie sur des streams dont les valeurs sont évaluées uniquement lorsque l'on en a besoin).

Supposons que l'on veuille représenter l'ensemble des nombres entiers en une seule structure de données. Idée naïve:
```js
var integers = []
for(i = 0; i < MAX_VALUE; i++) {
    integers.push()
}
```
Pas efficace, ni d'un point de vue temporel, ni spatial. Meilleure idée: avoir une notion de stream pour laquelle on définit une valeur de départ et une fonction pour calculer la valeur suivante (implémentation JS à vérifier):
```js
let stream = Stream(1, x => x + 1)
// Accéder aux 10 premières valeurs
stream.take(10)
// Récupérer les entiers pairs
stream.map(x => 2*x)
// Récupérer les entiers premiers
stream.filter(x => isPrime(x))
// Prendre des valeurs jusqu'à ce qu'une condition soit vérifiée
stream.takeUntil(x => p(x))
```

**Pratique : Durée 20mn**

Réaliser des exercices basés sur les streams

## Partie 4
### Immutability + Recursion  
**Théorie : Durée 15mn**  
Revenir sur l'implémentation de `map()` et `filter()` de la partie 2 pour proposer de la réécrire en version immuable et efficace à paralléliser (live coding, par exemple: [ici](https://playcode.io/302769?tabs=console&script.js&output).

**Pratique : Durée 20mn**  
Implémenter un `reduce()`

## Partie 5: Projet

**Durée 60 mn**

- Armés de quelques constructions fonctionnelles, faire un projet simple avec une base de données (p. ex. movies & ratings) axé sur Map-Reduce.
- Conclusion du projet

- Data Science
- Functional Platformer
  - Présentation du projet sous forme de flux
  - FRP / BaconJS


## Allez plus loin

Langages fonctionnelles : Haskell, ELM, ReasonML, Clojure/script, F#, Elixir, Erlang
Le "cas" Scala

## Conclusion et remerciements
