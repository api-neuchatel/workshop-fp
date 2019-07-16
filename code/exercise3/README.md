# Partie 3 - Exercice

Cet exercice vous permet de vous familiariser avec le currying (une forme de l'application partielle de fonction) et de la lazy evaluation au travers de Stream.

Commencez par exécuter les traditionnelles commandes :

```bash
npm install // Installation des dépendances
npm test    // Lancement des tests en continu
```

## Currying

- Créez la fonction `helloCurry` qui reçoit en paramètre un `firstName` et qui retourne une fonction qui reçoit en paramètre un `lastName` et qui retourne une chaîne de caractères `Hello [lastName] [firstName]`.
- Créez la fonction `multiplyCurry` qui reçoit en paramètre un nombre et qui retourne une fonction qui reçoit en paramètre un autre nombre puis effectue la multiplication.
- Créez la fonction `multiplyBy4` en utilisant la fonction `multiplyCurry`.
- Créez l   a fonction `multiplyBy20`en utilisant la fonction `multipleCurry`.

## Lazy Evaluation

- Créez la fonction `infiniteStreamOf1` qui retourne la valeur 1 de manière infinie.
- Créez la fonction `infiniteStreamThatDoubleValues` qui commence à la valeur 0 et qui s'incrémente de 1. Appliquez ensuite une transformation (`map`) afin de doubler chacune des valeurs.
- Créez la fonction `infiniteStreamOfPrimeNumbers` qui commence à la valeur 0 et qui s'incrémente de 1. Appliquez ensuite un filtre afin de ne reprendre que les nombres premiers (`isPrime`).
- Créez la fonction `primeNumbersLessThan2000`qui commence à la valeur 0 et qui s'incrémente de 1. Appliquez ensuite un filtre afin de ne reprendre que les nombres premiers (`isPrime`). Puis, effectuez une fonction terminale pour ne reprendre que les valeurs plus petites que 2000.
