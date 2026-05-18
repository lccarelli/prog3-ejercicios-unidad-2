// ==========================================================================
// EJERCICIO 03 — Arrays: métodos clásicos
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) Crear arrays, acceder por índice, propiedad length.
//   2) Métodos para AGREGAR/QUITAR elementos:
//      push, pop, shift, unshift, splice.
//   3) Métodos para BUSCAR: indexOf, lastIndexOf, includes, find, findIndex.
//   4) Métodos que NO mutan: slice, concat.
//   5) Métodos de orden: reverse, sort (versión básica).
//   6) Conversión array ⇄ string: join, split.
//   7) Iteración con forEach + for...of.
//
// ⚠️ CONCEPTO CRÍTICO: hay métodos que MUTAN el array original y otros que
// DEVUELVEN UNO NUEVO. Confundirlos es uno de los errores más comunes.
//
// MUTAN:      push, pop, shift, unshift, splice, reverse, sort, fill
// NO MUTAN:   slice, concat, map, filter, reduce, find, includes, indexOf
//
// (map, filter y reduce los veremos en el ejercicio 04.)
// ==========================================================================

console.log('======== EJERCICIO 03 — ARRAYS CLÁSICOS ========');


// ==========================================================================
// 1) CREACIÓN y ACCESO BÁSICO
// ==========================================================================
console.log('\n--- 1) Creación y acceso ---');

// Sintaxis literal (la que casi siempre se usa)
const frutas = ['manzana', 'banana', 'kiwi'];

// Otra forma (rara): con el constructor Array. No la uses, está acá solo
// para que la reconozcas si la ves en código de otros.
const otros = new Array('a', 'b', 'c');

// Acceso por ÍNDICE (empieza en 0)
console.log('frutas[0]:', frutas[0]);           // 'manzana'
console.log('frutas[2]:', frutas[2]);           // 'kiwi'
console.log('frutas[99]:', frutas[99]);         // undefined (no existe)

// .length = cantidad de elementos
console.log('frutas.length:', frutas.length);   // 3

// Truco para obtener el ÚLTIMO elemento:
console.log('último:', frutas[frutas.length - 1]);   // 'kiwi'
// O usando el método moderno .at() (admite índices negativos):
console.log('frutas.at(-1):', frutas.at(-1));        // 'kiwi'

// MODIFICAR un elemento por índice
frutas[1] = 'pera';
console.log('frutas después:', frutas);          // ['manzana', 'pera', 'kiwi']


// ==========================================================================
// 2) push y pop → agregan/sacan al FINAL
// ==========================================================================
// Estos dos MUTAN el array original.
// .push() retorna el nuevo length.
// .pop() retorna el elemento eliminado.
// ==========================================================================
console.log('\n--- 2) push / pop (final) ---');

const numeros = [1, 2, 3];

const nuevoLength = numeros.push(4);
console.log('push(4) → numeros:', numeros);          // [1, 2, 3, 4]
console.log('   retornó:', nuevoLength);             // 4 (nuevo length)

// push admite varios argumentos
numeros.push(5, 6, 7);
console.log('push(5,6,7) → numeros:', numeros);      // [1, 2, 3, 4, 5, 6, 7]

const eliminado = numeros.pop();
console.log('pop() → numeros:', numeros);            // [1, 2, 3, 4, 5, 6]
console.log('   retornó:', eliminado);               // 7


// ==========================================================================
// 3) shift y unshift → agregan/sacan al INICIO
// ==========================================================================
// shift: elimina y retorna el primer elemento.
// unshift: agrega al principio. Retorna el nuevo length.
// Ambos MUTAN el array original.
//
// ⚠️ Performance: shift/unshift son más LENTOS que push/pop porque hay
// que "reindexar" todos los demás elementos. En arrays grandes y código
// crítico, evitalos.
// ==========================================================================
console.log('\n--- 3) shift / unshift (inicio) ---');

const cola = ['Ana', 'Beto', 'Cami'];

const primero = cola.shift();
console.log('shift() → cola:', cola);                // ['Beto', 'Cami']
console.log('   retornó:', primero);                 // 'Ana'

cola.unshift('Damián');
console.log('unshift("Damián") → cola:', cola);      // ['Damián', 'Beto', 'Cami']


// ==========================================================================
// 4) splice → AGREGA / QUITA / REEMPLAZA en CUALQUIER posición
// ==========================================================================
// Sintaxis: arr.splice(inicio, cantidadAEliminar, ...elementosAInsertar)
// MUTA el array y RETORNA los elementos eliminados.
//
// Es el método "todo en uno" más versátil. Y el que más te va a aparecer
// en parciales.
// ==========================================================================
console.log('\n--- 4) splice (cualquier posición) ---');

const colores = ['rojo', 'verde', 'azul', 'amarillo', 'naranja'];

// ELIMINAR 2 elementos a partir del índice 1
const sacados = colores.splice(1, 2);
console.log('colores:', colores);                    // ['rojo', 'amarillo', 'naranja']
console.log('sacados:', sacados);                    // ['verde', 'azul']

// INSERTAR sin eliminar (cantidadAEliminar = 0)
const lista = ['a', 'b', 'e'];
lista.splice(2, 0, 'c', 'd');
console.log('después de insertar:', lista);          // ['a', 'b', 'c', 'd', 'e']

// REEMPLAZAR (eliminar N y poner otros N)
const dias = ['lun', 'mar', 'mie', 'jue'];
dias.splice(1, 2, 'martes', 'miércoles');
console.log('reemplazo:', dias);                     // ['lun', 'martes', 'miércoles', 'jue']


// ==========================================================================
// 5) slice → DEVUELVE una copia de una PARTE (no muta)
// ==========================================================================
// Sintaxis: arr.slice(inicio, fin)    fin NO incluido
// Si omitís fin, llega hasta el final del array.
// Si pasás un solo argumento negativo, cuenta desde el final.
//
// ⚠️ slice vs splice: el nombre se parece pero hacen cosas opuestas.
//      slice  = "sacar una rebanada" (no muta, devuelve copia parcial)
//      splice = "operar sobre" (muta, agrega/quita)
// ==========================================================================
console.log('\n--- 5) slice (copia parcial, NO MUTA) ---');

const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun'];

console.log('slice(1, 4):', meses.slice(1, 4));      // ['feb', 'mar', 'abr']
console.log('slice(2):', meses.slice(2));            // ['mar', 'abr', 'may', 'jun']
console.log('slice(-2):', meses.slice(-2));          // ['may', 'jun'] (últimos 2)
console.log('meses ORIGINAL:', meses);               // sigue intacto


// ==========================================================================
// 6) BÚSQUEDA en arrays: indexOf, lastIndexOf, includes, find, findIndex
// ==========================================================================
// indexOf(valor):    primera posición donde aparece, o -1 si no está.
// lastIndexOf(valor): última posición. Útil cuando hay duplicados.
// includes(valor):   true / false.
// find(callback):    el PRIMER elemento que cumple la condición. undefined si no.
// findIndex(callback): el ÍNDICE del primero que cumple. -1 si no.
//
// indexOf/includes comparan con === (estricto). find/findIndex usan callback.
// ==========================================================================
console.log('\n--- 6) Búsqueda ---');

const letras = ['a', 'b', 'c', 'b', 'd'];

console.log("indexOf('b'):", letras.indexOf('b'));           // 1
console.log("lastIndexOf('b'):", letras.lastIndexOf('b'));   // 3
console.log("indexOf('z'):", letras.indexOf('z'));           // -1 (no está)
console.log("includes('c'):", letras.includes('c'));         // true
console.log("includes('z'):", letras.includes('z'));         // false

// find / findIndex con callback (más potente)
const personas = [
    {nombre: 'Ana', edad: 20},
    {nombre: 'Beto', edad: 25},
    {nombre: 'Cami', edad: 30}
];

const mayor = personas.find(p => p.edad > 22);
console.log('mayor de 22:', mayor);                    // {nombre: 'Beto', edad: 25}

const indiceCami = personas.findIndex(p => p.nombre === 'Cami');
console.log('índice de Cami:', indiceCami);            // 2

const inexistente = personas.find(p => p.edad > 100);
console.log('mayor de 100:', inexistente);             // undefined (no encontró)


// ==========================================================================
// 7) concat: une arrays SIN MUTAR (devuelve uno nuevo)
// ==========================================================================
console.log('\n--- 7) concat ---');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

const todos = arr1.concat(arr2, arr3);
console.log('todos:', todos);                          // [1..9]
console.log('arr1 sigue:', arr1);                      // [1, 2, 3]

// Equivalente moderno con spread:
const todosSpread = [...arr1, ...arr2, ...arr3];
console.log('todosSpread:', todosSpread);              // [1..9]


// ==========================================================================
// 8) reverse → invierte (MUTA)
// ==========================================================================
console.log('\n--- 8) reverse ---');

const orden = [1, 2, 3, 4, 5];
orden.reverse();
console.log('orden después de reverse:', orden);      // [5, 4, 3, 2, 1]

// Si NO querés mutar, usá copia + reverse:
const original = [1, 2, 3];
const invertido = [...original].reverse();
console.log('original:', original);                    // [1, 2, 3]
console.log('invertido:', invertido);                  // [3, 2, 1]


// ==========================================================================
// 9) sort → ordena (MUTA, y por defecto ordena ALFABÉTICAMENTE)
// ==========================================================================
// ⚠️ Sin comparador, sort convierte todo a string y ordena alfabéticamente.
// Por eso [10, 1, 5, 2].sort() da [1, 10, 2, 5] y NO lo que esperás.
//
// Pasale un comparador (a, b) => número:
//   - negativo → a antes que b
//   - positivo → a después que b
//   - cero     → quedan igual
//
// Trucos:
//   Ascendente:    (a, b) => a - b
//   Descendente:   (a, b) => b - a
//   Strings:       (a, b) => a.localeCompare(b)
// ==========================================================================
console.log('\n--- 9) sort ---');

// Sin comparador → ¡cuidado!
console.log('sort default:', [10, 1, 5, 2].sort());          // [1, 10, 2, 5]

// Con comparador ascendente
const nums = [10, 1, 5, 2];
nums.sort((a, b) => a - b);
console.log('sort asc:', nums);                              // [1, 2, 5, 10]

// Descendente
nums.sort((a, b) => b - a);
console.log('sort desc:', nums);                             // [10, 5, 2, 1]

// Strings con acentos: localeCompare
const nombres = ['Zoé', 'Álvaro', 'Beto', 'Ana'];
nombres.sort((a, b) => a.localeCompare(b));
console.log('nombres ordenados:', nombres);                  // ['Álvaro', 'Ana', 'Beto', 'Zoé']


// ==========================================================================
// 10) join → convierte ARRAY → STRING
//     split → convierte STRING → ARRAY (es de String, no de Array, pero
//     son la pareja perfecta)
// ==========================================================================
console.log('\n--- 10) join / split ---');

const palabras = ['Hola', 'mundo', 'cruel'];

console.log("join(' '):", palabras.join(' '));        // 'Hola mundo cruel'
console.log("join('-'):", palabras.join('-'));        // 'Hola-mundo-cruel'
console.log("join():", palabras.join());              // 'Hola,mundo,cruel' (default: coma)

// split (inverso)
const csv = 'manzana,banana,kiwi';
const frutasCsv = csv.split(',');
console.log('split:', frutasCsv);                     // ['manzana', 'banana', 'kiwi']

// Cuenta palabras de una frase
const frase = 'JavaScript es un gran lenguaje';
console.log('cantidad de palabras:', frase.split(' ').length);  // 5


// ==========================================================================
// 11) ITERAR: forEach y for...of
// ==========================================================================
// forEach: recorre el array y ejecuta un callback en cada elemento.
//          NO devuelve nada útil. SE USA cuando solo querés EFECTOS.
//          Si querés transformar el array, usá map (ej 04).
//
// for...of: sintaxis más "tradicional" de loop. Permite usar break/continue.
// ==========================================================================
console.log('\n--- 11) forEach / for...of ---');

const compras = ['leche', 'pan', 'huevos'];

compras.forEach((item, indice) => {
    console.log(`forEach ${indice}: ${item}`);
});
// for...of
for (const item of compras) {
    console.log('for...of:', item);
}

// Si necesitás el ÍNDICE en for...of, usá entries() para tener [i, valor]
for (const [i, item] of compras.entries()) {
    console.log(`for...of con índice ${i}: ${item}`);
}


// ==========================================================================
// 12) APLICACIÓN PRÁCTICA: una mini "lista de tareas"
// ==========================================================================
// Combinamos varios métodos para un ejemplo realista.
// ==========================================================================
console.log('\n--- 12) Aplicación práctica: lista de tareas ---');

const tareas = [];

// Agregar tareas al final (push)
tareas.push('Estudiar JS');
tareas.push('Hacer la práctica');
tareas.push('Yoga');
console.log('Tareas iniciales:', tareas);

// Insertar una nueva tarea en la posición 1 (al principio de la lista activa)
tareas.splice(1, 0, '⭐ URGENTE: Repasar parcial');
console.log('Con tarea urgente:', tareas);

// Buscar el índice de una tarea
const indiceYoga = tareas.indexOf('Yoga');
console.log('Índice de Yoga:', indiceYoga);

// Eliminar esa tarea (splice + indexOf es un patrón común)
if (indiceYoga !== -1) {
    tareas.splice(indiceYoga, 1);
}
console.log('Sin yoga:', tareas);

// "Listar" todas las tareas como string
const reporte = tareas.join(' | ');
console.log('Reporte:', reporte);


console.log('\n✅ Fin del ejercicio 03. ¡Mirá la consola!');
