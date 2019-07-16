# Partie 0: Introduction

## 1.1: Pourquoi
Les ordinateurs sur lesquels nous travaillons au quotidien sont basés sur l'architecture de Von Neumann (1945).

Selon Wikipedia:
> L’architecture de von Neumann décompose l’ordinateur en 4 parties distinctes :
> * l’unité arithmétique et logique (UAL ou ALU en anglais) ou unité de traitement : son rôle est d’effectuer les opérations de base ;
> * l’unité de contrôle, chargée du « séquençage » des opérations ;
> * la mémoire qui contient à la fois les données et le programme qui indiquera à l’unité de contrôle quels sont les calculs à faire sur ces données. La mémoire se divise entre mémoire volatile (programmes et données en cours de fonctionnement) et mémoire permanente (programmes et données de base de la machine) ;
> * les dispositifs d’entrée-sortie, qui permettent de communiquer avec le monde extérieur.

Aujourd'hui encore, le fonctionnement de nos machines se base (du moins partiellement) sur cette architecture. Partant de ce constat, nous avions deux possibilités pour le  développement de nos langages de programmation, soit:
* Partir de l'architecture de Von Neumann (hardware) et ajouter de l'abstraction
* Partir des mathématiques et enlever de l'abstraction

Les deux chemins ont été suivis, ce qui a donné naissance dans la catégorie des langages basés sur le hardware à :
*  Fortran (1954)
*  Cobol (1959)
*  C (1972)
*  Smalltalk (1972)
*  C++ (1984)
*  Java (1995)
*  Javascript/Ruby/Python (1991-1995)
*  C# (2002)

Les langages basés sur les mathématiques, donc de plus haut niveau ont également évolués au fil des années :
* LISP (1958)
* Scheme (1970)
* Prolog (1972)
* ML (1973)
* CommonLisp (1984)
* Erlang (1986)
* Haskell (1990)
* OCaml (1996)

Chaque abstraction ayant son coût, il est clair qu'à une époque où la RAM et le CPU étaient chers et en quantités réduites (16Mb RAM-40Mhz en 1990), il n'était pas possible d'envisager de partir dans la seconde direction. Les langages plus proches du hardware ont donc logiquement pris le dessus par rapport aux langages qui étaient basés sur les mathématiques.

## 1.2 Un retour à la simplicité

En théorie, il est possible de créer exactement les mêmes programmes avec ces deux approches. Toutefois, la programmation basée sur les mathématiques (programmation fonctionnelle) a tendance à apporter des constructions plus simples et plus robustes.

Rich Hickey dans son talk [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy/) met en opposition les outils complexes que nous utilisons au quotidien, et les outils plus simples que nous pourrions utiliser.

Parmi elles, il définit :
- Qu'il est plus simple de travailler avec des **values** qu'avec des **objects**, car ces derniers mélangent la notion de temps, de valeur et d'état (lié à la mutabilité)
- Qu'il est plus simple de travailler avec des **functions** qu'avec des **methods**, car ces dernières sont basées sur des objets
- Qu'il est plus simple de travailler avec des **managed references** plutôt qu'avec des **variables** afin d'éviter les problèmes de concurrence
- Qu'il est préférable de disposer du **polymorphism a la carte** (car on aime le polymorphisme), plutôt que d'utiliser l'**inheritance**
- Qu'il est plus simple de travailler avec des **set functions** plutôt que des **imperative loops**
- Qu'il est préférable d'utiliser du **declarative data manipulation** (SQL, LinQ, Datalog) plutôt que d'utiliser un **ORM**

## 1.3 Aucune raison de changer

Malgré les bénéfices que peuvent apporter la programmation fonctionnelle et les évolutions hardware qui permettent aujourd'hui d'utiliser cette approche, il n'y a pas eu de raison de changer la façon dont nous réalisons nos programmes; nous avons beaucoup de littérature sur les pratiques à adopter, des retours d'expériences, des personnes formées sur le marché et surtout des applications en production à maintenir.

Il manque encore l'incitation à changer.

## 1.4 CPU multi-coeurs
L'apparition des CPU multi-coeurs va être l'élément qui va pousser la programmation fonctionnelle sur le devant de la scène. Les CPU se complexifient, il est encore plus difficile qu'avant de gérer la mémoire et encore plus ardu d'exploiter au maximum les coeurs qui nous sont mis à disposition.
De plus, les capacités des CPUs et l'accès à la RAM ont évolué de manière non linéaires, ce qui a poussé à mettre en place des caches au niveau des processeurs. Il faut donc que nos programmes puissent gérer de manière efficaces ces caches sans devoir aller taper trop régulièrement dans la RAM.

Nous avons besoin d'une abstraction supplémentaire afin de gérer ces problématiques !

## 1.5 Tendances aujourd'hui

Si le nombre de coeurs dans nos CPU n'évoluent pas autant qu'attendu à l'époque, le chemin vers la programmation fonctionnelle a été pris dans quasiment tous les langages mainstream (avec plus ou moins de succès).
Parmi les "nouveaux" langages que peuvent être F# (2002), Scala (2003), Clojure (2007), Go (2009), Kotlin (2011), Elixir (2012), ELM (2012) et Rust (2015), sept d'entre eux possèdent de fortes influences fonctionnelles. Même dans le cas de Rust qui se veut un langage système, nous retrouvons certains des concepts que nous allons analyser durant ce workshop. Seul Go reste en dehors de cette inspiration.

## 1.6 Javascript
Durant cette soirée, nous vous proposons de découvrir la programmation fonctionnelle au travers d'un langage qui permet de mettre relativement facilement en pratique ses principes. Le choix de Javascript a été fait afin d'éviter la friction que peut avoir un nouveau langage et ainsi être capable de toucher un maximum de participants.

Nous vous inviterons après ce workshop à vous intéresser à un vrai langage fonctionnel !
