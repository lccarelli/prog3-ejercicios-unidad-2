// ==========================================================================
// EJERCICIO 04 — map, filter, reduce
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) map: TRANSFORMAR cada elemento → nuevo array del MISMO tamaño.
//   2) filter: SELECCIONAR los que cumplen una condición → nuevo array más chico.
//   3) reduce: COMBINAR todos los elementos en UN solo valor.
//   4) Encadenar map → filter → reduce.
//   5) Patrones típicos: suma, máximo, agrupado, contador, promedios.
//
// 🌟 LOS 3 NO MUTAN el array original. Siempre devuelven uno nuevo (map/filter)
//    o un valor (reduce).
//
// 🌟 Los 3 reciben como argumento una FUNCIÓN CALLBACK.
//    El callback se ejecuta una vez por cada elemento.
//
// ⭐ PROBABILIDAD ALTA DE PARCIAL: estos 3 son lo más usado.
// ==========================================================================

console.log('======== EJERCICIO 04 — map / filter / reduce ========');

// Dataset de ejemplo: catálogo de productos.
// Vamos a operar sobre estos datos durante todo el ejercicio.
const productos = [
    {id: 1, nombre: 'Manzana',  precio: 1500, stock: 20, categoria: 'fruta'},
    {id: 2, nombre: 'Banana',   precio: 1000, stock: 0,  categoria: 'fruta'},
    {id: 3, nombre: 'Pan',      precio: 800,  stock: 15, categoria: 'panaderia'},
    {id: 4, nombre: 'Leche',    precio: 1200, stock: 30, categoria: 'lacteo'},
    {id: 5, nombre: 'Queso',    precio: 4500, stock: 5,  categoria: 'lacteo'},
    {id: 6, nombre: 'Kiwi',     precio: 2000, stock: 12, categoria: 'fruta'},
    {id: 7, nombre: 'Yogur',    precio: 1800, stock: 0,  categoria: 'lacteo'}
];

console.log('Productos iniciales:', productos);


// ==========================================================================
// 1) map: TRANSFORMAR
// ==========================================================================
// Sintaxis: arr.map((elemento, indice, array) => nuevoElemento)
// Devuelve un NUEVO array, mismo tamaño, cada elemento transformado.
//
// El callback DEBE retornar algo. Si no, el nuevo array tendrá undefined.
// ==========================================================================
console.log('\n--- 1) map: TRANSFORMAR ---');

// EJEMPLO 1: extraer solo los nombres (array de strings)
const nombres = productos.map(p => p.nombre);
console.log('Nombres:', nombres);
// → ['Manzana', 'Banana', 'Pan', 'Leche', 'Queso', 'Kiwi', 'Yogur']

// EJEMPLO 2: aplicar un aumento del 20% a todos los precios.
// Devolvemos OBJETOS NUEVOS con spread, sin mutar los originales.
const productosConAumento = productos.map(p => ({
    ...p,
    precio: p.precio * 1.2
}));
console.log('Con +20%:', productosConAumento.slice(0, 2));    // mostramos los 2 primeros

// EJEMPLO 3: formatear como strings legibles
const etiquetas = productos.map(p => `${p.nombre}: $${p.precio}`);
console.log('Etiquetas:', etiquetas);

// EJEMPLO 4: usar el SEGUNDO parámetro (índice) para numerar
const numerados = productos.map((p, i) => `${i + 1}. ${p.nombre}`);
console.log('Numerados:', numerados);

// ⚠️ Productos NO se modificó:
console.log('productos[0] sigue siendo:', productos[0]);


// ==========================================================================
// 2) filter: SELECCIONAR
// ==========================================================================
// Sintaxis: arr.filter((elemento, indice, array) => condicion)
// Devuelve un NUEVO array con los elementos donde el callback retorna true.
//
// El callback DEBE retornar un boolean (o valor truthy/falsy).
// ==========================================================================
console.log('\n--- 2) filter: SELECCIONAR ---');

// EJEMPLO 1: solo las frutas
const frutas = productos.filter(p => p.categoria === 'fruta');
console.log('Frutas:', frutas);

// EJEMPLO 2: productos sin stock (stock === 0)
const sinStock = productos.filter(p => p.stock === 0);
console.log('Sin stock:', sinStock);

// EJEMPLO 3: productos baratos (precio < 1500)
const baratos = productos.filter(p => p.precio < 1500);
console.log('Baratos (< $1500):', baratos);

// EJEMPLO 4: combinar condiciones con && o ||
const lacteosConStock = productos.filter(p =>
    p.categoria === 'lacteo' && p.stock > 0
);
console.log('Lácteos con stock:', lacteosConStock);

// EJEMPLO 5: lo que NO cumple una condición (usar !)
const conStock = productos.filter(p => !(p.stock === 0));
// O más legible:
const conStockLegible = productos.filter(p => p.stock > 0);
console.log('Con stock:', conStockLegible);


// ==========================================================================
// 3) reduce: COMBINAR en UN solo valor
// ==========================================================================
// Sintaxis: arr.reduce((acumulador, elemento, indice, array) => nuevoAcumulador, valorInicial)
//
// Cómo funciona en cada iteración:
//   1ra: acumulador = valorInicial, elemento = arr[0]
//   2da: acumulador = lo que devolvió la 1ra, elemento = arr[1]
//   3ra: acumulador = lo que devolvió la 2da, elemento = arr[2]
//   ... así hasta el final.
//
// El "valorInicial" (segundo argumento) es CLAVE. Sin él, reduce usa arr[0]
// como acumulador inicial → puede traer sorpresas.
//
// reduce es el más versátil. Casi cualquier operación de array se puede
// expresar como reduce (de hecho map y filter se pueden implementar con reduce).
// ==========================================================================
console.log('\n--- 3) reduce: COMBINAR ---');

// EJEMPLO 1 (clásico): SUMA de precios
const totalPrecios = productos.reduce((acc, p) => acc + p.precio, 0);
console.log('Suma de precios:', totalPrecios);

// EJEMPLO 2: total de unidades en stock
const stockTotal = productos.reduce((acc, p) => acc + p.stock, 0);
console.log('Stock total:', stockTotal);

// EJEMPLO 3: valor total de inventario (precio × stock de cada producto)
const inventario = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
console.log('Inventario total: $', inventario);

// EJEMPLO 4: encontrar el MÁS CARO (reduce devuelve un OBJETO, no número)
const masCaro = productos.reduce(
    (caro, p) => (p.precio > caro.precio ? p : caro),
    productos[0]            // valor inicial = primer producto
);
console.log('Más caro:', masCaro);

// EJEMPLO 5: AGRUPAR por categoría (reduce devuelve un OBJETO)
const porCategoria = productos.reduce((grupos, p) => {
    // Si la categoría no existe todavía, crear array vacío
    if (!grupos[p.categoria]) {
        grupos[p.categoria] = [];
    }
    grupos[p.categoria].push(p.nombre);
    return grupos;
}, {});      // valor inicial = objeto vacío
console.log('Por categoría:', porCategoria);
// → { fruta: ['Manzana', 'Banana', 'Kiwi'], panaderia: ['Pan'], lacteo: [...] }

// EJEMPLO 6: CONTAR ocurrencias (cuántos productos por categoría)
const contadorCategorias = productos.reduce((cont, p) => {
    cont[p.categoria] = (cont[p.categoria] || 0) + 1;
    return cont;
}, {});
console.log('Cantidad por categoría:', contadorCategorias);
// → { fruta: 3, panaderia: 1, lacteo: 3 }

// EJEMPLO 7: promedio (combo: sumar y dividir por length)
const precioPromedio = productos.reduce((acc, p) => acc + p.precio, 0) / productos.length;
console.log('Precio promedio:', precioPromedio.toFixed(2));


// ==========================================================================
// 4) CHAINING: combinar map + filter + reduce
// ==========================================================================
// La magia de estos tres es que devuelven arrays, así que podés
// ENCADENARLOS con "." en una sola expresión.
//
// El orden importa: cada paso recibe el resultado del anterior.
// ==========================================================================
console.log('\n--- 4) Chaining (encadenar) ---');

// PROBLEMA: ¿Cuánto vale el total del stock SOLO de las frutas?
// Solución: filtrar frutas → multiplicar precio × stock → sumar todo.

const totalFrutas = productos
    .filter(p => p.categoria === 'fruta')            // 1) solo frutas
    .map(p => p.precio * p.stock)                    // 2) valor por producto
    .reduce((acc, val) => acc + val, 0);             // 3) sumar todo

console.log('Total stock de frutas: $', totalFrutas);


// PROBLEMA 2: lista de nombres de productos con stock, en MAYÚSCULAS,
// ordenados alfabéticamente.

const reporteStock = productos
    .filter(p => p.stock > 0)
    .map(p => p.nombre.toUpperCase())
    .sort();      // sort se puede combinar también
console.log('Productos con stock (MAYÚS, ordenados):', reporteStock);


// PROBLEMA 3: total a pagar si se compra TODO el stock, después de aplicar
// un 15% de descuento.

const totalConDescuento = productos
    .map(p => p.precio * p.stock)                    // valor por producto
    .reduce((acc, v) => acc + v, 0)                  // suma
    * 0.85;                                          // 15% off
console.log('Total con 15% off: $', totalConDescuento.toFixed(2));


// ==========================================================================
// 5) DIFERENCIAS Y CUÁNDO USAR CADA UNO
// ==========================================================================
// CHEAT SHEET:
//
//   ¿Querés transformar cada elemento? → map
//   ¿Querés quedarte con algunos? → filter
//   ¿Querés combinar todos en un valor? → reduce
//   ¿Querés encontrar uno solo? → find (lo viste en ej 03)
//   ¿Querés saber si alguno cumple? → some
//   ¿Querés saber si TODOS cumplen? → every
//   ¿Querés simplemente "hacer algo" sin transformar? → forEach
//
// some y every son útiles y simples:
// ==========================================================================
console.log('\n--- 5) some / every (bonus) ---');

const haySinStock = productos.some(p => p.stock === 0);
console.log('¿Hay alguno sin stock?', haySinStock);     // true

const todosBaratos = productos.every(p => p.precio < 10000);
console.log('¿Todos cuestan menos de $10000?', todosBaratos);   // true

const todosConStock = productos.every(p => p.stock > 0);
console.log('¿Todos tienen stock?', todosConStock);     // false


// ==========================================================================
// 6) TRAMPAS COMUNES (errores que vas a ver en parcial)
// ==========================================================================
console.log('\n--- 6) Trampas comunes ---');

// TRAMPA 1: olvidarse el return en map
//   const malo = productos.map(p => { p.precio * 1.5 });
//   → devuelve [undefined, undefined, ...] porque no hay return.
// SOLUCIÓN: arrow corta SIN llaves, o agregar return explícito.
const bueno = productos.map(p => p.precio * 1.5);
console.log('map correcto:', bueno);

// TRAMPA 2: olvidarse el valor inicial de reduce con tipos distintos
//   .reduce((acc, p) => acc + p.precio)   ← SIN valor inicial
//   La primera iteración usa productos[0] (un OBJETO) como acumulador,
//   y se suma a un number → "[object Object]1500" → desastre.
// SOLUCIÓN: SIEMPRE pasar valor inicial.

// TRAMPA 3: confundir map con forEach
//   forEach devuelve undefined. Si querés un array nuevo → map.
//   Si solo querés "hacer algo" (imprimir, modificar el DOM) → forEach.

// TRAMPA 4: filter con condición invertida
const conPrecio = productos.filter(p => p.precio);
// ↑ devuelve los que tienen precio > 0 (porque 0 es falsy).
// Si tu intención era "todos", filter(() => true) o simplemente no filtrar.


console.log('\n✅ Fin del ejercicio 04. ¡Practicá estos 3 hasta dormirlos!');
