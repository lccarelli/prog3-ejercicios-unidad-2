// ==========================================================================
// EJERCICIO 05 — JSON y objetos
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) Crear objetos literales y acceder a sus propiedades (. y []).
//   2) Agregar / modificar / eliminar propiedades.
//   3) Métodos dentro de objetos y la palabra reservada "this".
//   4) Destructuring: extraer propiedades en variables.
//   5) Shorthand properties y computed property names.
//   6) Spread operator con objetos (copiar / combinar / actualizar).
//   7) Recorrer objetos: Object.keys, Object.values, Object.entries.
//   8) Objetos anidados.
//   9) JSON.stringify() y JSON.parse() — para convertir objeto ⇄ string.
//   10) Aplicación: guardar en localStorage (como en fruteria).
//
// 💡 RECORDATORIO: en JS, los ARRAYS también son objetos (con índices
//    numéricos y la propiedad length). Todo lo de objetos aplica a arrays.
// ==========================================================================

console.log('======== EJERCICIO 05 — JSON Y OBJETOS ========');


// ==========================================================================
// 1) CREACIÓN de objetos literales
// ==========================================================================
// Sintaxis: { clave: valor, clave: valor }
// Las claves son strings (aunque las escribimos sin comillas).
// Los valores pueden ser de CUALQUIER tipo: primitivos, arrays, otros
// objetos, funciones.
// ==========================================================================
console.log('\n--- 1) Creación de objetos ---');

const persona = {
    nombre: 'Laura',
    apellido: 'Carelli',
    edad: 26,
    estudia: true,
    materias: ['Programación III', 'Análisis de Datos'],
    direccion: {
        ciudad: 'Buenos Aires',
        codigoPostal: 1000
    }
};

console.log('persona:', persona);


// ==========================================================================
// 2) ACCESO a propiedades: . (punto) vs [] (corchetes)
// ==========================================================================
// Punto: cuando sabés el nombre exacto y es un identificador válido.
// Corchetes: cuando la clave tiene espacios, símbolos, o viene en una
// VARIABLE (clave dinámica).
// ==========================================================================
console.log('\n--- 2) Acceso a propiedades ---');

console.log('persona.nombre:', persona.nombre);                 // Notación de punto
console.log("persona['apellido']:", persona['apellido']);       // Notación de corchete

// Acceso a propiedad anidada
console.log('persona.direccion.ciudad:', persona.direccion.ciudad);

// CLAVE DINÁMICA: lo que está adentro de [] se EVALÚA como expresión.
const claveBuscada = 'edad';
console.log('persona[claveBuscada]:', persona[claveBuscada]);   // 26

// Propiedad que no existe → undefined (no error)
console.log('persona.dni:', persona.dni);                       // undefined

// Optional chaining ?. — accede solo si lo anterior NO es null/undefined.
// Sin esto, "persona.direccion.calle.numero" tira error si calle no existe.
console.log('persona.direccion?.calle?.numero:',
    persona.direccion?.calle?.numero);                          // undefined, sin error


// ==========================================================================
// 3) MODIFICAR, AGREGAR y ELIMINAR propiedades
// ==========================================================================
// Los objetos son MUTABLES. Aunque uses const, podés cambiar sus propiedades
// (lo que const impide es REASIGNAR la variable a otro objeto).
// ==========================================================================
console.log('\n--- 3) Modificar / agregar / eliminar ---');

const auto = {marca: 'Toyota', modelo: 'Corolla'};

// Modificar
auto.modelo = 'Yaris';

// Agregar (la propiedad no existía)
auto.año = 2020;
auto['color'] = 'rojo';       // se puede usar [] también

console.log('auto:', auto);

// Eliminar con delete
delete auto.color;
console.log('después de delete:', auto);


// ==========================================================================
// 4) MÉTODOS dentro de un objeto + "this"
// ==========================================================================
// Un método es simplemente una función guardada como valor de una propiedad.
//
// "this" dentro de un método → se refiere AL OBJETO que llamó al método.
//
// REGLA: usá function tradicional (o sintaxis corta) para métodos.
// NO USES arrow function para métodos: en arrow, "this" NO apunta al objeto.
// ==========================================================================
console.log('\n--- 4) Métodos y this ---');

const usuario = {
    nombre: 'Laura',
    saludo: function() {
        // "this" se refiere a usuario
        return `Hola, soy ${this.nombre}`;
    },
    // Sintaxis CORTA (recomendada para métodos):
    despedida() {
        return `Adiós de ${this.nombre}`;
    },
    // ⚠️ Esto NO funciona como esperarías:
    saludoArrow: () => {
        // En arrow, "this" NO es usuario, sino el scope superior.
        return `this aquí es: ${this}`;
    }
};

console.log(usuario.saludo());        // 'Hola, soy Laura' ✅
console.log(usuario.despedida());     // 'Adiós de Laura' ✅
console.log(usuario.saludoArrow());   // "this aquí es: ..." (NO es usuario) ❌


// ==========================================================================
// 5) DESTRUCTURING (desestructuración)
// ==========================================================================
// Extraer propiedades de un objeto en variables, en una sola línea.
// Lo usamos mucho en la fruteria para los parámetros de las funciones.
// ==========================================================================
console.log('\n--- 5) Destructuring ---');

const libro = {titulo: '1984', autor: 'Orwell', año: 1949, paginas: 328};

// Forma básica: el nombre de la variable = el nombre de la clave
const {titulo, autor} = libro;
console.log('titulo:', titulo, '| autor:', autor);

// Renombrar: clave : nuevoNombre
const {titulo: nombreLibro, año: publicacion} = libro;
console.log('nombreLibro:', nombreLibro, '| publicacion:', publicacion);

// Con valor por defecto si no existe
const {paginas, editorial = 'Desconocida'} = libro;
console.log('paginas:', paginas, '| editorial:', editorial);

// Combinado con rest (...) → "el resto" en otra variable
const {titulo: t, ...resto} = libro;
console.log('t:', t, '| resto:', resto);

// DESTRUCTURING EN PARÁMETROS DE FUNCIÓN (super útil)
function mostrarLibro({titulo, autor}) {
    console.log(`📖 ${titulo} - ${autor}`);
}
mostrarLibro(libro);


// ==========================================================================
// 6) SHORTHAND y COMPUTED PROPERTIES
// ==========================================================================
// SHORTHAND: si la variable se llama igual que la clave, podés omitir la
// repetición: {x: x, y: y} → {x, y}.
//
// COMPUTED: poner una expresión entre [ ] como clave, se evalúa.
// ==========================================================================
console.log('\n--- 6) Shorthand y computed ---');

const x = 10;
const y = 20;

// Forma vieja
const puntoViejo = {x: x, y: y};
// Forma corta (shorthand)
const punto = {x, y};
console.log('punto:', punto);                  // {x: 10, y: 20}

// Computed property names
const claveDinamica = 'color';
const config = {
    [claveDinamica]: 'rojo',                   // la clave se calcula
    [`tamaño_${'grande'}`]: 100                // expresión válida
};
console.log('config:', config);                // {color: 'rojo', 'tamaño_grande': 100}


// ==========================================================================
// 7) SPREAD operator con objetos
// ==========================================================================
// Lo usamos para COPIAR y para "actualizar inmutablemente".
// La actualización inmutable es CLAVE en React, Redux, etc.
// ==========================================================================
console.log('\n--- 7) Spread con objetos ---');

const base = {nombre: 'Laura', edad: 26};

// Copia "superficial" (shallow copy)
const copia = {...base};
copia.edad = 99;
console.log('base original:', base);            // sin cambios
console.log('copia modificada:', copia);

// "Actualizar" devolviendo un objeto nuevo
const actualizado = {...base, edad: 27, ciudad: 'BA'};
console.log('actualizado:', actualizado);
console.log('base sigue:', base);               // intacto

// Combinar dos objetos. Si hay claves repetidas, gana el de la DERECHA.
const a = {x: 1, y: 2};
const b = {y: 99, z: 3};
const combinado = {...a, ...b};
console.log('combinado:', combinado);           // {x: 1, y: 99, z: 3}


// ==========================================================================
// 8) RECORRER objetos: keys, values, entries
// ==========================================================================
// Los objetos no se recorren con for...of directamente. Tenés 3 helpers:
//
//   Object.keys(obj)   → array de las claves.
//   Object.values(obj) → array de los valores.
//   Object.entries(obj) → array de pares [clave, valor].
//
// Combinados con forEach/map/filter, podés operar sobre objetos como
// si fueran arrays.
// ==========================================================================
console.log('\n--- 8) Recorrer objetos ---');

const precios = {manzana: 1500, banana: 1000, kiwi: 2000};

console.log('keys:', Object.keys(precios));       // ['manzana', 'banana', 'kiwi']
console.log('values:', Object.values(precios));   // [1500, 1000, 2000]
console.log('entries:', Object.entries(precios)); // [['manzana', 1500], ...]

// Iterar con for...of + entries:
for (const [fruta, precio] of Object.entries(precios)) {
    console.log(`${fruta}: $${precio}`);
}

// Sumar todos los valores con reduce sobre Object.values:
const totalGastado = Object.values(precios).reduce((a, b) => a + b, 0);
console.log('Total:', totalGastado);


// ==========================================================================
// 9) JSON.stringify y JSON.parse
// ==========================================================================
// JSON (JavaScript Object Notation) = formato de texto inspirado en la
// sintaxis literal de JS. SE USA EN TODOS LADOS:
//   - localStorage (solo guarda strings).
//   - Comunicación con APIs / servidores.
//   - Archivos de configuración.
//
// JSON.stringify(obj) → string (serialización).
// JSON.parse(string)  → objeto (deserialización).
//
// REGLAS DEL JSON (más estricto que JS):
//   - Claves SIEMPRE con comillas dobles: "clave"
//   - Strings con comillas dobles: "valor"
//   - NO se permiten funciones, undefined, símbolos.
//   - Las propiedades undefined se IGNORAN (se omiten).
// ==========================================================================
console.log('\n--- 9) JSON.stringify y JSON.parse ---');

const tarea = {
    id: 1,
    titulo: 'Estudiar',
    completada: false,
    fecha: new Date('2026-05-17')
};

// Convertir a string (compacto)
const json = JSON.stringify(tarea);
console.log('JSON compacto:', json);
// {"id":1,"titulo":"Estudiar","completada":false,"fecha":"..."}

// Con formato (segundo arg null, tercer arg = espacios de indentación)
const jsonBonito = JSON.stringify(tarea, null, 2);
console.log('JSON formateado:\n' + jsonBonito);

// De vuelta a objeto
const objeto = JSON.parse(json);
console.log('Objeto parseado:', objeto);
console.log('Tipo de objeto.fecha:', typeof objeto.fecha);
// ⚠️ "fecha" se reparseó como STRING, no como Date. JSON no preserva tipos
//    complejos como Date, Map, Set, funciones, etc.

// Lo que se IGNORA al stringify:
const conRarezas = {
    a: 1,
    b: undefined,                    // se omite
    c: function() {},               // se omite
    d: Symbol('s')                  // se omite
};
console.log('Stringify de rarezas:', JSON.stringify(conRarezas));   // {"a":1}


// ==========================================================================
// 10) APLICACIÓN: guardar/recuperar de localStorage (igual que fruteria)
// ==========================================================================
// localStorage es un almacenamiento del navegador que SOLO guarda strings.
// Por eso siempre va con JSON.stringify al guardar y JSON.parse al leer.
// ==========================================================================
console.log('\n--- 10) localStorage con JSON (igual que fruteria) ---');

const configuracion = {
    tema: 'oscuro',
    idioma: 'es',
    notificaciones: true
};

// Guardar
localStorage.setItem('configEjemplo', JSON.stringify(configuracion));

// Leer (devuelve null si nunca se guardó, por eso el || {} de fallback)
const configGuardada = JSON.parse(localStorage.getItem('configEjemplo')) || {};
console.log('Config recuperada de localStorage:', configGuardada);

// Borrar
localStorage.removeItem('configEjemplo');


// ==========================================================================
// 11) BONUS: clonado profundo (deep copy)
// ==========================================================================
// El spread {...obj} hace una copia SUPERFICIAL: los objetos anidados
// se siguen compartiendo por referencia.
//
// Si necesitás una copia REALMENTE independiente (deep clone), opciones:
//   - structuredClone(obj) → moderno, recomendado.
//   - JSON.parse(JSON.stringify(obj)) → truco viejo (no preserva fechas,
//     funciones, etc.).
// ==========================================================================
console.log('\n--- 11) Bonus: deep clone ---');

const original = {nombre: 'Laura', skills: ['JS', 'CSS']};

const copiaSuperficial = {...original};
copiaSuperficial.skills.push('Python');
console.log('original.skills:', original.skills);
// ⚠️ ['JS', 'CSS', 'Python']  ← el array ANIDADO se compartió por referencia

// Deep clone con structuredClone (moderno):
const original2 = {nombre: 'Laura', skills: ['JS', 'CSS']};
const deepCopy = structuredClone(original2);
deepCopy.skills.push('Python');
console.log('original2.skills (no cambió):', original2.skills);   // ['JS', 'CSS'] ✅


console.log('\n✅ Fin del ejercicio 05.');
