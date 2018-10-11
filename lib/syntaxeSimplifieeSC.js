'use strict'
/** 
	syntaxe simplifiée de sugarCubes.js 
*/
SC.titreInfoEmise = SC.evt;
//permet de créer un cube en même temps que l'objet.
class SCCube extends SC.cube().constructor {
	constructor() {
		super(null, null)
		this.o = this
		
		const lArray_methodes = Object.getOwnPropertyNames(this.__proto__)
		
		const lArray_prog = []
		for(let ls_nomMeth of lArray_methodes) {
			if(ls_nomMeth.substring(0,1) == '$') {
				if(ls_nomMeth.substring(0,7) == '$repeat') {
					console.log(ls_nomMeth)
					if(ls_nomMeth.substring(7,14) == 'Forever') {
						lArray_prog.push(SC.repeat( SC.forever, ...this[ls_nomMeth]() ))
					}else{
						const ln_nbFois = parseInt(ls_nomMeth.match(/\d+/g)[0])
						lArray_prog.push(SC.repeat( ln_nbFois, ...this[ls_nomMeth]() ))
					}
				}else if(ls_nomMeth.substring(1,2) == '_') {
					lArray_prog.push( this[ls_nomMeth]() )
				}
			}
		}
		
		this.p = SC.par(...lArray_prog)
	}
}

var monde = SC.machine(30);
monde.addActor = monde.addProgram;