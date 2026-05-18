// ==========================================================================
// EJERCICIO 02 — Funciones en JavaScript
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) Function declaration vs function expression vs arrow function.
//   2) Parámetros: posicionales, default, rest.
//   3) Operador spread (...) para arrays y objetos.
//   4) return: con y sin valor.
//   5) Funciones como valores (se pueden guardar en variables, pasar como
//      argumento → "higher-order functions"). Concepto de CALLBACK.
//   6) Diferencia clave: this léxico en arrow functions.
//   7) Funciones puras (sin side effects) vs impuras.
// ==========================================================================

console.log('======== EJERCICIO 02 — FUNCIONES ========');


// ==========================================================================
// 1) FUNCTION DECLARATION (declaración clásica)
// ==========================================================================
// Sintaxis:  function nombre(parámetros) { ... }
//
// Característica importante: HOISTING.
// Las function declarations se "elevan" al inicio del scope, así que podés
// USARLAS ANTES de declararlas en el archivo:
//
//     console.log(sumar(2, 3));  // ✅ funciona
//     function sumar(a, b) { return a + b; }
// ==========================================================================
console.log('\n--- 1) Function declaration ---');

function sumar(a, b) {
    return a + b;
}

console.log('sumar(2, 3):', sumar(2, 3));     // 5
console.log('sumar(10, -5):', sumar(10, -5)); // 5


// ==========================================================================
// 2) FUNCTION EXPRESSION (función asignada a una variable)
// ==========================================================================
// Sintaxis:  const nombre = function(parámetros) { ... };
//
// La función es ANÓNIMA (sin nombre) y la guardamos en una constante.
// NO TIENE HOISTING: solo está disponible DESPUÉS de su declaración.
// ==========================================================================
console.log('\n--- 2) Function expression ---');

const restar = function(a, b) {
    return a - b;
};

console.log('restar(10, 3):', restar(10, 3));  // 7


// ==========================================================================
// 3) ARROW FUNCTIONS (fat arrow =>)
// ==========================================================================
// Sintaxis básica:  const nombre = (parámetros) => { cuerpo };
//
// Reglas:
//   - Si tiene UNA SOLA SENTENCIA que retorna, podés omitir { } y return:
//       const doble = x => x * 2;
//   - Si tiene UN SOLO parámetro, podés omitir los paréntesis:
//       const doble = x => x * 2;     // misma cosa
//   - Si no recibe parámetros, los paréntesis vacíos son OBLIGATORIOS:
//       const saludo = () => 'hola';
//   - Si querés retornar un objeto literal directo, envolvelo en paréntesis:
//       const persona = () => ({nombre: 'Laura'});
//                                    // ↑ paréntesis obligatorios para que JS
//                                    //   no confunda { } con cuerpo de función.
// ==========================================================================
console.log('\n--- 3) Arrow functions ---');

// Versión completa
const multiplicar = (a, b) => {
    return a * b;
};

// Versión compacta (una sola sentencia)
const dividir = (a, b) => a / b;

// Un solo parámetro, sin paréntesis
const cuadrado = x => x * x;

// Sin parámetros
const saludar = () => 'Hola desde arrow function';

// Retorna objeto literal (paréntesis envolventes obligatorios)
const crearPersona = (nombre, edad) => ({nombre, edad});

console.log('multiplicar(4, 5):', multiplicar(4, 5));     // 20
console.log('dividir(10, 2):', dividir(10, 2));           // 5
console.log('cuadrado(7):', cuadrado(7));                 // 49
console.log('saludar():', saludar());                     // 'Hola desde arrow function'
console.log('crearPersona:', crearPersona('Laura', 26));  // {nombre: 'Laura', edad: 26}


// ==========================================================================
// 4) PARÁMETROS DEFAULT (valores por defecto)
// ==========================================================================
// Si quien llama no pasa un parámetro, JS asigna el valor que pusimos
// después del =.
// ==========================================================================
console.log('\n--- 4) Parámetros default ---');

function saludo(nombre = 'visitante', idioma = 'es') {
    if (idioma === 'es') return `Hola ${nombre}`;
    if (idioma === 'en') return `Hello ${nombre}`;
    return `Hi ${nombre}`;
}

console.log(saludo());                       // 'Hola visitante' (ambos por default)
console.log(saludo('Laura'));                // 'Hola Laura'
console.log(saludo('Laura', 'en'));          // 'Hello Laura'

// ⚠️ El default SOLO se activa si el argumento es undefined.
// Pasar null NO activa el default (null es un valor válido).
console.log(saludo(null, 'es'));             // 'Hola null'  (nulo, no undefined)


// ==========================================================================
// 5) PARÁMETROS REST (...nombre)
// ==========================================================================
// Permite recibir UN NÚMERO INDEFINIDO de argumentos como un array.
// El parámetro rest TIENE QUE SER EL ÚLTIMO de la firma.
// ==========================================================================
console.log('\n--- 5) Parámetros rest ---');

// numeros es un ARRAY con todos los argumentos que se pasaron.
function sumarTodos(...numeros) {
    let suma = 0;
    for (const n of numeros) {
        suma += n;
    }
    return suma;
}

console.log('sumarTodos(1):', sumarTodos(1));                       // 1
console.log('sumarTodos(1, 2, 3):', sumarTodos(1, 2, 3));           // 6
console.log('sumarTodos(1, 2, 3, 4, 5):', sumarTodos(1, 2, 3, 4, 5)); // 15

// Combinando parámetros normales con rest
function mostrarReporte(titulo, ...detalles) {
    console.log(`📋 ${titulo}`);
    detalles.forEach((d, i) => console.log(`  ${i + 1}. ${d}`));
}
mostrarReporte('Tareas de hoy', 'Estudiar', 'Cocinar', 'Yoga');


// ==========================================================================
// 6) OPERADOR SPREAD (...)
// ==========================================================================
// "Mismo símbolo, uso opuesto al rest":
//   - rest: agarra varios argumentos y los junta en UN array.
//   - spread: agarra UN array/objeto y lo "desparrama" en sus elementos.
// ==========================================================================
console.log('\n--- 6) Spread operator ---');

const numeros = [3, 1, 4, 1, 5, 9, 2, 6];

// Sin spread: Math.max espera valores separados, no un array
console.log('Math.max(3,1,4):', Math.max(3, 1, 4));       // 4
// Con spread: convertimos el array en argumentos separados
console.log('Math.max(...numeros):', Math.max(...numeros)); // 9

// Spread para copiar un array (¡no comparte referencia con el original!)
const copia = [...numeros];
copia.push(99);
console.log('copia:', copia);
console.log('numeros original:', numeros);    // sigue sin el 99

// Spread para combinar arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const combinado = [...a, ...b];
console.log('combinado:', combinado);   // [1, 2, 3, 4, 5, 6]

// Spread con objetos (muy útil para "actualizaciones inmutables")
const usuario = {nombre: 'Laura', edad: 26};
const usuarioActualizado = {...usuario, edad: 27, ciudad: 'Buenos Aires'};
console.log('usuarioActualizado:', usuarioActualizado);
// {nombre: 'Laura', edad: 27, ciudad: 'Buenos Aires'}


// ==========================================================================
// 7) RETURN: con valor, sin valor, retorno temprano
// ==========================================================================
console.log('\n--- 7) Return ---');

// Sin return → la función devuelve undefined
function sinRetorno() {
    console.log('Hice algo');
    // implícito: return undefined;
}
console.log('sinRetorno() devuelve:', sinRetorno());   // 'Hice algo' y luego undefined

// Retorno temprano (early return): salir de la función apenas se cumple algo.
// Patrón común para evitar anidaciones profundas.
function dividirSeguro(a, b) {
    if (b === 0) {
        return 'No se puede dividir por cero';   // sale antes de calcular
    }
    return a / b;
}
console.log('dividirSeguro(10, 2):', dividirSeguro(10, 2)); // 5
console.log('dividirSeguro(10, 0):', dividirSeguro(10, 0)); // 'No se puede...'


// ==========================================================================
// 8) FUNCIONES COMO VALORES (higher-order + callbacks)
// ==========================================================================
// En JS las funciones son "ciudadanas de primera clase":
//   - Se pueden guardar en variables.
//   - Se pueden pasar como ARGUMENTOS a otra función → CALLBACK.
//   - Se pueden devolver desde otra función.
// ==========================================================================
console.log('\n--- 8) Higher-order + callbacks ---');

// Función que recibe OTRA función como argumento (= higher-order function)
function operar(a, b, operacion) {
    return operacion(a, b);
}

// La función que pasamos como argumento se llama "callback"
console.log('operar(3, 4, sumar):', operar(3, 4, sumar));         // 7
console.log('operar(3, 4, multiplicar):', operar(3, 4, multiplicar)); // 12

// También podemos pasar una arrow function "inline"
console.log('operar(10, 3, (a, b) => a - b):', operar(10, 3, (a, b) => a - b));
// → 7

// Función que DEVUELVE una función ("closure")
function crearMultiplicador(factor) {
    return function(numero) {
        return numero * factor;
    };
}

const triple = crearMultiplicador(3);
console.log('triple(5):', triple(5));    // 15
console.log('triple(10):', triple(10));  // 30


// ==========================================================================
// 9) DIFERENCIA CRÍTICA: "this" en arrow vs función normal
// ==========================================================================
// Las arrow functions NO tienen su propio this: lo heredan del scope donde
// fueron definidas (este es el famoso "this léxico").
// Las function declarations crean su PROPIO this según cómo se llamen.
//
// Esto importa cuando trabajás con métodos de objetos o eventos.
// En la mayoría de los casos modernos, USÁ ARROW FUNCTIONS y no te
// preocupes por "this" — funciona como esperás.
// ==========================================================================
console.log('\n--- 9) Diferencia de "this" (preview, lo veremos a fondo en POO) ---');

const objeto = {
    valor: 42,
    metodoTradicional: function() {
        return this.valor;     // "this" se refiere al objeto que llama: { valor: 42 }
    },
    metodoArrow: () => {
        // "this" NO se refiere al objeto, sino al scope superior.
        // En el navegador, sería "window" o undefined en strict mode.
        return this;
    }
};

console.log('metodoTradicional:', objeto.metodoTradicional()); // 42 ✅
console.log('metodoArrow:', objeto.metodoArrow());             // {} o undefined (NO es lo que esperás)
// 👉 Regla: si vas a definir un MÉTODO de un objeto, usá function tradicional
//    o la sintaxis corta de métodos: { metodo() {...} }.
//    Para callbacks dentro de un método (ej: forEach), arrow casi siempre es mejor.


// ==========================================================================
// 10) FUNCIONES PURAS vs IMPURAS
// ==========================================================================
// PURA: dada la misma entrada, siempre devuelve la misma salida. NO modifica
// nada de afuera (sin "side effects").
// IMPURA: tiene side effects (modifica variables externas, hace console.log,
// llama a API, escribe en DOM, etc.).
// Las puras son más fáciles de testear y razonar. Las impuras son necesarias
// para que algo "pase" en la app.
// ==========================================================================
console.log('\n--- 10) Pura vs impura ---');

// Pura: solo depende de sus argumentos, no toca nada de afuera.
const sumarPura = (a, b) => a + b;

// Impura: muta una variable de afuera.
let acumulado = 0;
function sumarImpura(n) {
    acumulado += n;     // side effect: modifica variable externa
    return acumulado;
}

console.log('sumarPura(2, 3):', sumarPura(2, 3));      // siempre 5
console.log('sumarPura(2, 3):', sumarPura(2, 3));      // siempre 5
console.log('sumarImpura(2):', sumarImpura(2));        // 2
console.log('sumarImpura(2):', sumarImpura(2));        // 4 (¡cambia!)


console.log('\n✅ Fin del ejercicio 02. ¡Mirá la consola para ver todo!');
