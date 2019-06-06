# La famille miniSweet

## Préambule
Ce qui va suivre est le deuxième chapitre : Il fait suite au tuto 
	Créer mon premier jeu avec SugarCubes(SC)

## Les miniSweets font des enfants

Nous allons améliorer notre jeu afin de voir ce que l'on peut faire avec les propriétés SC mentionnées dans le premier chapitre : 

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

Mais là, si on laisse le programme ainsi, j'aurais une flopée de petits miniSweets qui seront générés tout le long de la rencontre; Ce n'est pas du tout ce que je veux... De plus, le navigateur plante très rapidement !

Je vais donc réécrire ma fonction *gereRencontre()*.

Je vais aussi faire quelques modifs dans mon objet Sweet :

Chaque Sweet aura dans son état une information *contactAvec*.

Par contre, a chaque rencontre il risque d'y avoir au moins 2 bébés.

Dans le même instant de contact nous avons :

	A rencontre B => 1 bébé
	
	B rencontre A => 1 bébé

Il faut donc des miniSweets *mal* et *femelle*.

Chaque Sweet aura dans son état une information *sexe*.

Voir le code JS dans *Swwet.js*

Voir la démo https://vbatcnam.github.io/tuto_sugarCubes/minSweetFamily/

Je pourrais améliorer les choses : Un miniSweet ne peux se reproduire avec un de ses parents ou un de ses enfants. On pourrait faire une généalogie.

Je ne l'ai pas encore fait... Vous pouvez le faire si vous le souhaitez.

#les autres branches possibles

##Syntaxe simplifiée 
Pour faciliter le code et créer un cube en même temps que son objet, voici une syntaxe simplifiée de SugarCubes pour JS.

##Famille 
Les miniSweets ne peuvent pas se reproduire avec leurs parents, frères et sœurs.
J'ai utilisé la syntaxe simplifiée de SugarCubes pour JS.

##Halloween
Ce ne sont plus des miniSweets mais des miniGoasts qui envahissent votre écran
Une variante de Famille...
