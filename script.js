// ==========================================
// 1. CONFIGURACIÓN CAMBIANTE DE LA PALABRA
// ==========================================

// PRUEBA CAMBIANDO ESTO: Puedes poner "GOL" (3), "BALON" (5), "TÁCTICA" (7)... 
// ¡El juego se adaptará solo al guardar!
const juegoDelDia = {
    palabra: "BALON", 
    descripcion: "Esfera elástica utilizada en multitud de deportes que se infla con aire y se controla con los pies, manos o implementos."
    /*palabra: "GOL",
    descripcion: "La máxima alegría del fútbol. Ocurre cuando el balón cruza por completo la línea de meta entre los postes y por debajo del travesaño."*/
};

// ==========================================
// 2. VARIABLES GLOBALES AUTOMÁTICAS
// ==========================================
const palabraDelDia = juegoDelDia.palabra.toUpperCase();

// Variable clave: mide automáticamente cuántas letras tiene la palabra actual
const TAMANO_PALABRA = palabraDelDia.length; 

const INTENTOS_TOTALES = 5; // Puedes cambiar a 6 o 4 si quieres más/menos filas
let filaActual = 0;
let letraActual = 0;
let intentoActual = ""; 
let juegoTerminado = false;

// ==========================================
// 3. GENERACIÓN DINÁMICA DEL TABLERO HTML
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    // Ponemos el texto de la pista
    document.getElementById("pista-texto").textContent = juegoDelDia.descripcion;
    
    // Ejecutamos la creación de los cuadraditos dinámicos
    generarTablero();
});

function generarTablero() {
    const contenedorTablero = document.getElementById("tablero");
    
    // Bucle para crear las filas (Intentos)
    for (let f = 0; f < INTENTOS_TOTALES; f++) {
        let capaFila = document.createElement("div");
        capaFila.classList.add("fila");
        capaFila.id = `fila-${f}`;
        
        // Bucle interno para crear los cuadrados exactos de esta palabra
        for (let l = 0; l < TAMANO_PALABRA; l++) {
            let capaCuadrado = document.createElement("div");
            capaCuadrado.classList.add("cuadrado");
            capaFila.appendChild(capaCuadrado); // Metemos el cuadrado en la fila
        }
        
        contenedorTablero.appendChild(capaFila); // Metemos la fila completa en el tablero
    }
}

// ==========================================
// 4. CONTROL DEL TECLADO
// ==========================================
window.addEventListener("keydown", (evento) => {
    if (juegoTerminado) return;

    const tecla = evento.key.toUpperCase();

    // Confirmar intento
    if (tecla === "ENTER") {
        if (intentoActual.length === TAMANO_PALABRA) {
            comprobarPalabra();
        } else {
            alert(`¡La palabra de hoy debe tener exactamente ${TAMANO_PALABRA} letras!`);
        }
        return;
    }

    // Borrar
    if (tecla === "BACKSPACE" || tecla === "DELETE") {
        if (letraActual > 0) {
            letraActual--;
            intentoActual = intentoActual.slice(0, -1);
            
            let filaHTML = document.getElementById(`fila-${filaActual}`);
            let cuadrado = filaHTML.children[letraActual];
            cuadrado.textContent = "";
        }
        return;
    }

    // Escribir letra
    if (tecla.length === 1 && /^[A-ZÑÁÉÍÓÚÜ]$/.test(tecla)) {
        if (letraActual < TAMANO_PALABRA) {
            intentoActual += tecla;
            
            let filaHTML = document.getElementById(`fila-${filaActual}`);
            let cuadrado = filaHTML.children[letraActual];
            cuadrado.textContent = tecla;
            
            letraActual++;
        }
    }
});

// ==========================================
// 5. PROCESAR EL INTENTO
// ==========================================
function comprobarPalabra() {
    let filaHTML = document.getElementById(`fila-${filaActual}`);
    const resultado = validarIntento(intentoActual, palabraDelDia);
    
    // Coloreamos dinámicamente hasta el tamaño de la palabra actual
    for (let i = 0; i < TAMANO_PALABRA; i++) {
        let cuadrado = filaHTML.children[i];
        if (resultado[i] === "VERDE") cuadrado.classList.add("verde");
        else if (resultado[i] === "AMARILLO") cuadrado.classList.add("amarillo");
        else cuadrado.classList.add("gris");
    }

    if (intentoActual === palabraDelDia) {
        alert("¡Espectacular! Has acertado la palabra del día. 🎯");
        juegoTerminado = true;
    } else {
        // Controlamos el límite usando la variable dinámica de filas
        if (filaActual === INTENTOS_TOTALES - 1) {
            alert(`Fin del juego. La palabra era: ${palabraDelDia}`);
            juegoTerminado = true;
        } else {
            filaActual++;    
            letraActual = 0; 
            intentoActual = ""; 
        }
    }
}

// ==========================================
// 6. ALGORITMO DE COMPARACIÓN REFACTORIZADO
// ==========================================
function validarIntento(intento, correcta) {
    let arrayIntento = intento.split("");
    let arrayCorrecta = correcta.split("");
    
    // Inicializamos el array según el tamaño de la palabra actual
    let resultado = new Array(TAMANO_PALABRA).fill("GRIS"); 
    let copiaCorrecta = [...arrayCorrecta];

    // Primera pasada (Verdes)
    for (let i = 0; i < TAMANO_PALABRA; i++) {
        if (arrayIntento[i] === arrayCorrecta[i]) {
            resultado[i] = "VERDE";
            copiaCorrecta[i] = null;
            arrayIntento[i] = null;
        }
    }

    // Segunda pasada (Amarillos)
    for (let i = 0; i < TAMANO_PALABRA; i++) {
        if (arrayIntento[i] === null) continue; 
        
        let idx = copiaCorrecta.indexOf(arrayIntento[i]);
        if (idx !== -1) {
            resultado[i] = "AMARILLO";
            copiaCorrecta[idx] = null;
        }
    }
    
    return resultado;
}