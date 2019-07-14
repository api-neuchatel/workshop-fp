# Partie 5: Projet

## Functional Reactive Programming (FRP)
La programmation fonctionnelle réactive est une approche qui apporte une solution dans la manière de gérer les effets de bords.
En programmation réactive, tous les évènements correspondent à une suite de valeurs discrètes (Stream) auxquelles sont appliquées des traitements grâce à des éléments issus de la programmation fonctionnelle.

Selon Wikipedia:
> Functional reactive programming (FRP) is a programming paradigm for reactive programming (asynchronous dataflow programming) using the building blocks > of functional programming (e.g. map, reduce, filter). FRP has been used for programming graphical user interfaces (GUIs), robotics, games, and music, > aiming to simplify these problems by explicitly modeling time.[citation needed]

## BeaconJS

Dans la cadre de ce projet, nous allons utiliser la librairie BaconJS qui est une implémentation de FRP en Javascript.

> A small functional reactive programming lib for JavaScript. Turns your event spaghetti into clean and declarative feng shui bacon, by switching from imperative to functional. It's like replacing nested for-loops with functional programming concepts like map and filter. Stop working on individual events and work with event-streams instead. Transform your data with map and filter. Combine your data with merge and combine. Then switch to the heavier weapons and wield flatMap and combineTemplate like a boss. It's the _ of Events. Too bad the symbol ~ is not allowed in Javascript. 

https://baconjs.github.io/

## Input as EventStream

----R-----J-----L--------R  
------------J--R--------L-----R----- 

<style>
    .bacon-marble {
  padding: 1em;
  padding-bottom: 2em;
  padding-top: 0;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.bacon-input, .bacon-output {
  position: relative;
  padding: 0.5em;
  margin: 0.8em;
}
.bacon-output:before, .bacon-input:before {
  content: ' ';
  height: 2px;
  position: absolute;
  top: 85%;
  width: calc(100% + 20px);
  background-color: lightgray;
  z-index: 5;
}
.bacon-output:after, .bacon-input:after {
    content: '\25B6';
    color: lightgray;
    width: 20px;
    font-size: 20px;
    height: 20px;
    position: absolute;
    right: -40px;
    top: 22px;
}
.bacon-input span {
 z-index: 10;
}
.bacon-output span, .bacon-input span {
 font-weight: bold;
 background-color: #000080;
 color: white;
 font-family: "nexa bold", sans-serif;
 padding: 0.4em 0.9em;
 border-radius: 2em;
 margin: 0.5em;
}
.bacon-output span {
 background-color: #008000;
 z-index: 10;
}
.bacon-input:nth-child(2) span {
 background-color: #802000;
}
.bacon-label {
 color: #222;
 text-align: center;
 margin-bottom: 1em;
}
.bacon-label code {
 color: #222;
}
.bacon-output label, .bacon-input label {
  position: absolute;
  width: 4.5em;
  text-align: right;
  left: -5em;
  top: 60%;
}
</style>


<div class="bacon-marble" x-time-min="200" x-time-max="1200">
  <div class="bacon-input" x-bacon-input="Bacon.sequentially(200, [9,0,2,0,0,3]).filter(function(x) { return x })"> <div style="display: inline">&nbsp;</div><span style="position: absolute; left: 2%;" x-time="200">9</span><span style="position: absolute; left: 38%;" x-time="600">2</span><span style="position: absolute; left: 92%;" x-time="1200">3</span></div>
  <div class="bacon-input" x-bacon-input="Bacon.sequentially(200, [0,1,0,12,8,0]).filter(function(x) { return x })"> <div style="display: inline">&nbsp;</div><span style="position: absolute; left: 20%;" x-time="400">1</span><span style="position: absolute; left: 56%;" x-time="800">12</span><span style="position: absolute; left: 74%;" x-time="1000">8</span></div>
  <div class="bacon-output" x-bacon-output="function(a,b) { return a.merge(b) }"><div style="display: inline">&nbsp;</div><span style="position: absolute; left: 2%;" x-time="200">9</span><span style="position: absolute; left: 20%;" x-time="400">1</span><span style="position: absolute; left: 38%;" x-time="600">2</span><span style="position: absolute; left: 56%;" x-time="800">12</span><span style="position: absolute; left: 74%;" x-time="1000">8</span><span style="position: absolute; left: 92%;" x-time="1200">3</span></div>
</div>



## Output as EventStream