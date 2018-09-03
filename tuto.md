# Créer mon premier jeu avec SC

## Préambule
Pour vous expliquer comment fonctionne SugarCubes, on va créer un petit jeu avec des carrés animés : les miniSweets.
Lorsque deux miniSweets se rencontrent, ils changent de couleur. 
Par exemple : si un miniSweet bleu rencontre un miniSweet rouge, ils deviennent violet.

Mais tout d'abord c'est quoi SugarCubes (SC pour simplifier)?
Je vous conseil fortement de lire le  README.md  sur https://github.com/LordManta/SugarCubesJS

## SugarCubes kesako ?
Voir http://jeanferdysusini.free.fr/index.php?action=SCJS

En résumé, SugarCubes est une bibliothèque qui permet de gérer des événements en   parallèle dans son programme. 
Par exemple, dans un jeu de simulation, il y a plusieurs événements qui se passent en même temps.
SC permet d’exécuter plus facilement du code (içi javascript) en parallèle.

La méthode d’exécution de SC c'est de rythmer l’exécution par une série d'instants : 
A chaque instant SC exécute un petit bout de code parallèle.
Par exemple pour les sweets, je veux qu'ils avancent tout en signalant leur position aux autres sweets. 
 
	prog1 => Avance
	
	prg2 => signaleToi
	
A chaque instant SC execute :
	
	une étape de Avance,
	
	une étape de signaleToi,
	
	ensuite il reprend une étape de la suite de Avance, 

	puis une étape de la suite de signaleToi 
	
	et ainsi de suite

## Codage du jeu les miniSweets 
Je crée un fichier index.html (voir le fichier pour les détails)
Je n'oublie surtout pas d'écrire
```html 
<script src="http://jeanferdysusini.free.fr/SugarCubes.js"></script>
```
sinon ça ne marche pas !

Ensuite je crée un fichier Sweets.js dans le quel je crée la classe Sweet, des objets issus de cette classe. CF Sweets.js

Ensuite, dans ce même fichier, je crée mes cubes SC. La syntaxe est :
```javascript 
var monCube = SC.cube( objet, progDeObjet);
```

*objet* on sait le renseigner mais *progDeObjet* ...

## progDeObjet CKOI ?
progDeObjet c'est un programme qui se lance tout seul sans qu'on aie besoin de l'appeler. C'est ce qu'on appelle le comportement du cube.
Ici, les minSweets se déplacent aléatoirement sur la surface du view port tout en indiquant aux autres sweets leur position. 

La syntaxe est : 
```javascript 
var prog = instructionSugarCubes;
```

Comme je veux que mes sweets avancent en signalant leur position aux autres sweets, mon instruction sera donc :

	avance
	signale ta postion
	
il y a donc 2 instructions que je veux faire en même temps (en parallèle). 

Je vais donc utiliser la syntaxe SC.par();
```javascript 
var monInstruction = SC.par(JAvance, JeMeSignale);
```

### l'instruction *JAvance*
Pour l'instruction *JAvance* j'utilise la syntaxe *SC.action()*
 
```javascript 
var monAction1 = SC.action(functionJS_JAvance);
```

Je dois donc créer une fonction qui fait avancer mon sweet.
Je l'écris dans la classe Sweet car elle sera commune à tous les sweets. (CF Sweets.js)

### l'instruction *JeMeSignale*
Il faut générer l’événement avec SC.generate() : je vais utiliser la syntaxe 
```javascript 
SC.generate(evt, valeurAssocieAEvt, nbreDinstant)
```
Attention ! Il faut mettre l’événement dans une variable pour que les autres sweets puissent l’écouter :

	Si l'evt est là 
		alors faire cela
Il faut créer l'evt bien avant de le générer. (CF Sweets.js)

### Cela donnerait :
```javascript 
SC.par(
	SC.action(functionJS_JAvance), 
	SC.generate(evtDuCube, valeurAssocieAEvt, nbreDinstant)
);
```

On peut donc encoder le comportement de notre sweet :
```javascript 
var comportementDeMonCube = SC.par(
	SC.action(functionJS_JAvance), //défini dans la classe Sweet
	SC.generate(evtDuCube)
);
```
*comportementDeMonCube* va s’exécuter une seule fois, puis va s’arrêter.

Or je veux que mon sweet se déplace et "parle" tout le temps. je dois donc renseigner *nbreDinstant* avec *forever*
il me manque le paramètre *valeurAssocieAEvt*


### valeurAssocieAEvt
lorsque le sweet envoie son signal je suis içi, les 




