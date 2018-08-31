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
}

//comportements des cubes
var JeSuisIci = SC.evt("je suis ici");

//miniCubes originels.
var miniSweetR = new Sweet(null, null, "ff0000", 10, 10);
var miniSweetV = new Sweet(null, null, "008000", 10, 10);
var miniSweetB = new Sweet(null, null, "0000ff", 10, 10);

