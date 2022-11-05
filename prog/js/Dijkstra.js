// Este objeto almacena todo el contenido de nuestro grafo.
const grafo = {
    e0: {e16:1616,e27:1616,e43:1547},
    e1: {e2:1547,e17:1547,e18:2147,e21:1470,e43:1729},
    e2: {e3:1547},
    e3: {e2:1547,e4:1547,e35:1},
    e4: {e3:1547,e5:1,e31:20,e51:1},
    e5: {e4:1,e19:1616,e24:1616},
    e6: {e7:1009, e22:1909,e23:1616},
    e7: {e6:1909,e8:1909,e34:1,e44:1},
    e8: {e7:1909,e9:1909,e18:940},
    e9: {e8:1909,e10:1909,e29:1909,e30:1909},
    e10: {e9:1909,e11:1909,e26:1616,e38:20},
    e11: {e10:1909,e12:1909,e53:1666},
    e12: {e11:1909,e13:20},
    e13: {e12:20,e48:1670},
    e14: {e15:2147,e16:2147},
    e15: {e14:2147,e17:2147,e38:2140},
    e16: {e0:1616,e14:1470,e15:2147,e17:2147,e20:1470,e21:1470,e22:1616},
    e17: {e1:20,e16:20,e18:20,e21:20,e43:20},
    e18: {e1:2147,e8:1909,e17:20,e19:20},
    e19: {e5:1616,e18:20,e38:20,e50:20},
    e20: {e16:20,e37:20},
    e21: {e1:20,e16:20,e17:20,e42:1729,e44:20},
    e22: {e6:1616,e16:20,e33:1909},
    e23: {e6:1616,e24:1616,e26:1729},
    e24: {e5:1616,e23:1616,e31:1643,e32:1643},
    e25: {e30:1909,e36:1909},
    e26: {e10:1616,e27:1616,e43:20},
    e27: {e0:1616,e26:1616,e28:1643,e29:1643},
    e28: {e27:1643,e56:1643},
    e29: {e9:1909,e27:1643,e38:2037},
    e30: {e9:1643,e25:1909,e35:1909,e51:1643},
    e31: {e4:20,e24:1643,e36:1909,e51:20},
    e32: {e24:1643,e56:20},
    e33: {e22:20,e34:20},
    e34: {e7:20,e33:1909,e35:20,e44:20},
    e35: {e3:20,e30:1909,e34:20},
    e36: {e31:1670,e48:20},
    e37: {e15:2140,e21:20},
    e38: {e19:1616,e29:2037,e39:20},//aqui hay una celda amarilla y no la voy a poner
    e39: {e38:20,e49:20},
    e40: {e54:20},//aqui tambien hay una celda pero azul, no la puse.
    e41: {e40:1729,e42:1729,e53:1729},
    e42: {e21:1729,e43:1729},//otra celda azul, no se puso.
    e43: {e0:1547,e1:20,e17:20,e42:1729,e44:1729},
    e44: {e7:20,e21:1729,e34:20,e43:1729,e45:1729},
    e45: {e44:1729,e46:1729,e52:20},
    e46: {e23:20,e45:1729,e47:1729},
    e47: {},//tiene dos en azul
    e48: {e13:1670,e36:20,e49:1670},
    e49: {e39:20,e48:20,e50:1670},
    e50: {e19:20,e49:1670,e51:1670},
    e51: {e4:20,e30:1643,e31:20,e52:1670},//dos en azul.
    e52: {e45:20,e51:1570},
    e53: {e11:20,e41:20},
    e54: {e40:20,e55:1650},
    e55: {e28:20,e54:1650},
    e56: {e32:20,e47:20},
};

// Este objeto almacena todas las coordenadas de cada vertice.
const coordenadas = {};

// Este arreglo almacena todas las aristas de conexión entre vértices.
const aristas = [];

// Esta función nos genera un mensaje indicando en que paso del algoritmo nos encontramos.
function log(mensaje) {
	const imprime = false;
	
    if (imprime) {
        console.log(mensaje);
    }
}

// Esta función nos retorna el nodo con menor peso al que podemos acceder.
const nodoPesoMenor = (pesos, procesados) => {
    return Object.keys(pesos).reduce((menor, nodo) => {
        if (menor === null || pesos[nodo] < pesos[menor]) {
            if (!procesados.includes(nodo)) {
                menor = nodo;
            }
        }
        return menor;
    }, null);
};

// Esta función nos retorna la ruta más barata hasta el nodo final dado el peso de cada arista.
const dijkstra = (grafo, nodoInicial, nodoFinal) => {
	// Siguiendo el peso menor para llegar a cada nodo.
    let pesos = {};
    pesos[nodoFinal] = "Infinity";
    pesos = Object.assign(pesos, grafo[nodoInicial]);

    // Siguiendo los caminos / rutas al visitar cada nodo.
    const nodosPadre = {
		nodoFinal: null
	};

    for (let nodoHijo in grafo[nodoInicial]) {
        nodosPadre[nodoHijo] = nodoInicial;
    }

    // Almacenando a los nodos que ya han sido procesados.
    const procesados = [];

    let nodo = nodoPesoMenor(pesos, procesados);

    while (nodo) {
        let peso = pesos[nodo];
		let nodosHijo = grafo[nodo];
		
        for (let n in nodosHijo) {
            if (String(n) === String(nodoInicial)) {
                log("¡No podemos regresar al inicio!");
            } else {
                log("Nombre del nodo inicial: " + nodoInicial);
                log("Evaluando el peso hasta el nodo " + n + " (buscando desde el nodo " + nodo + ")");
				log("Último peso: " + pesos[n]);
				
				let nuevoPeso = peso + nodosHijo[n];
				
				log("Nuevo peso: " + nuevoPeso);
				
                if (!pesos[n] || pesos[n] > nuevoPeso) {
                    pesos[n] = nuevoPeso;
					nodosPadre[n] = nodo;
					
                    log("Nodos padre y pesos actualizados.");
                } else {
                    log("Ya existe una mejor ruta.");
                }
            }
		}
		
        procesados.push(nodo);
        nodo = nodoPesoMenor(pesos, procesados);
    }

    let rutaOptima = [nodoFinal];
	let nodoPadre = nodosPadre[nodoFinal];
	
    while (nodoPadre) {
        rutaOptima.push(nodoPadre);
        nodoPadre = nodosPadre[nodoPadre];
	}

	rutaOptima.reverse();

    const resultados = {
        distancia: pesos[nodoFinal],
        ruta: rutaOptima
	};

    return resultados;
};

function prueba(){
    let nodoIni = $('#nodoI').val();
    // console.log(nodoIni);
    let nodoFin = $('#nodoF').val();
    // console.log(nodoFin);
    if(nodoIni!=nodoFin){
        let resultado = dijkstra(grafo, nodoIni, nodoFin);

        document.getElementById('dis').innerHTML='Distancia: '+resultado.distancia;
        document.getElementById('ruta').innerHTML='Ruta: '+resultado.ruta;
        console.log(resultado.ruta);

        
    }
    else{
        window.alert('No puedes seleccionar las mismas estaciones')
    }
}