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

//comportements des cubes

//miniCubes originels.
var miniCubeR = new MiniCube(null, null, "ff0000", 10, 10);
var miniCubeV = new MiniCube(null, null, "008000", 10, 10);
var miniCubeB = new MiniCube(null, null, "0000ff", 10, 10);

