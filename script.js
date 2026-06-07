// ==========================================
// 1. CONFIGURACIÓN DE LA PALABRA
// ==========================================
const juegoDelDia = {
    palabra: "BALON", 
    descripcion: "Esfera elástica utilizada en multitud de deportes que se infla con aire y se controla con los pies, manos o implementos."
};

const palabraDelDia = juegoDelDia.palabra.toUpperCase();
const TAMANO_PALABRA = palabraDelDia.length; 

const INTENTOS_TOTALES = 5; 
let filaActual = 0;
let letraActual = 0;
let intentoActual = ""; 
let juegoTerminado = false;

// Diseño del teclado en español (3 filas)
const distribucionTeclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BORRAR"]
];

// ==========================================
// 2. INICIALIZACIÓN (DOM)
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pista-texto").textContent = juegoDelDia.descripcion;
    generarTablero();
    generarTeclado();
});

// Dibuja la cuadrícula del juego
function generarTablero() {
    const contenedorTablero = document.getElementById("tablero");
    for (let f = 0; f < INTENTOS_TOTALES; f++) {
        let capaFila = document.createElement("div");
        capaFila.classList.add("fila");
        capaFila.id = `fila-${f}`;
        
        for (let l = 0; l < TAMANO_PALABRA; l++) {
            let capaCuadrado = document.createElement("div");
            capaCuadrado.classList.add("cuadrado");
            capaFila.appendChild(capaCuadrado);
        }
        contenedorTablero.appendChild(capaFila);
    }
}

// NUEVO: Dibuja los botones del teclado táctil
function generarTeclado() {
    const contenedorTeclado = document.getElementById("teclado");

    distribucionTeclado.forEach(filaLetras => {
        let capaFilaTeclado = document.createElement("div");
        capaFilaTeclado.classList.add("teclado-fila");

        filaLetras.forEach(letra => {
            let botonTecla = document.createElement("button");
            botonTecla.textContent = letra;
            botonTecla.classList.add("tecla");

            // Si son los botones especiales, les aplicamos un diseño más ancho
            if (letra === "ENTER" || letra === "BORRAR") {
                botonTecla.classList.add("tecla-ancha");
            }

            // Evento al pulsar la tecla con el dedo/ratón
            botonTecla.addEventListener("click", () => {
                procesarEntradaLetra(letra);
            });

            capaFilaTeclado.appendChild(botonTecla);
        });

        contenedorTeclado.appendChild(capaFilaTeclado);
    });
}

// ==========================================
// 3. CONTROL CENTRAL DE ACCIONES (PC y Móvil)
// ==========================================
function procesarEntradaLetra(tecla) {
    if (juegoTerminado) return;

    // Acción: Comprobar palabra
    if (tecla === "ENTER") {
        if (intentoActual.length === TAMANO_PALABRA) {
            comprobarPalabra();
        } else {
            alert(`¡La palabra debe tener exactamente ${TAMANO_PALABRA} letras!`);
        }
        return;
    }

    // Acción: Borrar
    if (tecla === "BORRAR" || tecla === "BACKSPACE" || tecla === "DELETE") {
        if (letraActual > 0) {
            letraActual--;
            intentoActual = intentoActual.slice(0, -1);
            
            let filaHTML = document.getElementById(`fila-${filaActual}`);
            let cuadrado = filaHTML.children[letraActual];
            cuadrado.textContent = "";
        }
        return;
    }

    // Acción: Insertar letra ordinaria
    if (tecla.length === 1 && /^[A-ZÑÁÉÍÓÚÜ]$/.test(tecla)) {
        if (letraActual < TAMANO_PALABRA) {
            intentoActual += tecla;
            
            let filaHTML = document.getElementById(`fila-${filaActual}`);
            let cuadrado = filaHTML.children[letraActual];
            cuadrado.textContent = tecla;
            
            letraActual++;
        }
    }
}

// Escuchador para el teclado físico del PC (mapea las teclas a la función central)
window.addEventListener("keydown", (evento) => {
    let teclaFisica = evento.key.toUpperCase();
    if (teclaFisica === "BACKSPACE" || teclaFisica === "DELETE") {
        teclaFisica = "BORRAR";
    }
    procesarEntradaLetra(teclaFisica);
});

// ==========================================
// 4. VALIDACIÓN DE LOGICA
// ==========================================
function comprobarPalabra() {
    let filaHTML = document.getElementById(`fila-${filaActual}`);
    const resultado = validarIntento(intentoActual, palabraDelDia);
    
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

function validarIntento(intento, correcta) {
    let arrayIntento = intento.split("");
    let arrayCorrecta = correcta.split("");
    let resultado = new Array(TAMANO_PALABRA).fill("GRIS"); 
    let copiaCorrecta = [...arrayCorrecta];

    for (let i = 0; i < TAMANO_PALABRA; i++) {
        if (arrayIntento[i] === arrayCorrecta[i]) {
            resultado[i] = "VERDE";
            copiaCorrecta[i] = null;
            arrayIntento[i] = null;
        }
    }

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