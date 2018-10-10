'use strict'
/** 
	syntaxe simplifiée de sugarCubes.js 
*/
SC.titreInfoEmise = SC.evt;
//permet de créer un cube en même temps que l'objet.
class SCCube extends SC.cube().constructor {
	constructor() {
		super(null, null)
		this.o = this // objet
	}
	setComportement(pn_nombrePause, ...pArray_prog) {
		this.p = SC.seq(
			SC.pause(pn_nombrePause),
			SC.par(...pArray_prog)
		)
	}
}

var monde = SC.machine(30);
monde.addActor = monde.addProgram;