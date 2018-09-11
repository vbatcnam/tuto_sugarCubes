/** je crée la classe*/

class Sweet{
	constructor(couleur, x, y){
		this.couleur = couleur;
		this.x = x;
		this.y = y;
		this.dx = 2;
		this.dy = -2;
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
	}
	
	move(){
		this.x += this.dx;
		this.y += this.dy;
	}
	
	//pour plus tard
	gereRencontre(objetRencontre){
		if( this.x > objetRencontre.x
			&& this.x <= objetRencontre.x + objetRencontre.width 
			&& this.y >= objetRencontre.y 
			&& this.y < objetRencontre.y + objetRencontre.height
		){
			//on change l'axe de déplacement
			this.dy = -this.dy;
			//on change les couleurs des objets
			fromDetection(objetRencontre.couleur);
		}
	}
	
	//pour plus tard
	gereBordureViewPort(){
		if( this.x >= viewPort.w 
			|| this.x <= 0
			|| this.y >= viewPort.h 
			|| this.y <= 0
		){
			this.dy = -this.dy;
		}
	}

	//pour plus tard
	melangeCouleurs(couleurDeObjetRencontre){
		//on transforme les couleurs "#FF0000" en objet Couleur avec pour variables this.ai_r, this.ai_v, this.ai_b} 
		let couleurSweet1 = Couleur.fromRVB_hexa(this.couleur);
		let couleurSweet2 = Couleur.fromRVB_hexa(couleurDeObjetRencontre);
		
		//on calcule la moyenne des r,v,b
		let moyenne = Couleur.getMoyenne(couleurSweet1, couleurSweet2)
		
		//on change les couleurs
		couleurSweet1.ai_r = moyenne.r;
		couleurSweet1.ai_v = moyenne.v;
		couleurSweet1.ai_b = moyenne.b;
		
		couleurSweet2.ai_r = moyenne.r;
		couleurSweet2.ai_v = moyenne.v;
		couleurSweet2.ai_b = moyenne.b;
			
			this.color = couleurSweet1.toRVB_hexa() ; 
			objetRencontre.color = couleurSweet2.toRVB_hexa();
	}
}

/** je crée mes objets*/

//le viewPort
var viewPort = {'w':innerWidth, 'h':innerHeight};

//les miniSweets originels.
var miniSweet1 = new Sweet("ff0000", 10, 10);
var miniSweet2 = new Sweet("008000", 40, 20);
var miniSweet3 = new Sweet("0000ff", 60, 30);


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

//Création des cubes SC
var cubeSweet1 = SC.cube(miniSweet1, progSweet);
var cubeSweet2 = SC.cube(miniSweet2, progSweet);
var cubeSweet3 = SC.cube(miniSweet3, progSweet);

//le moteur qui exécute les programmes
//-------------------------------------
var monde = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute le programme du cube à la machine
monde.addProgram(cubeSweet1);
monde.addProgram(cubeSweet2);
monde.addProgram(cubeSweet3);


/** brouillon et tests 
	Bonjour,
	En exécutant mon programme j'ai un comportement rigolo : les cubes s'affichent de plus en plus tronqués...
	C'est interagissant mais  n'est pas e que je voulais...
*/
	//miniSweetR.draw();




