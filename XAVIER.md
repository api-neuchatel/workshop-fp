# Workshop Functional Programming

## Avant le workshop
- Prérequis des participants: solide expérience de programmation, maîtriser JS est un +
- Demander aux participants d'installer le nécessaire (probablement Node) sur leurs machines?
- Accès à une salle équipée avec machines configurables selon nos besoins (cf workshop iOS)?

## Introduction
- Présentations, blabla introductif
- Pourquoi la programmation fonctionnelle?
- Bref historique?
- Intérêt dans l'industrie aujourd'hui (pas seulement un outil académique). Petit speech d'Arnaud sur les "technologies à la con" et le besoin de nouveaux outils pour les besoins modernes (data analysis, besoin de modèles pour prouver mathématiquement que des programmes sont corrects, ...)?

## Partie 1 (TDD + no side-effect functions)
- [5min] Live coding d'une classe utilitaire (à définir) en TDD. Ecrire des tests, puis passer à l'implémentation fonction par fonction. Si possible trouver un exemple où l'implémentation naïve d'une fonction fait foirer un autre test pour montrer l'intérêt (p. ex. en popant une valeur d'une stack muable) => le reste du workshop s'appuie sur un principe TDD où l'on fournit les tests et les participants doivent écrire les code pour les faire passer.
- [5min] Théorie no side-effect functions avec exemples
- [15min] Réécriture d'une partie de code

## Partie 2 (Functions as 1st class citizens + HO functions + closures)
- [10min] Théorie basée sur l'abstraction. Par exemple, on se rend compte que plusieurs opérations que l'on fait souvent sur des tableaux ont en fait une bonne partie de leur fonctionnement qui est commun:
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

=> Ce que fait le code ci-dessus n'est pas évident à la première lecture + side effects + dans les deux cas, on crée un tableau temporaire dans lequel on push des données à certaines conditions. Pourquoi ne pas abstraire la partie commune du code pour le rendre plus lisible?

- [20min] Pratique: implémenter `map()` et `filter()` (pour l'instant OK si on a une boucle et des side-effects)

## Partie 3 (Currying + lazy evaluation)
- [10min] Théorie currying (idée à développer: évaluation partielle de fonctions?)
- [10min] Théorie lazy evaluation. Idée: baser la théorie sur des streams dont les valeurs sont évaluées uniquement lorsque l'on en a besoin (peut-être trop académique?).

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
- [20min] Pratique: fournir une classe `Stream` et faire l'implémentation de certaines méthodes?

## Partie 4 (Immutability + recursion)
- [15min] Théorie: revenir sur l'implémentation de `map()` et `filter()` de la partie 2 pour proposer de la réécrire en version immuable et efficace à paralléliser (live coding, par exemple: [ici](https://playcode.io/302769?tabs=console&script.js&output).
- [15min] Pratique: implémenter un `reduce()`?

## Partie 5: Projet
- [40min] Armés de quelques constructions fonctionnelles, faire un projet simple avec une base de données (p. ex. movies & ratings) axé sur Map-Reduce.
- [10min] Conclusion du projet
    
    Quel est le gain apporté par le fonctionel? Le code n'est-il pas plus lisible? Plus simple à écrire? Facile à paralléliser? Facilement extensible et maintenable?

## Conclusion et remerciements