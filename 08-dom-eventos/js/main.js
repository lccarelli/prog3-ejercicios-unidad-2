// ==========================================================================
// EJERCICIO 08 — DOM y eventos
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) Seleccionar elementos del DOM: querySelector y variantes.
//   2) Leer y modificar contenido: textContent, innerHTML, value.
//   3) classList: add, remove, toggle, contains.
//   4) Modificar estilos directos con .style.
//   5) Eventos: addEventListener, tipos comunes (click, input, submit, keydown).
//   6) Objeto Event: target, preventDefault.
//   7) Crear y eliminar elementos: createElement, append, remove.
//   8) Ventanas: alert, prompt, confirm.
//
// El DOM (Document Object Model) es la representación EN MEMORIA del HTML
// que JS puede leer y modificar. Cuando vos manipulás el DOM, la página
// se actualiza al instante.
// ==========================================================================

console.log('======== EJERCICIO 08 — DOM Y EVENTOS ========');


// ==========================================================================
// DEMO 1 — Selección y lectura del DOM
// ==========================================================================
// SELECTORES PRINCIPALES:
//
//   document.querySelector(sel)    → primer elemento que matchea (o null)
//   document.querySelectorAll(sel) → todos los que matchean (NodeList)
//   document.getElementById(id)    → por id (más viejo, sigue funcionando)
//   document.getElementsByClassName(cls)  → por clase (HTMLCollection)
//   document.getElementsByTagName(tag)    → por etiqueta
//
// Hoy se recomienda usar querySelector / querySelectorAll porque aceptan
// CUALQUIER selector CSS: '.clase', '#id', 'tag', 'tag.clase', etc.
// ==========================================================================

const btnLeer = document.querySelector('#btn-leer');
const parrafoDemo = document.querySelector('#parrafo-demo');
const resultadoLectura = document.querySelector('#resultado-lectura');

btnLeer.addEventListener('click', () => {
    // textContent → SOLO el texto (sin etiquetas).
    // innerHTML → contenido COMPLETO incluyendo etiquetas internas.
    // innerText → similar a textContent pero respeta CSS (display: none, etc).
    resultadoLectura.innerHTML = `
        <strong>textContent:</strong> "${parrafoDemo.textContent}"<br>
        <strong>innerHTML:</strong> ${parrafoDemo.innerHTML}<br>
        <strong>innerText:</strong> "${parrafoDemo.innerText}"
    `;
});


// ==========================================================================
// DEMO 2 — Modificar contenido
// ==========================================================================
// textContent: setea/lee texto plano. SEGURO contra HTML del usuario.
// innerHTML: setea HTML. PELIGROSO si el contenido viene del usuario
//            (vulnerable a XSS - inyección de código malicioso).
//
// REGLA: usá textContent siempre que sea posible. Solo usá innerHTML
// cuando vos controlás el HTML que estás insertando.
// ==========================================================================

const parrafoModificable = document.querySelector('#parrafo-modificable');
const textoOriginal = parrafoModificable.textContent;

document.querySelector('#btn-text').addEventListener('click', () => {
    parrafoModificable.textContent = '✏️ Modificado con textContent (texto plano).';
});

document.querySelector('#btn-html').addEventListener('click', () => {
    parrafoModificable.innerHTML = '🎨 Modificado con <strong>innerHTML</strong> (acepta etiquetas).';
});

document.querySelector('#btn-reset').addEventListener('click', () => {
    parrafoModificable.textContent = textoOriginal;
});


// ==========================================================================
// DEMO 3 — classList y estilos
// ==========================================================================
// classList tiene 4 métodos clave:
//   .add('clase')      → agrega la clase si no estaba.
//   .remove('clase')   → la quita.
//   .toggle('clase')   → si está la saca, si no está la pone.
//   .contains('clase') → devuelve true/false.
//
// .style permite modificar CSS inline desde JS.
// PERO: .style solo funciona en propiedades inline (no en hojas externas).
// Las propiedades con guion en CSS se escriben en camelCase:
//   background-color → style.backgroundColor
//   font-size        → style.fontSize
// ==========================================================================

const cajaEstilos = document.querySelector('#caja-estilos');

document.querySelector('#btn-add-class').addEventListener('click', () => {
    cajaEstilos.classList.add('destacado');
});

document.querySelector('#btn-remove-class').addEventListener('click', () => {
    cajaEstilos.classList.remove('destacado');
});

document.querySelector('#btn-toggle-class').addEventListener('click', () => {
    cajaEstilos.classList.toggle('destacado');
});

document.querySelector('#btn-style').addEventListener('click', () => {
    // Cambiar color random
    const colores = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const random = colores[Math.floor(Math.random() * colores.length)];
    cajaEstilos.style.backgroundColor = random;
    cajaEstilos.style.color = 'white';
});


// ==========================================================================
// DEMO 4 — Contador con eventos
// ==========================================================================
// Eventos de click + eventos de teclado.
// ==========================================================================

let contador = 0;
const valorContador = document.querySelector('#valor-contador');

function actualizarContador() {
    valorContador.textContent = contador;
    // Cambia el color según el valor (mostramos cómo combinar lógica + UI)
    if (contador > 0) {
        valorContador.style.color = '#10b981';
    } else if (contador < 0) {
        valorContador.style.color = '#ef4444';
    } else {
        valorContador.style.color = '#1f2937';
    }
}

document.querySelector('#btn-mas').addEventListener('click', () => {
    contador++;
    actualizarContador();
});

document.querySelector('#btn-menos').addEventListener('click', () => {
    contador--;
    actualizarContador();
});

// EVENTOS DE TECLADO (en toda la página):
// event.key te dice qué tecla se apretó.
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        contador++;
        actualizarContador();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        contador--;
        actualizarContador();
    }
});


// ==========================================================================
// DEMO 5 — Filtro en vivo (similar a fruteria)
// ==========================================================================
// Patrón clásico: input + filter en array + re-render.
//
// querySelectorAll devuelve un NodeList. Tiene forEach pero no map/filter.
// Si necesitás map/filter, convertilo a array: [...nodeList].map(...)
// ==========================================================================

const filtroInput = document.querySelector('#filtro');
const itemsLenguajes = document.querySelectorAll('#lista-lenguajes li');

filtroInput.addEventListener('input', (event) => {
    const texto = event.target.value.toLowerCase();
    itemsLenguajes.forEach(item => {
        // Si el texto coincide → mostramos, si no → ocultamos.
        const coincide = item.textContent.toLowerCase().includes(texto);
        item.style.display = coincide ? '' : 'none';
    });
});


// ==========================================================================
// DEMO 6 — Formulario con evento "submit"
// ==========================================================================
// Por defecto el submit recarga la página (comportamiento histórico).
// event.preventDefault() lo cancela: así podemos procesar el form con JS
// sin recargar.
//
// Para leer valores de inputs: input.value (NO innerHTML).
// ==========================================================================

const formContacto = document.querySelector('#form-contacto');
const formResultado = document.querySelector('#form-resultado');

formContacto.addEventListener('submit', (event) => {
    event.preventDefault();   // ← evita la recarga

    const nombre = document.querySelector('#nombre-form').value;
    const email = document.querySelector('#email-form').value;

    formResultado.innerHTML = `
        ✅ Recibido:<br>
        Nombre: ${nombre}<br>
        Email: ${email}
    `;

    // Limpiamos el formulario
    formContacto.reset();
});


// ==========================================================================
// DEMO 7 — Crear y eliminar elementos
// ==========================================================================
// document.createElement('tag') → crea un nodo nuevo (en memoria, todavía no
//                                  está en la página).
// parent.appendChild(node)      → lo agrega al final del padre.
// parent.append(node1, node2)   → versión moderna, admite varios + texto.
// node.remove()                 → se elimina a sí mismo del DOM.
//
// DELEGACIÓN DE EVENTOS:
//   Como en fruteria, ponemos UN listener en el padre (<ul>) y desde ahí
//   detectamos clicks en los hijos. Funciona aunque los hijos se agreguen
//   después.
// ==========================================================================

const inputTarea = document.querySelector('#nueva-tarea');
const btnAgregarTarea = document.querySelector('#btn-agregar-tarea');
const listaTareas = document.querySelector('#lista-tareas');

function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (texto === '') return;

    // Creamos el <li> con un <span> y un botón eliminar adentro.
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${texto}</span>
        <button class="btn-quitar">✕</button>
    `;
    listaTareas.appendChild(li);

    // Limpiamos el input y volvemos a enfocarlo
    inputTarea.value = '';
    inputTarea.focus();
}

btnAgregarTarea.addEventListener('click', agregarTarea);

// También permitimos agregar con Enter en el input.
inputTarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// DELEGACIÓN: un solo listener en la <ul> que escucha clicks en cualquier
// botón "btn-quitar", aunque el <li> se haya creado después.
listaTareas.addEventListener('click', (event) => {
    if (event.target.matches('.btn-quitar')) {
        // closest('li') sube por el árbol y encuentra el <li> contenedor.
        const li = event.target.closest('li');
        li.remove();
    } else if (event.target.matches('span')) {
        // Marcar como completada al hacer click en el texto
        event.target.classList.toggle('completada');
    }
});


// ==========================================================================
// DEMO 8 — alert, prompt, confirm
// ==========================================================================
// alert(mensaje)
//   Muestra una ventana modal con un botón "OK". Devuelve undefined.
//
// prompt(mensaje, valorDefault)
//   Muestra ventana con input. Devuelve el string que escribió el usuario,
//   o null si canceló.
//
// confirm(mensaje)
//   Muestra ventana con OK/Cancelar. Devuelve true/false.
//
// ⚠️ Las 3 BLOQUEAN la página (la pausan) hasta que el usuario responde.
// Por eso en producción se usan modales custom. Pero son útiles para
// prototipos rápidos y los pide la consigna del PDF.
// ==========================================================================

const resultadoVentana = document.querySelector('#resultado-ventana');

document.querySelector('#btn-alert').addEventListener('click', () => {
    alert('¡Hola! Soy una alerta nativa del navegador.');
    resultadoVentana.textContent = 'Mostraste un alert.';
});

document.querySelector('#btn-prompt').addEventListener('click', () => {
    const nombre = prompt('¿Cómo te llamás?', 'Anónimo');
    // prompt devuelve null si el usuario canceló
    if (nombre === null) {
        resultadoVentana.textContent = 'Cancelaste el prompt.';
    } else {
        resultadoVentana.textContent = `Hola ${nombre}, ¡gusto en conocerte!`;
    }
});

document.querySelector('#btn-confirm').addEventListener('click', () => {
    const respuesta = confirm('¿Estás aprendiendo JavaScript?');
    // confirm devuelve true (OK) o false (Cancelar)
    if (respuesta) {
        resultadoVentana.textContent = '¡Genial! Seguí practicando.';
    } else {
        resultadoVentana.textContent = '¡Nunca es tarde para empezar!';
    }
});


// ==========================================================================
// 📝 CHEAT SHEET: eventos comunes
// ==========================================================================
// Acción del usuario           Evento
// -------------------------    -------------------------
// Click                        'click'
// Hacer foco / sacar foco      'focus' / 'blur'
// Escribir en input            'input', 'keyup', 'keydown'
// Cambio en select/radio       'change'
// Enviar formulario            'submit'
// Mover mouse encima           'mouseover' / 'mouseenter'
// Sacar mouse                  'mouseout' / 'mouseleave'
// Página cargada               'DOMContentLoaded' / 'load'
// Cambio en URL                'hashchange', 'popstate'

console.log('\n✅ Ejercicio 08 cargado. Interactuá con la página para ver todo en acción.');
