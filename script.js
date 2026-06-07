// ==========================================
// 1. BANCO DE 30 PALABRAS DE FÚTBOL PARA NIÑOS
// ==========================================
const BANCO_PALABRAS = [
    { palabra: "GOL", descripcion: "¡La mayor alegría del partido! Ocurre cuando el balón cruza la línea de la portería dentro de la red." },
    { palabra: "BOTA", descripcion: "El calzado especial que nos ponemos en los pies, que a veces tiene tacos para no resbalar en el césped." },
    { palabra: "PETO", descripcion: "Prenda de ropa sin mangas de colores llamativos que nos ponemos encima de la camiseta para hacer equipos en el entreno." },
    { palabra: "BALON", descripcion: "El objeto más importante del fútbol; es redondo, rueda, bota y todos queremos darle patadas." },
    { palabra: "COACH", descripcion: "El míster o entrenador que se sienta en el banquillo, nos enseña tácticas y nos ayuda a mejorar." },
    { palabra: "RED", descripcion: "Malla de hilos que está colgada detrás de las porterías para frenar el balón cuando metemos un gol." },
    { palabra: "CONO", descripcion: "Objeto de plástico que el mister coloca en el suelo del entrenamiento para hacer zig-zag o marcar las porterías pequeñas." },
    { palabra: "AGUA", descripcion: "Lo que bebemos de nuestra botella durante los descansos para hidratarnos y recuperar fuerzas." },
    { palabra: "PITA", descripcion: "Lo que hace el árbitro con el silbato cuando un jugador comete una falta o cuando se termina el partido." },
    { palabra: "RIVAL", descripcion: "El equipo compañero contra el que jugamos el partido del fin de semana, al que siempre debemos respetar." },
    { palabra: "PALO", descripcion: "Los postes de madera o metal de la portería que sujetan la red. ¡A veces el balón choca ahí y no entra!" },
    { palabra: "PASE", descripcion: "Acción de golpear el balón suavemente con el interior del pie para dárselo a un compañero de mi equipo." },
    { palabra: "FALTA", descripcion: "Ocurre cuando un jugador empuja o hace tropezar sin querer a un jugador del otro equipo. El árbitro la pita." },
    { palabra: "CAMPO", descripcion: "El rectángulo de césped verde, con líneas blancas pintadas, donde corremos y jugamos al fútbol." },
    { palabra: "GRADA", descripcion: "El lugar del estadio o del polideportivo donde se sientan los papás y mamás a animarnos con fuerza." },
    { palabra: "EQUIPO", descripcion: "Grupo de amigos que juegan juntos vistiendo la misma camiseta para ayudarse y divertirse." },
    { palabra: "CLUB", descripcion: "La escuela de fútbol a la que pertenecemos, que tiene un escudo bonito y unos colores que defendemos." },
    { palabra: "CHUTE", descripcion: "Golpear el balón muy fuerte con el empeine del pie apuntando directamente a la portería contraria." },
    { palabra: "CORNER", descripcion: "Saque que se hace con el pie desde la esquina del campo cuando el rival tira el balón detrás de su portería." },
    { palabra: "MANO", descripcion: "Falta que comete cualquier jugador (menos el portero) si toca el balón con el brazo durante el partido." },
    { palabra: "LIGA", descripcion: "La competición donde jugamos muchos partidos cada fin de semana para sumar puntos y divertirnos." },
    { palabra: "COPA", descripcion: "El trofeo brillante que le dan a los campeones de un torneo al final del día. ¡Mola mucho levantarla!" },
    { palabra: "BOTAS", descripcion: "Tus zapatillas de fútbol con tacos que debes llevar siempre bien atadas para no caerte al correr." },
    { palabra: "ZURDO", descripcion: "Jugador que maneja mejor la pierna izquierda para chutar, pasar y regatear." },
    { palabra: "PETOS", descripcion: "Ropa de entrenamiento que usamos para dividirnos en dos equipos (por ejemplo, los azules contra los amarillos)." },
    { palabra: "LINEA", descripcion: "Las marcas blancas pintadas en el suelo que delimitan el campo. Si el balón sale de ahí, es fuera." },
    { palabra: "SAQUE", descripcion: "Poner el balón en juego otra vez, ya sea con las manos desde la banda o con el pie desde el centro." },
    { palabra: "SILBO", descripcion: "El sonido fuerte que hace el silbato del árbitro para detener el juego cuando hay una falta." },
    { palabra: "MISTER", descripcion: "La forma clásica y cariñosa de llamar a nuestro entrenador en el banquillo." },
    { palabra: "CRACK", descripcion: "Ese jugador o jugadora que se esfuerza al máximo, ayuda a sus compañeros y hace una jugada espectacular." }
];

// ==========================================
// 2. SELECCIÓN AUTOMÁTICA POR CALENDARIO
// ==========================================
const hoy = new Date();
const diaDelMes = hoy.getDate(); 

// Selecciona la palabra según el día del mes actual (del 0 al 29)
const indicePalabra = (diaDelMes - 1) % BANCO_PALABRAS.length;
const juegoDelDia = BANCO_PALABRAS[indicePalabra];

const palabraDelDia = juegoDelDia.palabra.toUpperCase();
const TAMANO_PALABRA = palabraDelDia.length; 

const INTENTOS_TOTALES = 5; 
let filaActual = 0;
let letraActual = 0;
let intentoActual = ""; 
let juegoTerminado = false;

// Configuración del teclado en pantalla
const distribucionTeclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BORRAR"]
];

// ==========================================
// 3. INICIALIZACIÓN (DOM)
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pista-texto").textContent = juegoDelDia.descripcion;
    generarTablero();
    generarTeclado();
});

// Genera la cuadrícula vacía adaptada al tamaño de la palabra
function generarTablero() {
    const contenedorTablero = document.getElementById("tablero");
    contenedorTablero.innerHTML = ""; // Limpia por seguridad

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

// Genera los botones del teclado virtual para el móvil
function generarTeclado() {
    const contenedorTeclado = document.getElementById("teclado");
    contenedorTeclado.innerHTML = ""; // Limpia por seguridad

    distribucionTeclado.forEach(filaLetras => {
        let capaFilaTeclado = document.createElement("div");
        capaFilaTeclado.classList.add("teclado-fila");

        filaLetras.forEach(letra => {
            let botonTecla = document.createElement("button");
            botonTecla.textContent = letra;
            botonTecla.classList.add("tecla");

            if (letra === "ENTER" || letra === "BORRAR") {
                botonTecla.classList.add("tecla-ancha");
            }

            botonTecla.addEventListener("click", () => {
                procesarEntradaLetra(letra);
            });

            capaFilaTeclado.appendChild(botonTecla);
        });

        contenedorTeclado.appendChild(capaFilaTeclado);
    });
}

// ==========================================
// 4. CONTROL CENTRAL DE ACCIONES (PC y Móvil)
// ==========================================
function procesarEntradaLetra(tecla) {
    if (juegoTerminado) return;

    // Acción: Comprobar palabra entera
    if (tecla === "ENTER") {
        if (intentoActual.length === TAMANO_PALABRA) {
            comprobarPalabra();
        } else {
            alert(`¡La palabra de hoy tiene exactamente ${TAMANO_PALABRA} letras!`);
        }
        return;
    }

    // Acción: Borrar letra anterior
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

    // Acción: Añadir letra ordinaria
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

// Capturador del teclado físico para cuando jueguen en PC
window.addEventListener("keydown", (evento) => {
    let teclaFisica = evento.key.toUpperCase();
    if (teclaFisica === "BACKSPACE" || teclaFisica === "DELETE") {
        teclaFisica = "BORRAR";
    }
    procesarEntradaLetra(teclaFisica);
});

// ==========================================
// 5. VALIDACIÓN DE LÓGICA Y COLORES
// ==========================================
function comprobarPalabra() {
    let filaHTML = document.getElementById(`fila-${filaActual}`);
    const resultado = validarIntento(intentoActual, palabraDelDia);
    
    // Pinta cada cuadrado con su color correspondiente
    for (let i = 0; i < TAMANO_PALABRA; i++) {
        let cuadrado = filaHTML.children[i];
        if (resultado[i] === "VERDE") cuadrado.classList.add("verde");
        else if (resultado[i] === "AMARILLO") cuadrado.classList.add("amarillo");
        else cuadrado.classList.add("gris");
    }

    // Comprobar victoria o derrota
    if (intentoActual === palabraDelDia) {
        alert("¡Espectacular! Has acertado la palabra del día. 🎯⚽");
        juegoTerminado = true;
    } else {
        if (filaActual === INTENTOS_TOTALES - 1) {
            alert(`Fin del juego. La palabra correcta era: ${palabraDelDia}`);
            juegoTerminado = true;
        } else {
            filaActual++;    
            letraActual = 0; 
            intentoActual = ""; 
        }
    }
}

// Algoritmo preciso para calcular verdes y amarillos sin repetir letras de más
function validarIntento(intento, correcta) {
    let arrayIntento = intento.split("");
    let arrayCorrecta = correcta.split("");
    let resultado = new Array(TAMANO_PALABRA).fill("GRIS"); 
    let copiaCorrecta = [...arrayCorrecta];

    // Primera pasada: Buscar las letras correctas en el sitio correcto (Verdes)
    for (let i = 0; i < TAMANO_PALABRA; i++) {
        if (arrayIntento[i] === arrayCorrecta[i]) {
            resultado[i] = "VERDE";
            copiaCorrecta[i] = null;
            arrayIntento[i] = null;
        }
    }

    // Segunda pasada: Buscar las letras que existen pero están descolocadas (Amarillos)
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