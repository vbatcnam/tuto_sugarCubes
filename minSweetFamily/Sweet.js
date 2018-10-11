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
		this.partenaire = ""; // pour la reproduction
		this.listeEnfants = []; // pour la reproduction
		this.listeParents = []; // pour la reproduction
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
	
/** path
	draw(){
		let color;
		let path;
		if(! document.getElementById(this.id))
		{
			let lienSVG = "http://www.w3.org/2000/svg";
			let zoneDeJeu = document.getElementById("zoneDeJeu");
			path = document.createElementNS(lienSVG,"path");
			path.id = this.id;
			path.setAttribute( 'width', this.width);
			path.setAttribute( 'height', this.height);
			path.setAttribute( 'rx', "15");
			zoneDeJeu.appendChild(path);
		}else{
			path = document.getElementById(this.id);
		}
		
		path.setAttribute( 'd', "m -1059.5561,-161.57646 c 3.8276,-25.98141 31.8223,-9.64389 22.1058,3.65243 0,0 17.2892,2.95548 12.9081,6.33383 -27.189,20.96594 -6.4006,19.65669 0,25.02747 4.238,3.55616 -4.4539,9.98627 -9.9862,9.98627 h -25.0277 c -5.5324,0 -10.8025,-4.51442 -9.9863,-9.98627 1.2444,-8.34249 15.8693,-15.711 -0.7305,-24.05349 -4.9432,-2.4843 9.0056,-5.69913 10.7168,-10.96024 z");
		path.setAttribute( 'fill', this.couleur.toRVB_CSS() );
	}
*/
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
	Cette fonction génère une flopée de cubes car dès qu'un cube est crée, comme il n'est pas dans la liste des contacts de ses parents, il génère 2 cubes (1 avec chaque Parent avec les quels il est toujours en contact et ainsi de suite...)
	La solution : Utiliser addContact(cube) dans la génération des cubes
		Cela ne marche toujours pas !!!
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
			if(this.id == cube.id){
				//console.log("C'est moi " + this.id + " et " + cube.id);
				return; // pas la peine de traiter avec lui même
			}
			
			//C'est un autre cube que lui même
			if( this.verifSiNewContact(cube) ){
				// console.log("miniSweet N° " + this.id + " est en contact avec miniSweet N° " + cube.id);
				
				//Est-il parents avec ce sweet ?
				if(this.verifIsInListe(cube, this.listeParents)){
					// console.log("C'est mon parent, il n'y aura pas de bébé")
					return;
				}
				
				//Est-ce un de ses enfants ?
				if(this.verifIsInListe(cube, this.listeEnfants)){
					//console.log("c'est mon enfant, il n'y aura pas de bébé")
					return;
				}

				//on met le cube comme partenaire 
				this.partenaire = cube;
				//console.log("Couple formé, un bébé va naître.")
				if(this.sexe == 'F')
					this.genereNouveauSweet(cube);
				else
					cube.genereNouveauSweet(this);
			}else{/**il n'y a pas ou plus contact*/
					this.partenaire = "";
					return;
			}
		}
	}

	addCubeInListe(cube, liste){
		liste.push(cube);
	}

	verifIsInListe (cube, liste){
		for(let sweet of liste){
			//si le cube est dans la liste
			if(sweet.id == cube.id){
				// console.log("c'est mon enfant, il n'y aura pas de bébé")
				return true;
			}
		}
		return false;
	}
	
	//verifie si en contact avec un autre que lui même
	verifSiNewContact(autreSweet) {
		if( this.x >= autreSweet.x
			&& this.x <= autreSweet.x + autreSweet.width 
			&& this.y >= autreSweet.y 
			&& this.y <= autreSweet.y + autreSweet.height
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
		
		//ajout de l'enfant à la liste des enfants des cubes parents
		this.addCubeInListe(enfant, this.listeEnfants);// this c'est la mère
		cubePapa.addCubeInListe(enfant, cubePapa.listeEnfants);
		
		//Remplissage de la liste des parents du bébé
		enfant.addCubeInListe(this, enfant.listeParents);
		enfant.addCubeInListe(cubePapa, enfant.listeParents);

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
