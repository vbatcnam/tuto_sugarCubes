/** je crée la classe*/

class Sweet{
	constructor(obj_parent1, obj_parent2, couleurExaSiEncetre, x, y){
		if(obj_parent1)
			this.parent1 = obj_parent1;
		if(obj_parent2)
			this.parent2 = obj_parent2;
		if(couleurExaSiEncetre)
			this.couleur = couleurExaSiEncetre;
		else 
			this.couleur = this.parent1.couleur + this.parent2.couleur; //moyenne des couleurs des parents
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 100;
		this.me = this // sert pour SugarCubes
	}
	
	draw(){
		let color = "#"+this.couleur
		let lienSVG = "http://www.w3.org/2000/svg"
		let zoneDeJeu = document.getElementById("zoneDeJeu");
		let svg = document.createElementNS(lienSVG,"svg");
		let rect = document.createElementNS(lienSVG,"rect");;
		rect.setAttribute( 'x', this.x);
		rect.setAttribute( 'y', this.y);
		rect.setAttribute( 'width', this.width);
		rect.setAttribute( 'height', this.height);
		rect.setAttribute( 'rx', "15");
		rect.setAttribute( 'fill', color);
		svg.appendChild(rect);
		zoneDeJeu.appendChild(svg);
	}// à coder : sert à l'affichage
	move(){}// à coder
}

/** je crée mes objets*/

//les miniSweets originels.
var miniSweetR = new Sweet(null, null, "ff0000", 10, 10);
var miniSweetV = new Sweet(null, null, "008000", 10, 10);
var miniSweetB = new Sweet(null, null, "0000ff", 10, 10);


/** Utilisation de SugarCubes */
/** ========================= */

/** Dans sugarCubes, les cubes ont des événements : Ce sont des messages qu'ils envoient aux autres cubes. */

//L'événement du cube à créer en tout premier 
var MeVoici = SC.evt("Me voici");

//le comportement du cube
var progSweet = SC.par(
	SC.action(SC.my("move"), SC.forever),
	SC.action(SC.my("draw"), SC.forever), 
	SC.generate(MeVoici, SC.my('me'), SC.forever)
);




/** brouillon et tests */
	miniSweetR.draw();




