# La famille miniSweet

## Préambule
Ce qui va suivre est le deuxième tuto : Il fait suite au tuto 
	Créer mon premier jeu avec SugarCubes(SC)

## Les miniSweets font des enfants

Nous allons améliorer notre jeu : 

Nous allons créer plusieurs familles de miniSweets.
Lorsque 2 miniSweets se rencontrent, ils ne changent pas de couleur mais de leur rencontre, naît un miniSweet.
Ce miniSweet est un mélange de ses parents : Il a donc une couleur différente de celle de ses parents (un mélange des 2)

Je vais donc modifier ma classe Sweet.js

### Gérer la rencontre.
Dans le tuto précédent, le changement de couleur se faisait tout au long de la rencontre. 
J'avais écrit :
```javascript 
if( this.x >= cube.x
	&& this.x <= cube.x + cube.width 
	&& this.y >= cube.y 
	&& this.y <= cube.y + cube.height
){
	//console.log("coucou");
	/**  fait coucou tout le long de la rencontre or je ne le veux qu'une seule fois !
	*/
	//on change les couleurs des objets
	this.melangeCouleurs(cube);
}
```

*fait coucou tout le long de la rencontre* 
Pour le changement de couleur, je m'en fichais un peu car ça n'avait pas de conséquence...

Mais là, si on laisse le programme ainsi, j'aurais une flopée de petits miniSweets qui seront générés tout le long de la rencontre.
Le navigateur plante très rapidement.

Je vais donc réécrire mon code pour que cela ne se reproduise pas.
Je vais commencer par créer un fonction *verifSiTouched()* cf Swwet.js

Je teste... Ça ne marche pas !!! Pourquoi ?
Parce que je lui ai dit : "Dès que tu entre en contact avec un autre miniSweet.

Or cette fonction ne marche pas avec SugarCubes car SC fonctionne en étapes et entre 2 étapes la rencontre peut avoir lieu. Du coup, SC ne l'a pas vu :
Instant 1 de SC ils ne se touchent pas
Instant 2 de SC ils sont déjà entrés en contact.

La solution d'Olivier : 
	*Tu mets un booléen à vrais quand tu détectes qu'ils se touchent. 
	si ils se touchent et qu'il est déjà vrai tu fait rien
	Ensuite tu le remets à faux quand ils ne se touche pas.
	
	le booléen marche à priori sauf si, à cause d'un rebond, il y a contact +  contact + contact en un temps très court.*

A cause de cet histoire de rebond, je décide pour ce 2e tuto de simplifier mon scénario. Je reparlerai de ce problème de rebond dans un autre tuto.

Donc lorsque 2 miniSweets se rencontrent, si ils sont en pèriode de reproduction, de leur union naît un miniSweet.

La période de reproduction dure 1 instant SC. Mes miniSweets peuvent donc se reproduire tous les 100 instants.

Pour implémenter cela, j'utilise *SC.control()*

la syntaxe est : 
```javascript 
SC.control(evt, prog);
``` 

#### Que fait SC.control ?
SC.control() c'est une instruction qui contrôle l'exécution d'un programme

