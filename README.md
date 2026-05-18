# Ejercicios - Unidad 2 (Programación III)

Práctica progresiva sobre los contenidos de la **Unidad 2**: JavaScript desde lo básico hasta DOM + eventos.

Material base: PDFs ubicados en `../unidad_2/`.

## Cómo usar estos ejercicios

1. Entrá a la carpeta del ejercicio que toque.
2. Cada uno tiene `index.html` + `js/main.js` (y `css/styles.css` cuando aplica).
3. Abrí `index.html` en el navegador. Para ejercicios 01-07 lo más útil es **abrir la consola** (F12 → Console) porque muchos resultados se imprimen ahí.
4. Leé los **comentarios en el código**: cada bloque explica qué concepto se aplica y por qué.

## Orden sugerido

| # | Ejercicio | Temas principales |
|---|---|---|
| 01 | [Fundamentos JS](./01-fundamentos/) | Variables, tipos, operadores, template literals, `typeof` |
| 02 | [Funciones](./02-funciones/) | Declaration, arrow functions, default params, rest, spread |
| 03 | [Arrays — métodos clásicos](./03-arrays-clasicos/) | push, pop, shift, unshift, join, indexOf, includes, find |
| 04 | [map / filter / reduce](./04-map-filter-reduce/) | Los 3 métodos más importantes (alta probabilidad parcial) |
| 05 | [JSON y objetos](./05-json-objetos/) | parse, stringify, manipulación de objetos |
| 06 | [POO — clases básicas](./06-poo-clases/) | class, constructor, métodos, this |
| 07 | [POO — herencia y get/set](./07-poo-herencia/) | extends, super, getters/setters, abstracción |
| 08 | [DOM y eventos](./08-dom-eventos/) | querySelector, addEventListener, innerHTML, formularios |

## Convenciones

- Cada ejercicio es **independiente** y autoejecutable.
- Para ejercicios 01-07 el HTML es **mínimo** (solo carga el `<script>` y muestra un título); lo importante está en `main.js`.
- Para ejercicio 08 el HTML tiene UI real porque vamos a manipularla.
- En todos los archivos hay comentarios pedagógicos: secciones marcadas con `=========` y explicación del concepto antes del código.

## Relación con la práctica de fruteria

Muchos conceptos los aplicamos en `practica-fruteria/`. Acá los vemos **uno por uno y aislados**, para que cuando los uses en una app compleja sepas exactamente qué hace cada cosa.

**Lo NUEVO respecto a fruteria**: POO con clases (ej 06 y 07). Eso no apareció en la práctica del profe pero está en el PDF de la unidad.
