/** je crée la classe*/

class Sweet{
	constructor(ps_id, pCouleur, pn_x, pn_y){
		this.id = ps_id;
		this.couleur = pCouleur;
		this.x = pn_x;
		this.y = pn_y;
		this.dx = 2;
		this.dy = -2;
		this.width = 100;
		this.height = 100;
		this.me = this // sert pour SugarCubes
	}
	
	draw(){
		let color;
		let rect;
		if(! document.getElementById(this.id))
		{
			let lienSVG = "http://www.w3.org/2000/svg";
			let zoneDeJeu = document.getElementById("zoneDeJeu");
			rect = document.createElementNS(lienSVG,"rect");
			rect.id = this.id;
			rect.setAttribute( 'width', this.width);
			rect.setAttribute( 'height', this.height);
			rect.setAttribute( 'rx', "15");
			zoneDeJeu.appendChild(rect);
		}else{
			rect = document.getElementById(this.id);
		}
		rect.setAttribute( 'x', this.x);
		rect.setAttribute( 'y', this.y);
		rect.setAttribute( 'fill', this.couleur.toRVB_CSS() );
	}

	move(){
		this.gereBordureViewPort();
		this.x += this.dx;
		this.y += this.dy;
	}
	
	gereRencontre(obj_all){
		/** 
			obj_all[MeVoici] contient 3 cubes
		*/
		for(let cube of obj_all[MeVoici]){
			if( this.x >= cube.x
				&& this.x <= cube.x + cube.width 
				&& this.y >= cube.y 
				&& this.y <= cube.y + cube.height
			){
				//console.log("coucou");
				/**  fait coucou tout le long de la rencontre or je ne le veut qu'une seule fois !
					tester quand il entre en contact et quand il quitte le contact
				*/
				//on change les couleurs des objets
				this.melangeCouleurs(cube);
			}
		}
	}

	//pour plus tard
	gereBordureViewPort(){
		if(this.x + this.width >= viewPort.w || this.x <= 0){
			this.dx = -this.dx;
		}if(this.y + this.height >= viewPort.h || this.y <= 0){
			this.dy = -this.dy;
		}
	}

	//pour plus tard
	melangeCouleurs(objetRencontre){
		let couleurSweet1 = this.couleur;
		let couleurSweet2 = objetRencontre.couleur;
		
		//on calcule la moyenne des r,v,b
		let moyenne = Couleur.getMoyenne(couleurSweet1, couleurSweet2)
		
		//on change les couleurs
		this.couleur = moyenne;
		objetRencontre.couleur = moyenne;
	}
}

/** je crée mes objets*/

//le viewPort
var viewPort = {'w':innerWidth, 'h':innerHeight};
//je met le svg à la taille du viewPort
let svg = document.getElementById("zoneDeJeu");
svg.setAttribute('width', viewPort.w);
svg.setAttribute('height', viewPort.h);

//les miniSweets originels.
var rouge = Couleur.fromRVB_255_int(255, 0, 0);
var vert = Couleur.fromRVB_255_int(0, 255, 0);
var bleu = Couleur.fromRVB_255_int(0, 0, 255);
var jaune = Couleur.fromRVB_255_int(255, 255, 0);

var miniSweet1 = new Sweet("sweet1", rouge, 10, 10);
var miniSweet2 = new Sweet("sweet2", vert, viewPort.w/3, viewPort.h/3);
var miniSweet3 = new Sweet("sweet3", bleu, viewPort.w*0.75, viewPort.h*0.25);
var miniSweet4 = new Sweet("sweet4", jaune, viewPort.w*0.75, viewPort.h*0.75);


/** Utilisation de SugarCubes */
/** ========================= */

/** Dans sugarCubes, les cubes ont des événements : Ce sont des messages qu'ils envoient aux autres cubes. */

//L'événement du cube à créer en tout premier 
var MeVoici = SC.evt("Me voici");

//le comportement du cube
var progSweet = SC.par(
	SC.action(SC.my("move"), SC.forever),
	SC.action(SC.my("draw"), SC.forever), 
	SC.generate(MeVoici, SC.my('me'), SC.forever),
	SC.actionOn(MeVoici, SC.my("gereRencontre"), undefined, SC.forever)
);

//Création des cubes SC
var cubeSweet1 = SC.cube(miniSweet1, progSweet);
var cubeSweet2 = SC.cube(miniSweet2, progSweet);
var cubeSweet3 = SC.cube(miniSweet3, progSweet);
var cubeSweet4 = SC.cube(miniSweet4, progSweet);

//le moteur qui exécute les programmes
//-------------------------------------
var monde = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute le programme du cube à la machine
monde.addProgram(cubeSweet1);
monde.addProgram(cubeSweet2);
monde.addProgram(cubeSweet3);
monde.addProgram(cubeSweet4);


/** brouillon et tests 
	Bonjour,
	En exécutant mon programme j'ai un comportement rigolo : les cubes s'affichent de plus en plus tronqués...
	C'est interagissant mais  n'est pas e que je voulais...
*/
	//miniSweetR.draw();




