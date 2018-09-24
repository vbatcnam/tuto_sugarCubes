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

	gereRencontre(obj_all){
		/** 
			obj_all[MeVoici] contient 3 cubes
		*/
		for(let cube of obj_all[MeVoici]){
			if( this.verifSiNewContact(cube) ){
				console.log("miniSweet N° " + this.id + " est en contact avec miniSweet N° " + cube.id);
				console.log("Couple formé")
				//parcourir la liste de ses contacts
				for(let sweet of this.listeContacts){
					//si le cube est dans la liste des contacts
					if(sweet.id == cube.id){
						return;
					}
				}
				this.listeContacts.push(cube);
				cube.listeContacts.push(this);
				if(this.sexe == 'F')
					this.genereNouveauSweet(cube);
				else
					cube.genereNouveauSweet(this);
			}
			else{//il n'y a pas ou plus contact
				//parcourir la liste de ses contacts
				for(let sweet of this.listeContacts){
					if(sweet.id == cube.id){
						this.listeContacts.splice(this.listeContacts.indexOf(cube),1);
						cube.listeContacts.splice(cube.listeContacts.indexOf(this),1);
					}
				}
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
		console.log('miniSweet N° '+ enfant.id + ' est né.');
		console.log('Sa maman est miniSweet N° '+ enfant.mamanSweet.id + ' et son papa est miniSweet N° '+ enfant.papaSweet.id);
		//mise à jour du nombre de miniSweets
		nombreDeSweets +=1;
		console.log('Nous avons maintenant ' + nombreDeSweets + ' miniSweets.');
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

var vert = Couleur.fromRVB_255_int(0, 255, 0);
var bleu = Couleur.fromRVB_255_int(0, 0, 255);

var miniSweet2 = new Sweet(2, 'F', vert, viewPort.w/3, viewPort.h/3);
var miniSweet3 = new Sweet(3, 'M', bleu, viewPort.w*0.75, viewPort.h*0.25);

//Sert pour l'id des miniSweets
var nombreDeSweets = 4;

/** Utilisation de SugarCubes */
/** ========================= */

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
var cubeSweet2 = SC.cube(miniSweet2, progSweet);
var cubeSweet3 = SC.cube(miniSweet3, progSweet);


//le moteur qui exécute les programmes
//-------------------------------------
var monde = SC.machine(100);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute le programme du cube à la machine
monde.addProgram(cubeSweet2);
monde.addProgram(cubeSweet3);





