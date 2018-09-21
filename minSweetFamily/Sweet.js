/** je crée la classe*/

class Sweet{
	constructor(ps_id, ps_sexe, pCouleur, pn_x, pn_y){
		this.id = ps_id;
		this.couleur = pCouleur;
		this.x = pn_x;
		this.y = pn_y;
		this.dx = 2;
		this.dy = -2;
		this.width = 100;
		this.height = 100;
		this.sexe = ps_sexe; // pour la reproduction
		this.contactAvec = null; // pour la reproduction
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
	
	gereBordureViewPort(){
		if(this.x + this.width >= viewPort.w || this.x <= 0){
			this.dx = -this.dx;
		}if(this.y + this.height >= viewPort.h || this.y <= 0){
			this.dy = -this.dy;
		}
	}

	melangeCouleurs(objetRencontre){
		let couleurSweet1 = this.couleur;
		let couleurSweet2 = objetRencontre.couleur;
		
		//on retourne la moyenne des r,v,b
		return Couleur.getMoyenne(couleurSweet1, couleurSweet2)
	}

/** Reproduction => premier test :
	Cette fonction ne marche pas avec SC !
		car SC fonctionne en étapes et entre 2 étapes la rencontre peut avoir lieu. Du coup, SC ne l'a pas vu.

	verifSiTouched(autreSweet)
	{
		//cas 1 : contact par les angles
		if(
			(this.x == autreSweet.x + autreSweet.width
				|| this.x + this.width == autreSweet.x)
			&& (this.y == autreSweet.y + autreSweet.height
				|| this.y + this.height == autreSweet.y)
			&& this != autreSweet
		){
			console.log("Contact par les angles ! ");
		}
		
		//cas 2 : contact par le coté gauche
		if(this.x == autreSweet.x + autreSweet.width
			&& ( 
				(autreSweet.y >= this.y && autreSweet.y <= this.y + this.height)
				||(autreSweet.y + autreSweet.height <= this.y + this.height
					&& autreSweet.y + autreSweet.height >= this.y)
			)
			&& this != autreSweet

		){
			console.log("Contact par le coté gauche ! ");
		}
	}
*/
	
/** Reproduction => Second test :
	Quand un contact est détecté, on vérifie que contactAvec est vide.
	si contact est non vide on ignore (on pourrait rafiner en verifiant avec qui on contact mais bon ...)
	si c'est vide on positionne une identification du cube avec qui on entre en contact dans «contact avec»...
quand plus de contact avec ce cube ... on crée le bébé
Mais le pb est de savoir lequel des parents crée le bébé car sinon tu créeras au moins 2 bébés

Je veux améliorer les choses : Un miniSweet ne peux se reproduire avec un de ses parents ou un de ses enfants. On pourrait faire une généalogie.
	*/
	gereRencontre(obj_all){
		/** 
			obj_all[MeVoici] contient 3 cubes
		*/
		for(let cube of obj_all[MeVoici]){
			if( this.verifSiNewContact(cube) ){
				console.log("miniSweet : " + cube.id);
				console.log("miniSweet : " + this.id);
				//console.log("en contact avec : " + cube.contactAvec);
				
				//faire naître un sweet si c'est un sweet femelle
				if(this.sexe == 'F' && cube.sexe == 'M' 
					&& !this.contactAvec && !cube.contactAvec){
					this.contactAvec = cube;
					cube.contactAvec = this;
					this.genereNouveauSweet(cube);
				}
			}
			else{
				console.log("aucun contact")
				this.contactAvec = null;
			}
		}
	}

	//verifie si en contat avec un autre que lui même
	verifSiNewContact(autreSweet) 
	{
		if( this.x >= autreSweet.x
			&& this.x <= autreSweet.x + autreSweet.width 
			&& this.y >= autreSweet.y 
			&& this.y <= autreSweet.y + autreSweet.height
			&& this != autreSweet
		){
			return true; 
		}
	}
	
	genereNouveauSweet(cubePapa)
	{
		//on mélange les couleurs des parents
		let coulEnfant = this.melangeCouleurs(cubePapa);
		//Création des paramètres du nouveau miniSweet
		let idEnfant = nombreDeSweets + 1 //pour aller le chercher dans le dom
		let sexeEnfant = Math.floor(Math.random()*2);
		if(sexeEnfant == 0){sexeEnfant = 'F'}else{sexeEnfant = 'M'}
		//console.log("sexe du bébé : "+ sexeEnfant);
		let position = Math.floor(Math.random()*100);
		
		//Création du nouveau miniSweet
		let enfant = new Sweet(idEnfant, sexeEnfant, coulEnfant, this.x+position, this.y+position);
		var cubeEnfant = SC.cube(enfant, progSweet);
		monde.addProgram(cubeEnfant);
		//console.log("enfant : "+ enfant.id);
		
		//renseignement des parents du bébé
		enfant.mamanSweet = this; // pour la reproduction
		enfant.papaSweet = cubePapa; // pour la reproduction
		console.log('maman : '+ enfant.mamanSweet.id);
		console.log('papa : '+ enfant.papaSweet.id);
		//mise à jour du nombre de miniSweets
		nombreDeSweets +=1;
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

var miniSweet1 = new Sweet(1, 'F', rouge, 20, 10);
var miniSweet2 = new Sweet(2, 'F', vert, viewPort.w/3, viewPort.h/3);
var miniSweet3 = new Sweet(3, 'M', bleu, viewPort.w*0.75, viewPort.h*0.25);
var miniSweet4 = new Sweet(4, 'M', jaune, viewPort.w*0.25, viewPort.h*0.75);

//Sert pour l'id des miniSweets
var nombreDeSweets = 4;

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
var monde = SC.machine(100);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute le programme du cube à la machine
monde.addProgram(cubeSweet1);
monde.addProgram(cubeSweet2);
monde.addProgram(cubeSweet3);
monde.addProgram(cubeSweet4);


/** brouillon et tests 
	
	miniSweetR.draw();
*/




