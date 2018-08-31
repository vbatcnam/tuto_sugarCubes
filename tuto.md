# Créer mon premier cube avec SC

Je vais partager mon expérience d'apprentissage de SugarCubes (SC) à travers ce tuto qui ressemblera plus à un blog ou un journal sous forme d'un dialogue entre son créateur (JF Susini) et son élève (moi).

Pourquoi ce tuto alors que je sais à peine utiliser SC ?
Et bien parce que lorsqu'on crée un tuto d'un langage que l'on maîtrise, on n'est plus débutant et on oublie certaines étapes qui nous nous apparaissent évidente, alors qu'elles ne l'étaient pas lorsqu'on débutait.

Vous allez donc pouvoir  me suivre dans mon apprentissage et ainsi voir au fil des lignes, mon évolution. J’espère ainsi que vous pourrez évoluer plus facilement.

Je souhaite donc créer un petit jeu avec des cubes de guimauve animés : Petit clin d’œil au nom de SugarCube.

Avant cela, j'ai créé un casse brique (que vous pouvez voir sur gitUb)
et le début d'un mini monde (également sur gitUb)

Pour vous expliquer comment fonctionne SC, j'ai préféré faire un truc tout simple pour ne pas se perdre dans un gros programme.

Nous allons donc créer ensemble un cube avec le langage SugarCube.
Mais tout d'abord c'est quoi SugarCubes (SC pour simplifier) ?

# SugarCubes kesako ?
SC est un nouveau langage de programmation ou plutôt un outil pour pouvoir faire du parallélisme dans son programme. 

#  jeu les miniCubes 
Création d'un petit jeu les miniCubes
J'ai décidé de coder ce jeu en javascript mais vous pouvez le faire en java, et peut être python. 
Pour le savoir allez voir le site de son créateur JF Susini :

Titre du jeu : les miniCubes
Scénario du jeu : Des miniCubes se balladent et rencontrent d'autres miniCubes.
En s'accouplant, ces miniCubes font naître des miniCubes :
1 miniCube jaune et un miniCube bleu donnent soit :
	un miniCube vert 
	un miniCube jaune 
	un miniCube bleu 
Il arrive parfoit (hasard de la génétique ?) qu'un miniCube jaune et un miniCube bleu donne un miniCube avec une des couleurs sitées ci dessus mais avec des rayures, des pois, ou des taches.
Ces rayures, pois ou taches sont donc ajouté au patrimoine génétique et sera transmis aux miniCubes suivants.

Jusque là, je suppose qu'il n'y a rien de compliqué : 

Il y a une classe miniCube, des objets issus de cette classe, et des Cubes (objet de type SC).

```javascript 
SC.actionOn(evt, actionDeclancheSiEvtPresent, actionDeclancheSiEvtAbsant, nbreDinstant) 
```

Voir le fichier MiniCube.js



Pour créer un cube dans SC, il faut écrire 
var monCube = SC.cube( objet, progDeObjet);