# Créer mon premier jeu avec SC

## Préambule
Pour vous expliquer comment fonctionne SugarCubes, on va créer un petit jeu avec des carrés animés : les miniSweets.
Lorsque deux miniSweets se rencontrent, ils changent de couleur. 
Par exemple : si un miniSweet bleu rencontre un miniSweet rouge, ils deviennent violet.

Mais tout d'abord c'est quoi SugarCubes (SC pour simplifier)?
Je vous conseil fortement de lire le  README.md  sur https://github.com/LordManta/SugarCubesJS

## SugarCubes kesako ?
Voir http://jeanferdysusini.free.fr/index.php?action=SCJS

En résumé, SugarCubes est une bibliothèque qui permet de gérer des événements en parallèle dans son programme. 
Par exemple, dans un jeu de simulation, il y a plusieurs événements qui se passent en même temps.
SC permet d’exécuter plus facilement du code (içi javascript) en parallèle.

La méthode d’exécution de SC c'est de rythmer l’exécution par une série d'instants : 
A chaque instant SC exécute un petit bout de code parallèle.
Par exemple pour les sweets, je veux qu'ils avancent tout en signalant leur position aux autres sweets. 
 
	prog1 => Avance
	
	prg2 => redessineEtAfficheToi
	
	prg3 => signaleToi
	
A chaque instant SC execute :
	
	une étape de Avance,
	
	une étape de redessineEtAfficheToi,
	
	une étape de signaleToi,
	
	ensuite il reprend une étape de la suite de Avance, 

	puis une étape de la suite de redessineEtAfficheToi 
	
	puis une étape de la suite de signaleToi 
	
	et ainsi de suite.

## Codage du jeu *les miniSweets*
Je crée un fichier index.html (voir le fichier pour les détails)
Je n'oublie surtout pas d'écrire
```html 
<script src="http://jeanferdysusini.free.fr/SugarCubes.js"></script>
```
sinon ça ne marche pas !

Ensuite je crée un fichier Sweets.js dans le quel je crée la classe Sweet, des objets issus de cette classe. CF Sweets.js

Attention ! 
Il faut rajouter une propriété this.me = this qui va servir pour SugarCubes.
Pourquoi ?
Heu là je ne sais pas... (voir JFS pour plus d'infos)


Dans ce même fichier, je crée mes cubes SC. La syntaxe est :
```javascript 
var monCube = SC.cube( objet, progDeObjet);
```

*objet* on sait le renseigner mais *progDeObjet* ...

## progDeObjet CKOI ?
progDeObjet c'est un programme qui se lance tout seul sans qu'on aie besoin de l'appeler. C'est ce qu'on appelle le comportement du cube.
Ici, les minSweets se déplacent aléatoirement sur la surface du viewport tout en indiquant aux autres sweets leur position. 

La syntaxe est : 
```javascript 
var prog = instructionSugarCubes;
```

Comme je veux que mes sweets avancent en signalant leur position aux autres sweets, mon instruction sera donc :

	avance
	redessine et affiche toi à la nouvelle position
	signale ta position
	
il y a donc 3 instructions que je veux faire en même temps (en parallèle). 

Je vais donc utiliser la syntaxe SC.par(instruction1, instruction2, instruction3);

```javascript 
var monInstruction = SC.par(JeMeDessineEtJeMAffiche, JAvance, JeMeSignale);
```

### l'instruction *JeMeDessineEtJeMAffiche*
Pour l'instruction *JeMeDessineEtJeMAffiche* j'utilise la syntaxe

```javascript 
SC.action(fonctionAExecuter, nbreDeFois_parDefaut1Fois )
```
 
Je veux que mes miniSweets s'affichent tout le temps

```javascript 
var monAction1 = SC.action(functionJS_draw, SC.forever);
```

Comme je veux utiliser la fonction *functionJS_draw* qui se trouve dans l'objet du cube et qui s'apelle *draw* j'utilise la syntaxe *SC.my("draw");*

J'ai ainsi :
```javascript 
var monAction1 = SC.action(SC.my("draw"), SC.forever);
```

#### SC.my ça sert à quoi ?
Ca sert à aller chercher une propriété de l'objet du cube. 

### l'instruction *JAvance*
Pour l'instruction *JAvance* j'utilise la syntaxe *SC.action()*

```javascript 
var monAction2 = SC.action(SC.my("move"), SC.forever);
```

### l'instruction *JeMeSignale*
Les instructions ci-dessus servaient à faire des actions : C'est-à-dire à lancer des fonctions.

En revanche,l'instruction *JeMeSignale* ne lance pas de fonction mais génère un événement.

#### Pourquoi ne fait-on pas une fonctionJS "signaleToi" ?
Parce qu'on veut que cet événement soit entendu par tous les autres cubes. C'est en quelque sorte du broadcaste ;) enfin je crois... (voir JFS pour plus d'infos)

Il faut générer donc l’événement avec SC.generate() : je vais utiliser la syntaxe 
```javascript 
SC.generate(evt, valeurAssocieAEvt, nbreDInstant)
```
Attention ! Il faut mettre l’événement dans une variable pour que les autres sweets puissent l’écouter :

	Si l'evt est là 
		alors faire cela
Il faut créer l'evt bien avant de le générer. (CF Sweets.js)
```javascript 
var EvtDuSweet = SC.evt("Me voici");// la phrase entre "" sert pour le debug
```

#### Pourquoi ?
Je ne sais pas encore ;)

Pour en savoir plus sur les evt :
https://github.com/LordManta/SugarCubesJS

### Nous en étions là :
```javascript 
SC.par(
	SC.action(SC.my("move"), SC.forever), //comme c'est parallèle il n'y a pas d'ordre
	SC.action(SC.my("draw"), SC.forever), //comme c'est parallèle il n'y a pas d'ordre
	SC.generate(EvtDuSweet, valeurAssocieAEvt, SC.forever)//comme c'est parallèle il n'y a pas d'ordre
);
```

On peut donc encoder le comportement de notre sweet :
```javascript 
var comportementDeMonCube = SC.par(
	SC.action(SC.my("move"), SC.forever),
	SC.action(SC.my("draw"), SC.forever), 
	SC.generate(MeVoici, valeurAssocieAEvt, SC.forever)
);
```

il me manque le paramètre *valeurAssocieAEvt*


### valeurAssocieAEvt CKOI ?
Tous mes miniSweets vont envoyer le signal à tout les autres miniSweets
"MeVoici"
C'est beau... mais qui me parle ? 
Que me veut-on ?

Chaque miniSweet doit envoyer aux autres le signal + une info qu'il va prendre dans son propre objet du cube.
Pour cela, j'utilise utilise SC.my().
Par facilité (voir JFS pour plus d'infos) j'utilise le fameux this.me qui contient tout l'objet (this.me=this)

Ce *SC.my('me')* je le met comme à la place de *valeurAssocieAEvt*  
```javascript 
SC.generate(MeVoici, SC.my('me'), SC.forever)
```

Nous avons maintenant notre comportement au complet :)
```javascript 
var comportementDeMonCube = SC.par(
	SC.action(SC.my("move"), SC.forever),
	SC.action(SC.my("draw"), SC.forever), 
	SC.generate(MeVoici, SC.my('me'), SC.forever)
);
```

## le cube
Maintenant il faut créer les cubes (cf sweet.js)
Un cube, dans SugarCubes, est un moyen de mettre du lien entre un programme réactif (ici sugarCubes) et un objet JS (voir avec JFS)

la syntaxe pour créer un cube est :
```javascript 
SC.cube( objetJS, comportementDuCube)
```

## La machine de SugarCubes
Dans SugarCubes, les machines (ou moteurs) sont des sortes de mondes indépendants.
Chaque machine a sa propre horloge. (voir JFS pour plus d'infos)

Dans mon programme, je doit donc créer une machine qui sera le monde des miniSweets :  Je vais donc appeler ma machine, *monde*.
 
La syntaxe pour créer une machineSC est :

```javascript 
SC.machine(nbreInstantsEnMiliSecondes)
```

Ensuite il faut ajouter le cube (cf sweet.js):
```javascript 
monde.addProgram(cube)
```


### ok ! Et comment lance-t-on la machine ?
En fait elle se lance automatiquement dès qu'on lui ajoute un cube.

Et maintenant je teste mon programme :)
Mes sweets se déplacent et rebondissent sur les bordures du viewPort.
Pour l'instant il n'interagissent pas entre eux.
Or je vousdrais que mes sweets changent de couleur lorsqu'ils rencontrent un autre sweet.

Mais comment un sweet peut savoir qu'il en rencontre un autre ?
Rappelons nous de la condition plus haut dans le chapitre sur les évenements : 

Si l'evt est là 
		alors faire cela

Et bien c'est le moment de le faire :)

si l'evt est là et que celui qui l’émet est en contacte avec toi 
	alors change de couleur

Pour cela, je vais utiliser *actionOn()*. La syntaxe est :
```javascript 
SC.actionOn(evt, actionDeclancheSiEvtPresent, actionDeclancheSiEvtAbsant, nbreDinstant) 
```

Lorsque l'on utilise *actionOn* SugarCube appelle la fonction *actionDeclancheSiEvtPresent* et met en premier paramètre, de cette fonction, les événements reçus. 

Nommons le paramètre de la fonction JS *actionDeclancheSiEvtPresent* *obj_all*

#### Et c'est quoi ce paramètre ?
C'est un objet avec autant de clé qu'il y d’événements.
 
Ici dans mon jeu il n'y a qu'un événement que tous mes sweets émettent c'est *MeVoici*

Donc dans ma fonction de l'objet js je met donc un paramètre (que je décide de nommer *obj_all* 

#### Quelles sont les infos qui ont été émises avec l’événement *MeVoici* ?

Rappelons-nous de :
```javascript 
	SC.generate(EvtDuSweet, valeurAssocieAEvt, SC.forever)
);
```

C'est *valeurAssocieAEvt* qui sera envoyé comme info.

*valeurAssocieAEvt* remplacera le paramètre de ma fonction JS *obj_all* 


Dans le cas de mon jeu *les miniSweets* :
```javascript 
	SC.generate(MeVoici, SC.my('me'), SC.forever)
);
```

C'est *SC.my('me')* qui sera envoyé comme info.

*SC.my('me')* est un objet, d'où mon idée d'appeler le paramètre de ma fonction JS *obj_all* 


#### Mais comment aller chercher les infos qui ont été émises avec l’événement ?

*obj_all[EvtDuSweet]* contiendra un array de toutes les valeurs émises cet événement

Pour les *minisweets* :

*obj_all[MeVoici]* contiendra un array de tous les cubes qui ont émis cet événement.

Je dois donc modifier le comportement de mon cube

```javascript 
var comportementDeMonCube = SC.par(
	SC.action(SC.my("move"), SC.forever),
	SC.action(SC.my("draw"), SC.forever), 
	SC.generate(MeVoici, SC.my('me'), SC.forever),
	SC.actionOn(MeVoici, SC.my("gereRencontre"), undefined, SC.forever)
);
```

Et maintenant nous pouvons exécuter notre petit jeu :)
cf index.html