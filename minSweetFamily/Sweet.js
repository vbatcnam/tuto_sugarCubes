/** 
	Dans cette branche, il y a une flopée de miniSweets qui naissent.
	Je ne comprend pas pourquoi... 

*/

/** je crée la classe*/
/** ========================= */
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
		this.partenaire = ""; // pour la reproduction
		this.listeEnfants = []; // pour la reproduction
		this.listeParents = []; // pour la reproduction
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

/** 
	Cette fonction génère une flopée de cubes car dès qu'un cube est crée, comme il n'est pas dans la liste des contacts de ses parents, il génère 2 cubes (1 avec chaque Parent avec les quels il est toujours en contact et ainsi de suite...)
	La solution : Utiliser addContact(cube) dans la génération des cubes
		Cela ne marche toujours pas !!!
*/
	gereRencontre(obj_all){
		/** 
			obj_all[MeVoici] contient 3 cubes
		*/
		for(let cube of obj_all[MeVoici]){
			if(this.id == cube.id){
				//console.log("C'est moi " + this.id + " et " + cube.id);
				return; // pas la peine de traiter avec lui même
			}
			
			//C'est un autre cube que lui même
			if( this.verifSiNewContact(cube) ){
				// console.log("miniSweet N° " + this.id + " est en contact avec miniSweet N° " + cube.id);
				
				//Est-il dans la liste de ses parents ?
				if(this.verifIsInListe(cube, this.listeParents)){
					// console.log("C'est mon parent, il n'y aura pas de bébé")
					return;
				}
				
				//Est-il dans la liste de ses enfants ?
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
	
	genereNouveauSweet(cubePapa){
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
		
		//ajout de l'enfant à la liste des enfants des cubes parents
		this.addCubeInListe(enfant, this.listeEnfants);// this c'est la mère
		cubePapa.addCubeInListe(enfant, cubePapa.listeEnfants);
		
		//Remplissage de la liste des parents du bébé
		enfant.addCubeInListe(this, enfant.listeParents);
		enfant.addCubeInListe(cubePapa, enfant.listeParents);

		// console.log('miniSweet N° '+ enfant.id + ' est né.');
		// console.log('Sa maman est miniSweet N° '+ enfant.mamanSweet.id + ' et son papa est miniSweet N° '+ enfant.papaSweet.id);
		//mise à jour du nombre de miniSweets
		nombreDeSweets +=1;
		// console.log('Nous avons maintenant ' + nombreDeSweets + ' miniSweets.');
	}
}

/** je crée mes objets*/
/** ========================= */
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
var monde = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute le programme du cube à la machine
monde.addProgram(cubeSweet2);
monde.addProgram(cubeSweet3);





