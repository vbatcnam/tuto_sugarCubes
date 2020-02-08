# La famille miniSweet

## Préambule
Ce qui va suivre est le deuxième chapitre : Il fait suite au tuto 
	Créer mon premier jeu avec SugarCubes(SC)


## La syntaxe simplifiée de SugarCubes pour JavaScript
Comme vous l'avez vu dans le premier chapitre, j'ai d'abord créé une classe, des objets de cette classe puis des cubes SC dans lesquels je mettais les objets.
Je créais des événements (SC.evt), des programmes (SC.par) et une machine (SC.machine)

Cela alourdi le fichier et on s'y perd un peu...(cf miniSweet/Sweet.js)
Nous allons nous servir du fichier qui se trouve dans lib : syntaxeSimplifieeSC.js

Ensuite, nous allons modifier notre fichier Sweet.js (cf minSweetFamily/Sweet.js)
J'ai mis  *SC.evt("Me voici")* tout au début du fichier.
Je l'avais nommé *var meVoici* mais on ne savait pas trop ce que c'était : Je lui ai donc donné un nom plus parlant.<br>
En effet, *SC.evt("")* est en fait le type d'info qui sera diffusé au monde, par n'importe quel habitant de ce monde.

Voir la démo https://vbatcnam.github.io/tuto_sugarCubes/minSweetFamily/

On pourrait faire une généalogie.

	En fait *SC.evt* pourrait s'appeler *SC.titreInfoEmise* ou *SC.signalEmis*

	J'ai donc écrit : 
```javascript
var signalDePosition = SC.evt("Me voici");
```

En vrai, l'objet se donne lui-même et non juste l'info. Pourquoi ? 
Voir avec JFS...

## Je crée la classe

Ma classe Sweet est une classe héritée de la classe *SCCube* qui se trouve dans 
*lib/syntaxeSimplifieeSC.js* (cf minSweetFamily/Sweet.js)

Ensuite je crée mes cubes :

```javascript
var monCube = new Sweet(ps_id, ps_sexe, pCouleur, pn_x, pn_y);
```

Je les ajoute à mon monde déjà créé dans lib/syntaxeSimplifieeSC.js

```javascript
monde.addActor(monCube);
```

#Les autres branches possibles

##Syntaxe simplifiée 
Pour faciliter le code et créer un cube en même temps que son objet, voici une syntaxe simplifiée de SugarCubes pour JS.

##Famille 
Les miniSweets ne peuvent pas se reproduire avec leurs parents, frères et sœurs.
J'ai utilisé la syntaxe simplifiée de SugarCubes pour JS.

##Halloween
Ce ne sont plus des miniSweets mais des miniGoasts qui envahissent votre écran
Une variante de Famille...
