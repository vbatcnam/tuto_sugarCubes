/** je crée la classe*/

class Sweet{
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
	
	move(){}
}

/** je crée mes objets*/

//les miniSweets originels.
var miniSweetR = new Sweet(null, null, "ff0000", 10, 10);
var miniSweetV = new Sweet(null, null, "008000", 10, 10);
var miniSweetB = new Sweet(null, null, "0000ff", 10, 10);

/** Utilisation de SugarCubes */
/** ========================= */

//================================================================
//							le cube 
//================================================================

//L'événement du sweet à créer en tout premier 
var ImHere = SC.evt("je suis ici");

//le comportement du sweet
var progSweet = SC.par(
	SC.action(move), 
	SC.generate(ImHere)
);




/** Utilisation de SugarCubes
	=========================
	Je crée mon cube SC ainsi
	var monCube = SC.cube( objet, progDeObjet);

	Je crée le premier cube : 
var cubeR = SC.cube( miniSweetR, progDeObjet);
	La pour progObjet
*/	
/**Dans sugarCubes, les cubes ont des événements : Ce sont des messages qu'ils envoient aux autres cubes.

Ici, chaque cube dit aux autres qu'ils sont 

Pour créer un cube dans SC, il faut écrire 
var monCube = SC.cube( objet, progDeObjet);
var monCube = SC.cube( objet, progDeObjet);

//comportements des cubes
var JeSuisIci = SC.evt("je suis ici");
*/

