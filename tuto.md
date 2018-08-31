# Créer mon premier cube avec SC

## préembule

Je vais partager mon expérience d'apprentissage de SugarCubes.

Pour vous expliquer comment fonctionne SC, j'ai préféré faire un jeu tout simple pour ne pas se perdre au milieux d'un long code en JS.

Nous allons donc créer un petit jeu avec des carrés animés.

Mais tout d'abord c'est quoi SugarCubes (SC pour simplifier) ?

# SugarCubes kesako ?
SugarCubes est un nouveau langage de programmation ou plutôt un outil pour pouvoir faire du parallélisme dans son programme. 
Par exemple un jeu de simulation.

#  jeu les miniSweets 
Création d'un petit jeu les miniSweets
J'ai décidé de coder ce jeu en javascript mais vous pouvez le faire en java, et peut être python. 
Pour le savoir allez voir le site de JF Susini pour plus de détails

Titre du jeu : les miniSweets
Scénario du jeu : Lorsque deux miniSweets se rencontrent, ils changent de couleur. 
Par exemple : si un miniSweet bleu rencontre un miniSweet rouge, ils deviennent violet.

Pour cela, nous créons une classe Sweet, des objets issus de cette classe, et des Cubes (objet de type SC). Cf miniSweets.js

## La classe :
```javascript 
class MiniCube{
	constructor(obj_parent1, obj_parent2, couleurExaSiEncetre, x, y){
		if(obj_parent1)
			this.parent1 = obj_parent1;
		if(obj_parent2)
			this.parent2 = obj_parent2;
		if(couleurSiEncetre)
			this.couleur = couleurSiEncetre;
		else 
			this.couleur = this.parent1.couleur + this.parent2.couleur; //moyenne des couleurs des parents
		this.x = x;
		this.y = y;
	}
}
```

Dans sugarCubes, les cubes ont des événements : Ce sont des messages qu'ils envoient aux autres cubes.

```javascript 
var JeSuisIci = SC.evt("je suis ici");
```

Ici, chaque cube dit aux autres qu'ils sont 

Pour créer un cube dans SC, il faut écrire 
var monCube = SC.cube( objet, progDeObjet);