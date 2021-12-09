const CONSTANTS = require('../../CONSTANTS.js');

function coordinatesToAttack(req) {
	
	var coordinates = {};
	var enemies = {};
	var objectScan = req.body.scan;
	var objectProtocols = req.body.protocols;


	
	if (isAM(objectProtocols)) {
		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;

			if (enemies.type != "mech") {
				console.log(coordinates);
				return coordinates;
			}
		}
	} else if (isPM(objectProtocols)) {
		console.log('El protocolo de ataque no es avoid-mech sino prioritize-mech, por tanto, se atacará un mech si se encuentra.');
		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;

			if (enemies.type == "mech") {
				console.log(coordinates);
				return coordinates;
			}
		}
	} else if (isCE(objectProtocols)) {
		console.log('El protocolo de ataque es closest-enemies, por tanto, se atacará a los enemigos cercanos.');
		var arrayOfDistances = [];
		var i = 0;
		var j = 0;
		
		for (const row in objectScan) {
			coordinates = objectScan[row].coordinates;
			arrayOfDistances[i] = calcualteDistance(coordinates.x,coordinates.y);	
			i++;
		}

		var closest = getClosest(arrayOfDistances);

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if (enemies.number > 0) {
				if(arrayOfDistances[j] == closest) {
					console.log(coordinates);
					return coordinates;	
				}
				j++;
			} else {
				console.log('No hay enemigos a la vista');
			}
		}
		
	} else if (isFE(objectProtocols)) {
		console.log('El protocolo de ataque es furthest-enemies, por tanto, se atacará a los enemigos lejanos.');
		var arrayOfDistances = [];
		var i = 0;
		var j = 0;
		
		for (const row in objectScan) {
			coordinates = objectScan[row].coordinates;
			arrayOfDistances[i] = calcualteDistance(coordinates.x,coordinates.y);	
			i++;
		}
		
		var furthest = getFurthest(arrayOfDistances);

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if (enemies.number > 0) {
				if(arrayOfDistances[j] == furthest) {
					console.log(coordinates);
					return coordinates;	
				}
				j++;
			} else {
				console.log('No hay enemigos a la vista');
			}
		}

	} else if (isAA(objectProtocols)) {
		console.log('El protocolo de ataque es assist-allies, por tanto, se prioriza los puntos que tengan algun aliado.');

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			allies = objectScan[row].allies;
			if (allies) {
				console.log(coordinates);
				return coordinates;	
			} else {
				console.log('No hay aliados a la vista');
			}
		}

	} else if (isAC(objectProtocols)) {
		console.log('El protocolo de ataque es avoid-crossfire, por tanto, no se ataca a los puntos con aliados.');

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			allies = objectScan[row].allies;
			if (allies == null) {
				console.log(coordinates);
				return coordinates;	
			} else {
				console.log('No hay aliados a la vista');
			}
		}

	} else if (isCEandAM(objectProtocols)) {
		console.log('El protocolo de ataque es closest-enemies" y "avoid-mech, por tanto, no atacar a mech y a atacar a los mas cercanos.');
		var arrayOfDistances = [];
		var i = 0;
		var j = 0;
		
		for (const row in objectScan) {
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if(enemies.type != "mech") {
				arrayOfDistances[i] = calcualteDistance(coordinates.x,coordinates.y);	
			}
			i++;
		}

		var closest = getClosest(arrayOfDistances);

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if (enemies.number > 0) {
				if(arrayOfDistances[j] == closest) {				
						console.log(coordinates);
						return coordinates;
					}
				j++;
			} else {
				console.log('No hay enemigos a la vista');
			}

		}

	} else if (isFEandAM(objectProtocols)) {
		console.log('El protocolo de ataque es furthest-enemies" y "avoid-mech, por tanto, no atacar a mech y a atacar a los mas lejanos.');
		var arrayOfDistances = [];
		var i = 0;
		var j = 0;
		
		for (const row in objectScan) {
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if(enemies.type != "mech") {
				arrayOfDistances[i] = calcualteDistance(coordinates.x,coordinates.y);	
			}
			i++;
		}

		var furthest = getFurthest(arrayOfDistances);

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if (enemies.number > 0) {
				if(arrayOfDistances[j] == furthest) {				
						console.log(coordinates);
						return coordinates;
					}
				j++;
			} else {
				console.log('No hay enemigos a la vista');
			}

		}

	} else if (isCEandPM(objectProtocols)) {
		console.log('El protocolo de ataque es closest-enemies" y "prioritize-mech, por tanto, atacar a mech y a atacar a los mas cercanos.');
		var arrayOfDistances = [];
		var i = 0;
		var j = 0;
		
		for (const row in objectScan) {
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if(enemies.type == "mech") {
				arrayOfDistances[i] = calcualteDistance(coordinates.x,coordinates.y);	
			}
			i++;
		}

		var closest = getClosest(arrayOfDistances);

		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if (enemies.number > 0) {
				if(arrayOfDistances[j] == closest) {				
						console.log(coordinates);
						return coordinates;
					}
				j++;
			} else {
				console.log('No hay enemigos a la vista');
			}

		}

	} else if (isCEandPMandAC(objectProtocols)) {
		console.log('El protocolo de ataque es closest-enemies y prioritize-mech y avoid-crossfire, por tanto, atacar a mech, a atacar a los mas cercanos y donde no haya aliados.');
		var arrayOfDistances = [];
		var i = 0;
		var j = 0;
		
		for (const row in objectScan) {
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			allies = objectScan[row].allies;
			if (enemies.type == "mech") {
				if (allies == null) {
					arrayOfDistances[i] = calcualteDistance(coordinates.x,coordinates.y);	
				
				}
			}
			i++;
		}

		var closest = getClosest(arrayOfDistances);
		
		for (const row in objectScan) 
		{
			coordinates = objectScan[row].coordinates;
			enemies = objectScan[row].enemies;
			if (enemies.number > 0) {
				if(arrayOfDistances[j] == closest) {				
						console.log(coordinates);
						return coordinates;
					}
				j++;
			} else {
				console.log('No hay enemigos a la vista');
			}
		}
	}
}

function calcualteDistance(x,y) {

	var distance = 0;

	distance = Math.sqrt((x*x)+(y*y));

	return distance;
}

function getClosest(list) {
	var min = list[0];
	if(list[0] == null) {
		min = 100;
	}
	for (var i = 0; i < list.length ; i++) {
	    if (list[i] < min) 
	        min = list[i]; 
	}
	return min;
}

function getFurthest(list) {
    var mayor = list[0];
    if(list[0] == null) {
		mayor = 0;
	}
    for(i=1;i<list.length;i++){
        if((list[i] > mayor) && (list[i] < 100)) {
            mayor=list[i];
        }

    }
  	return mayor;
}

function isAM(req) {
	return req.includes("avoid-mech") && (req.length == 1);
}

function isPM(req){
	return (!req.includes("avoid-mech")) && (req.includes("prioritize-mech")) && (req.length == 1);
}

function isCE(req){
	return req.includes("closest-enemies") && (req.length == 1);
}

function isFE(req){
	return req.includes("furthest-enemies") && (req.length == 1);
}

function isAA(req){
	return req.includes("assist-allies") && (req.length == 1);
}

function isAC(req){
	return req.includes("avoid-crossfire") && (req.length == 1);
}

function isCEandAM(req){
	return (req.includes("closest-enemies")) && (req.includes("avoid-mech")) && (req.length == 2);
}

function isFEandAM(req){
	return (req.includes("furthest-enemies")) && (req.includes("avoid-mech")) && (req.length == 2);
}

function isCEandPM(req){
	return (req.includes("closest-enemies")) && (req.includes("prioritize-mech")) && (!req.includes("avoid-mech")) && (req.length == 2);
}

function isCEandPMandAC(req){
	return (req.includes("closest-enemies")) && (req.includes("prioritize-mech")) && (req.includes("avoid-crossfire")) && (req.length == 3);
}

module.exports = coordinatesToAttack;