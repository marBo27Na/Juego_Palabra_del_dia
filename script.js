const BANCO_PALABRAS = [
    { palabra: "GOL", descripcion: "¡La mayor alegría del partido! Ocurre cuando el balón cruza la línea de la portería dentro de la red." },
    { palabra: "BOTA", descripcion: "El calzado especial que nos ponemos en los pies, que a veces tiene tacos para no resbalar en el césped." },
    { palabra: "PETO", descripcion: "Prenda de ropa sin mangas de colores llamativos que nos ponemos encima de la camiseta para hacer equipos en el entreno." },
    { palabra: "BALON", descripcion: "El objeto más importante del fútbol; es redondo, rueda, bota y todos queremos darle patadas." },
    { palabra: "TACOS", descripcion: "Las piezas de goma o metal en la suela de las botas que evitan resbalar en el césped." },
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
    { palabra: "GOLPE", descripcion: "Darle al balón con el pie con fuerza para enviarlo lejos o directamente a portería." },
    { palabra: "CORNER", descripcion: "Saque que se hace con el pie desde la esquina del campo cuando el rival tira el balón detrás de su portería." },
    { palabra: "MANO", descripcion: "Falta que comete cualquier jugador (menos el portero) si toca el balón con el brazo durante el partido." },
    { palabra: "LIGA", descripcion: "La competición donde jugamos muchos partidos cada fin de semana para sumar puntos y divertirnos." },
    { palabra: "COPA", descripcion: "El trofeo brillante que le dan a los campeones de un torneo al final del día. ¡Mola mucho levantarla!" },
    { palabra: "BANDA", descripcion: "Cada uno de los lados del campo por donde suben los extremos para centrar el balón al área." },
    { palabra: "ZURDO", descripcion: "Jugador que maneja mejor la pierna izquierda para chutar, pasar y regatear." },
    { palabra: "MEDIA", descripcion: "Prenda que cubre la pierna desde el pie hasta la rodilla, debajo de las espinilleras." },
    { palabra: "LINEA", descripcion: "Las marcas blancas pintadas en el suelo que delimitan el campo. Si el balón sale de ahí, es fuera." },
    { palabra: "SAQUE", descripcion: "Poner el balón en juego otra vez, ya sea con las manos desde la banda o con el pie desde el centro." },
    { palabra: "SILBO", descripcion: "El sonido fuerte que hace el silbato del árbitro para detener el juego cuando hay una falta." },
    { palabra: "MISTER", descripcion: "La forma clásica y cariñosa de llamar a nuestro entrenador en el banquillo." },
    { palabra: "CRACK", descripcion: "Ese jugador o jugadora que se esfuerza al máximo, ayuda a sus compañeros y hace una jugada espectacular." }
];

const hoy = new Date();
const fechaStr = hoy.toISOString().split('T')[0];
const diaDelMes = hoy.getDate();

const indicePalabra = (diaDelMes - 1) % BANCO_PALABRAS.length;
const juegoDelDia = BANCO_PALABRAS[indicePalabra];

const palabraDelDia = juegoDelDia.palabra.toUpperCase();
const TAMANO_PALABRA = palabraDelDia.length;

function calcularIntentos(longitud) {
    if (longitud <= 3) return 4;
    if (longitud >= 6) return 6;
    return 5;
}
const INTENTOS_TOTALES = calcularIntentos(TAMANO_PALABRA);

let filaActual = 0;
let letraActual = 0;
let intentoActual = "";
let juegoTerminado = false;
let juegoGanado = false;
let animando = false;
let intentosPrevios = [];
let resultadosPrevios = [];
let estadoTeclado = {};

const distribucionTeclado = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BORRAR"]
];

const CLAVE_GUARDADO = "palabra-dia-spb";

function guardarEstado() {
    try {
        localStorage.setItem(CLAVE_GUARDADO, JSON.stringify({
            date: fechaStr,
            wordIndex: indicePalabra,
            filaActual,
            letraActual,
            intentoActual,
            intentosPrevios,
            resultadosPrevios,
            juegoTerminado,
            juegoGanado,
            estadoTeclado
        }));
    } catch (_) {}
}

function cargarEstado() {
    try {
        const raw = localStorage.getItem(CLAVE_GUARDADO);
        if (!raw) return null;
        const estado = JSON.parse(raw);
        if (estado.date !== fechaStr || estado.wordIndex !== indicePalabra) {
            localStorage.removeItem(CLAVE_GUARDADO);
            return null;
        }
        return estado;
    } catch (_) {
        return null;
    }
}

function mostrarNotificacion(mensaje, duracionMs = 2000) {
    const notif = document.getElementById('notificacion');
    if (!notif) return;
    notif.textContent = mensaje;
    notif.classList.add('visible');
    clearTimeout(notif._timeout);
    notif._timeout = setTimeout(() => {
        notif.classList.remove('visible');
    }, duracionMs);
}

function actualizarTeclaVisual(letra, estado) {
    const pesos = { gris: 0, amarillo: 1, verde: 2 };
    const actual = estadoTeclado[letra] || "gris";
    if (pesos[estado] <= pesos[actual]) return;
    estadoTeclado[letra] = estado;
    const botones = document.querySelectorAll('.tecla');
    for (const btn of botones) {
        if (btn.textContent === letra) {
            btn.className = 'tecla';
            if (letra === "ENTER" || letra === "BORRAR") btn.classList.add('tecla-ancha');
            btn.classList.add(`tecla-${estado}`);
        }
    }
}

function aplicarEstadosTeclado(estados) {
    for (const [letra, estado] of Object.entries(estados)) {
        const botones = document.querySelectorAll('.tecla');
        for (const btn of botones) {
            if (btn.textContent === letra) {
                btn.className = 'tecla';
                if (letra === "ENTER" || letra === "BORRAR") btn.classList.add('tecla-ancha');
                btn.classList.add(`tecla-${estado}`);
            }
        }
    }
}

function generarTablero() {
    const contenedorTablero = document.getElementById("tablero");
    contenedorTablero.innerHTML = "";
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

function rellenarTablero() {
    for (let f = 0; f < intentosPrevios.length; f++) {
        const palabra = intentosPrevios[f];
        const resultado = resultadosPrevios[f];
        const filaHTML = document.getElementById(`fila-${f}`);
        for (let l = 0; l < TAMANO_PALABRA; l++) {
            const cuadrado = filaHTML.children[l];
            cuadrado.textContent = palabra[l];
            const clase = resultado[l] === "VERDE" ? "verde" : resultado[l] === "AMARILLO" ? "amarillo" : "gris";
            cuadrado.classList.add(clase);
        }
    }
    if (!juegoTerminado && letraActual > 0) {
        const filaHTML = document.getElementById(`fila-${filaActual}`);
        for (let l = 0; l < letraActual; l++) {
            filaHTML.children[l].textContent = intentoActual[l];
        }
    }
}

function generarTeclado() {
    const contenedorTeclado = document.getElementById("teclado");
    contenedorTeclado.innerHTML = "";

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

function animarRevelacion(resultado) {
    return new Promise(resolve => {
        const filaHTML = document.getElementById(`fila-${filaActual}`);
        let completados = 0;

        for (let i = 0; i < TAMANO_PALABRA; i++) {
            setTimeout(() => {
                const tile = filaHTML.children[i];
                const clase = resultado[i] === "VERDE" ? "verde" : resultado[i] === "AMARILLO" ? "amarillo" : "gris";
                const color = resultado[i] === "VERDE" ? "#538d4e" : resultado[i] === "AMARILLO" ? "#b59f3b" : "#3a3a3c";

                tile.style.setProperty('--color-final', color);
                tile.classList.add('flip');

                tile.addEventListener('animationend', () => {
                    tile.classList.add(clase);
                    tile.classList.remove('flip');
                    completados++;
                    if (completados === TAMANO_PALABRA) resolve();
                }, { once: true });
            }, i * 200);
        }
    });
}

function procesarEntradaLetra(tecla) {
    if (juegoTerminado || animando) return;

    if (tecla === "ENTER") {
        if (intentoActual.length === TAMANO_PALABRA) {
            comprobarPalabra();
        } else {
            const fila = document.getElementById(`fila-${filaActual}`);
            fila.classList.add('shake');
            setTimeout(() => fila.classList.remove('shake'), 300);
            mostrarNotificacion(`La palabra tiene ${TAMANO_PALABRA} letras`);
        }
        return;
    }

    if (tecla === "BORRAR" || tecla === "BACKSPACE" || tecla === "DELETE") {
        if (letraActual > 0) {
            letraActual--;
            intentoActual = intentoActual.slice(0, -1);
            document.getElementById(`fila-${filaActual}`).children[letraActual].textContent = "";
            guardarEstado();
        }
        return;
    }

    if (tecla.length === 1 && /^[A-ZÑÁÉÍÓÚÜ]$/.test(tecla)) {
        if (letraActual < TAMANO_PALABRA) {
            intentoActual += tecla;
            document.getElementById(`fila-${filaActual}`).children[letraActual].textContent = tecla;
            letraActual++;
            guardarEstado();
        }
    }
}

window.addEventListener("keydown", (evento) => {
    if (evento.ctrlKey || evento.metaKey || evento.altKey) return;
    let teclaFisica = evento.key.toUpperCase();
    if (teclaFisica === "BACKSPACE" || teclaFisica === "DELETE") {
        teclaFisica = "BORRAR";
    }
    procesarEntradaLetra(teclaFisica);
});

function comprobarPalabra() {
    const resultado = validarIntento(intentoActual, palabraDelDia);
    animando = true;

    animarRevelacion(resultado).then(() => {
        animando = false;

        intentosPrevios.push(intentoActual);
        resultadosPrevios.push(resultado);

        for (let i = 0; i < TAMANO_PALABRA; i++) {
            const letra = intentoActual[i];
            const estado = resultado[i] === "VERDE" ? "verde" : resultado[i] === "AMARILLO" ? "amarillo" : "gris";
            actualizarTeclaVisual(letra, estado);
        }

        if (intentoActual === palabraDelDia) {
            juegoTerminado = true;
            juegoGanado = true;
            mostrarNotificacion("Espectacular! Has acertado", 3000);
            mostrarBotonCompartir();
            guardarEstado();
        } else if (filaActual >= INTENTOS_TOTALES - 1) {
            juegoTerminado = true;
            mostrarNotificacion(`Fin. La palabra era: ${palabraDelDia}`, 4000);
            mostrarBotonCompartir();
            guardarEstado();
        } else {
            filaActual++;
            letraActual = 0;
            intentoActual = "";
            guardarEstado();
        }
    });
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

function mostrarBotonCompartir() {
    if (document.getElementById('compartir-boton')) return;
    const contenedor = document.getElementById('compartir-contenedor');
    const btn = document.createElement('button');
    btn.id = 'compartir-boton';
    btn.textContent = 'Compartir resultado';
    btn.addEventListener('click', () => {
        const numIntento = juegoGanado ? intentosPrevios.length : "X";
        let texto = `Palabra del Dia #${indicePalabra + 1} ${numIntento}/${INTENTOS_TOTALES}\n\n`;
        for (const res of resultadosPrevios) {
            for (const r of res) {
                texto += r === "VERDE" ? "🟩" : r === "AMARILLO" ? "🟨" : "⬛";
            }
            texto += "\n";
        }
        navigator.clipboard.writeText(texto).then(() => {
            mostrarNotificacion("Resultado copiado!");
        }).catch(() => {
            mostrarNotificacion("No se pudo copiar");
        });
    });
    contenedor.appendChild(btn);
}

window.addEventListener("DOMContentLoaded", () => {
    const estadoGuardado = cargarEstado();

    if (estadoGuardado) {
        filaActual = estadoGuardado.filaActual;
        letraActual = estadoGuardado.letraActual;
        intentoActual = estadoGuardado.intentoActual;
        intentosPrevios = estadoGuardado.intentosPrevios;
        resultadosPrevios = estadoGuardado.resultadosPrevios;
        juegoTerminado = estadoGuardado.juegoTerminado;
        juegoGanado = estadoGuardado.juegoGanado;
        estadoTeclado = estadoGuardado.estadoTeclado;

        document.getElementById("pista-texto").textContent = juegoDelDia.descripcion;
        generarTablero();
        rellenarTablero();
        generarTeclado();
        aplicarEstadosTeclado(estadoTeclado);

        if (juegoTerminado) {
            mostrarBotonCompartir();
        }
    } else {
        document.getElementById("pista-texto").textContent = juegoDelDia.descripcion;
        generarTablero();
        generarTeclado();
    }
});
