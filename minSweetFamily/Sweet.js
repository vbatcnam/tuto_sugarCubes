'use strict'
/**
	type d'info  diffusée au monde, par n'importe quel habitant de ce monde.
	devrait s'appeler SC.titreInfoEmise("Me voici") ou SC.signalEmis("Me voici");
	pourquoi cela s’appelle événement ?
*/
var signalDePosition = SC.evt("Me voici");// en vrais se donne lui-même et non juste l'info

/** je crée la classe*/
//je crée l'objet et son cube
class Sweet extends SCCube{
	constructor(ps_id, ps_sexe, pCouleur, pn_x, pn_y){
		super();
		this.id = ps_id;
		this.couleur = pCouleur;
		this.x = pn_x;
		this.y = pn_y;
		this.dx = 2;
		this.dy = -2;
		this.width = 50;
		this.height = 50;
		this.sexe = ps_sexe; // pour la reproduction
		this.contactAvec = null; // pour la reproduction
		/**
			Ceci ne sert plus du coup
			this.me = this // sert pour SugarCubes
		*/
	}
/**
	tout ce qui commence par $_ fait parti du comportement active du cube  
	
*/
	//appelle draw()
	$_draw(){
		return SC.action(SC.my("draw"), SC.forever);
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

	//appelle move()
	$_move(){
		return SC.action(SC.my("move"), SC.forever);
	}
	move(){
		this.gereBordureViewPort();
		this.x += this.dx;
		this.y += this.dy;
	}
	
	//genère à chaque instant la position
	$_donnePosition(){
		return SC.generate(signalDePosition, this, SC.forever);
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

/** 
Je veux améliorer les choses : Un miniSweet ne peux se reproduire avec un de ses parents ou un de ses enfants. On pourrait faire une généalogie.
*/
	//appelle gereRencontre en cas de signal de position
	$_gereRencontre(){
		return SC.actionOn(signalDePosition, this.gereRencontre.bind(this), undefined, SC.forever);
	}
	gereRencontre(obj_all){
		/** 
			obj_all[signalDePosition] contient 3 cubes
		*/
		for(let cube of obj_all[signalDePosition]){
			if( this.verifSiNewContact(cube) ){
				//faire naître un sweet si c'est un sweet femelle
				if( (this.sexe == 'F' && cube.sexe == 'M' 
					|| cube.sexe == 'F' && this.sexe == 'M')
					&& !this.contactAvec && !cube.contactAvec){
					this.contactAvec = cube;
					cube.contactAvec = this;
					// console.log("miniSweet N° " + this.id + " (" + this.sexe + ") est en contact avec miniSweet N° " + cube.id + "(" + cube.sexe + ")" );
					if(this.sexe == 'F')
						this.genereNouveauSweet(cube);
					else
						cube.genereNouveauSweet(this);
				}
			}
		}
	}
	
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
		// console.log("sexe du bébé : "+ sexeEnfant);
		let position = Math.floor(Math.random()*100);
		
		//Création du nouveau miniSweet
		let enfant = new Sweet(idEnfant, sexeEnfant, coulEnfant, this.x+position, this.y+position);
		// var cubeEnfant = SC.cube(enfant, progSweet);
		monde.addActor(enfant);
		// console.log("enfant : "+ enfant.id);
		
		//renseignement des parents du bébé
		enfant.mamanSweet = this; // pour la reproduction
		enfant.papaSweet = cubePapa; // pour la reproduction
		// console.log('maman : '+ enfant.mamanSweet.id);
		// console.log('papa : '+ enfant.papaSweet.id);
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

//couleurs miniSweets originels.
var rouge = Couleur.fromRVB_255_int(255, 0, 0);
var vert = Couleur.fromRVB_255_int(0, 255, 0);
var bleu = Couleur.fromRVB_255_int(0, 0, 255);
var jaune = Couleur.fromRVB_255_int(255, 255, 0);

//création de mes miniSweets 
var miniSweet1 = new Sweet(1, 'F', rouge, 20, 10);
var miniSweet2 = new Sweet(2, 'F', vert, viewPort.w/3, viewPort.h/3);
var miniSweet3 = new Sweet(3, 'M', bleu, viewPort.w*0.75, viewPort.h*0.25);
var miniSweet4 = new Sweet(4, 'M', jaune, viewPort.w*0.25, viewPort.h*0.75);

//Sert pour l'id des miniSweets ( document.getElementById() )
var nombreDeSweets = 4;

//On ajoute le programme du cube à la machine
monde.addActor(miniSweet1);
monde.addActor(miniSweet2);
monde.addActor(miniSweet3);
monde.addActor(miniSweet4);





