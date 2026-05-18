// ==========================================================================
// EJERCICIO 01 — Fundamentos JavaScript
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) Cómo declarar variables (let, const) y por qué NO usar var.
//   2) Los 8 tipos de datos primitivos + cómo verificarlos con typeof.
//   3) Operadores aritméticos, asignación, comparación, lógicos.
//   4) Concatenación con + vs template literals con backticks ``.
//   5) console.log() y otras variantes de console.
//
// Abrí la consola del navegador (F12) y vas viendo cada bloque al recargar
// la página.

console.log('======== EJERCICIO 01 — FUNDAMENTOS ========');


// ==========================================================================
// 1) DECLARACIÓN DE VARIABLES: let, const, var
// ==========================================================================
// CONCEPTO:
//   - "let" → variable que puede CAMBIAR de valor (reasignación).
//   - "const" → constante: NO se puede reasignar.
//   - "var" → la forma vieja (de antes de ES6). NO la usamos por sus
//             problemas de "scope" (alcance global accidental).
//
// CONVENCIÓN:
//   - Variables: camelCase → primeraPalabraEnMinuscula
//   - Constantes "valores fijos para siempre": EN_MAYUSCULA_CON_GUION_BAJO
// ==========================================================================
console.log('\n--- 1) Variables ---');

let edad = 25;             // se puede cambiar
edad = 26;                 // ✅ válido
console.log('edad:', edad);

const NOMBRE = 'Laura';    // no se puede reasignar
// NOMBRE = 'Otro';        // ❌ esto tiraría: "Assignment to constant variable"
console.log('NOMBRE:', NOMBRE);

// const con objetos: el objeto NO se reasigna, pero SÍ podés mutar sus props.
const persona = {nombre: 'Laura', edad: 25};
persona.edad = 26;         // ✅ mutar propiedad sí se puede
// persona = {};           // ❌ reasignar no
console.log('persona:', persona);


// ==========================================================================
// 2) TIPOS DE DATOS PRIMITIVOS (8 tipos)
// ==========================================================================
// TIPADO DINÁMICO: una variable puede cambiar de tipo. Para saber QUÉ tipo
// tiene en este momento usamos el operador typeof.
//
// Los 8 tipos:
//   number     → enteros y decimales
//   string     → cadenas de texto
//   boolean    → true / false
//   null       → "valor desconocido / vacío intencional"
//   undefined  → "valor no asignado"
//   bigint     → enteros muy grandes
//   symbol     → identificadores únicos (avanzado)
//   object     → no primitivo: objetos, arrays, funciones
// ==========================================================================
console.log('\n--- 2) Tipos de datos ---');

const num = 42;
const decimal = 3.14;
const texto = 'Hola mundo';
const verdadero = true;
const nada = null;
let sinValor;              // undefined automático cuando no asignás nada
const objeto = {x: 1};
const lista = [1, 2, 3];

console.log('typeof num:', typeof num);             // number
console.log('typeof decimal:', typeof decimal);     // number (no hay int/float)
console.log('typeof texto:', typeof texto);         // string
console.log('typeof verdadero:', typeof verdadero); // boolean
console.log('typeof nada:', typeof nada);           // object (¡es un bug histórico de JS!)
console.log('typeof sinValor:', typeof sinValor);   // undefined
console.log('typeof objeto:', typeof objeto);       // object
console.log('typeof lista:', typeof lista);         // object (los arrays son objetos)

// ⚠️ Curiosidad: typeof null devuelve 'object'. Es un bug que se mantuvo
//    por compatibilidad. Para detectar null hay que comparar: variable === null.


// ==========================================================================
// 3) OPERADORES ARITMÉTICOS
// ==========================================================================
console.log('\n--- 3) Operadores aritméticos ---');

console.log('5 + 3 =', 5 + 3);    // suma
console.log('5 - 3 =', 5 - 3);    // resta
console.log('5 * 3 =', 5 * 3);    // multiplicación
console.log('5 / 3 =', 5 / 3);    // división (siempre devuelve decimal)
console.log('5 % 3 =', 5 % 3);    // módulo: resto de la división entera
console.log('5 ** 3 =', 5 ** 3);  // potencia: 5 a la 3 = 125

// Incremento/decremento
let contador = 10;
contador++;                         // contador = contador + 1 → 11
console.log('contador++ →', contador);
contador--;                         // contador = contador - 1 → 10
console.log('contador-- →', contador);


// ==========================================================================
// 4) OPERADORES DE ASIGNACIÓN COMPUESTOS
// ==========================================================================
// "x += 5" es lo mismo que "x = x + 5". Versión corta y limpia.
// ==========================================================================
console.log('\n--- 4) Asignación compuesta ---');

let total = 100;
total += 50;    // 150 (suma)
total -= 20;    // 130 (resta)
total *= 2;     // 260
total /= 4;     // 65
console.log('total:', total);


// ==========================================================================
// 5) OPERADORES DE COMPARACIÓN
// ==========================================================================
// CRÍTICO: en JS hay DOS operadores de igualdad:
//   ==   → compara con CONVERSIÓN de tipo (puede dar sorpresas).
//   ===  → compara ESTRICTAMENTE (sin conversión). El que casi siempre querés.
//
// REGLA DE ORO: SIEMPRE USÁ === Y !== (con 3 caracteres).
// Lo que se busca en parciales: saber por qué "1 == '1'" es true pero
// "1 === '1'" es false.
// ==========================================================================
console.log('\n--- 5) Comparación ---');

console.log("1 == '1':", 1 == '1');     // true  (compara con conversión)
console.log("1 === '1':", 1 === '1');   // false (estricta: distintos tipos)
console.log('1 !== 2:', 1 !== 2);       // true
console.log('5 > 3:', 5 > 3);           // true
console.log('5 >= 5:', 5 >= 5);         // true (mayor o igual)


// ==========================================================================
// 6) OPERADORES LÓGICOS
// ==========================================================================
// && → AND: true solo si AMBOS lados son true.
// || → OR:  true si AL MENOS UN lado es true.
// !  → NOT: invierte el valor.
//
// "Short-circuit": JS evalúa de izquierda a derecha y corta cuando ya sabe
// el resultado. Truco común: const x = valor || 'default'.
// ==========================================================================
console.log('\n--- 6) Lógicos ---');

console.log('true && false:', true && false);     // false
console.log('true || false:', true || false);     // true
console.log('!true:', !true);                     // false

// Truco común con || para "valor por defecto"
const nombreUsuario = '' || 'Anónimo';            // '' es falsy → usa 'Anónimo'
console.log('nombreUsuario:', nombreUsuario);

// Operador "nullish coalescing" ??: usa el default SOLO si es null o undefined.
// A diferencia de ||, no se activa con 0, '', false (que son falsy pero válidos).
const cantidad = 0 ?? 10;                          // 0 (no es null/undefined)
const otro = null ?? 'fallback';                   // 'fallback'
console.log('cantidad:', cantidad, '| otro:', otro);


// ==========================================================================
// 7) STRINGS y TEMPLATE LITERALS
// ==========================================================================
// Tres formas de "encerrar" un string:
//   '...'    → comillas simples
//   "..."    → comillas dobles
//   `...`    → BACKTICKS (template literals): permiten INTERPOLACIÓN y
//              salto de línea sin caracteres especiales.
// ==========================================================================
console.log('\n--- 7) Strings y template literals ---');

const tu = 'Laura';
const año = 2026;

// Concatenación con + (forma vieja)
const saludoViejo = 'Hola ' + tu + ', estamos en ' + año + '.';
console.log('Vieja:', saludoViejo);

// Template literal con backticks ` ` e interpolación con ${...}
// Mucho más legible cuando hay varias variables.
const saludoNuevo = `Hola ${tu}, estamos en ${año}.`;
console.log('Nueva:', saludoNuevo);

// Permite múltiples líneas SIN \n
const multiLinea = `
    Esto es
    un texto
    de varias líneas.
`;
console.log(multiLinea);

// Y permite expresiones, no solo variables
console.log(`5 + 3 = ${5 + 3}`);                  // 5 + 3 = 8
console.log(`Hola ${tu.toUpperCase()}`);          // Hola LAURA


// ==========================================================================
// 8) MÉTODOS BÁSICOS de strings
// ==========================================================================
console.log('\n--- 8) Métodos de string ---');

const frase = 'Programación III es genial';
console.log('length:', frase.length);                       // 25 (cantidad de caracteres)
console.log('toUpperCase:', frase.toUpperCase());           // todo MAYÚSCULAS
console.log('toLowerCase:', frase.toLowerCase());           // todo minúsculas
console.log('includes("III"):', frase.includes('III'));     // true
console.log('replace:', frase.replace('III', '3'));         // reemplazo
console.log('split:', frase.split(' '));                    // → array de palabras
console.log('slice(0, 11):', frase.slice(0, 11));           // 'Programació' (primeros 11)
console.log('trim:', '   hola   '.trim());                  // saca espacios al inicio/fin


// ==========================================================================
// 9) CONVERSIONES DE TIPO
// ==========================================================================
// JS te deja convertir entre tipos. Las más comunes:
// ==========================================================================
console.log('\n--- 9) Conversiones ---');

console.log('Number("42"):', Number('42'));         // 42 (string a number)
console.log('Number("abc"):', Number('abc'));       // NaN (Not a Number)
console.log('String(123):', String(123));           // '123' (number a string)
console.log('Boolean(0):', Boolean(0));             // false (0, '', null, undefined, NaN son "falsy")
console.log('Boolean(1):', Boolean(1));             // true (cualquier otro valor es "truthy")
console.log('parseInt("42px"):', parseInt('42px')); // 42 (extrae el número del inicio)
console.log('parseFloat("3.14"):', parseFloat('3.14')); // 3.14


// ==========================================================================
// 10) VARIANTES de console
// ==========================================================================
// console.log no es el único método. Otros útiles:
// ==========================================================================
console.log('\n--- 10) Console variantes ---');

console.info('console.info:', 'mensaje informativo');
console.warn('console.warn:', 'advertencia');
console.error('console.error:', 'error simulado');
console.table([{a: 1, b: 2}, {a: 3, b: 4}]);          // muestra en tabla
console.group('Grupo');
console.log('item 1');
console.log('item 2');
console.groupEnd();


console.log('\n✅ Fin del ejercicio 01. ¡Mirá la consola para ver todo!');
