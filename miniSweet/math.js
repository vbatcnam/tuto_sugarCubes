"use strict";

function mod(a,b){
	var r = a%b;
	return r<0 ? r+b :  r ;
}

function formate(ps_nombre, pn_nbreChiffres){
	if(ps_nombre.length < pn_nbreChiffres){
		return '0'.repeat(pn_nbreChiffres - ps_nombre.length) + ps_nombre;
	}else{
		return ps_nombre;
	}
}