// ==========================================================================
// EJERCICIO 06 — POO: Clases básicas
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) ¿Qué es POO? Por qué usar clases en vez de solo objetos literales.
//   2) Sintaxis de class + constructor.
//   3) Propiedades de instancia y "this".
//   4) Métodos.
//   5) Crear instancias con "new".
//   6) Métodos y propiedades ESTÁTICOS (static).
//   7) Campos PRIVADOS (#) — protección de datos.
//
// 💡 Este tema NO apareció en la práctica de fruteria pero está en el PDF
//    de la unidad. Es muy probable que sea evaluado.
//
// 💡 Concepto general: una CLASE es un "molde" para crear OBJETOS con la
//    misma estructura y comportamiento. Los objetos creados se llaman
//    INSTANCIAS.
//
// Ejemplo del mundo real: la clase "Auto" describe qué propiedades tiene
// y qué puede hacer un auto. Cada auto que sale de la fábrica es una
// INSTANCIA de la clase Auto.
// ==========================================================================

console.log('======== EJERCICIO 06 — POO: CLASES BÁSICAS ========');


// ==========================================================================
// 1) DEFINICIÓN DE UNA CLASE
// ==========================================================================
// Sintaxis básica:
//
//   class Nombre {
//       constructor(params) {
//           this.propiedad = params;
//       }
//
//       metodo() {
//           ...
//       }
//   }
//
// CONVENCIÓN: los nombres de clase van en PascalCase (primera letra
// mayúscula): Estudiante, Producto, Auto, Cuenta.
// ==========================================================================
console.log('\n--- 1) Clase Estudiante ---');

class Estudiante {
    // CAMPOS de instancia (alternativa moderna a usar this.xxx en el constructor).
    // Acá podés declarar las propiedades y opcionalmente darles un valor default.
    notas = [];                          // por defecto, array vacío

    // CAMPO PRIVADO: empieza con #. Solo accesible DESDE DENTRO de la clase.
    // Aprendizaje clave para parcial: encapsulamiento.
    #dni;

    // CAMPO ESTÁTICO: pertenece a la CLASE, no a las instancias.
    // Lo usamos como "contador" general (cuántos estudiantes se crearon).
    static cantidadCreados = 0;

    // CONSTRUCTOR: función especial que se ejecuta automáticamente al crear
    // una instancia con "new".
    // Acá inicializamos las propiedades del objeto.
    constructor(nombre, apellido, dni) {
        this.nombre = nombre;             // this = la instancia que se está creando
        this.apellido = apellido;
        this.#dni = dni;                  // campo privado
        Estudiante.cantidadCreados++;     // incrementamos el contador estático
    }

    // MÉTODO: función que vive dentro de la clase.
    // NO se escribe la palabra "function".
    // Para que un método "vea" las propiedades de la instancia, se usa this.
    presentarse() {
        return `Hola, soy ${this.nombre} ${this.apellido}`;
    }

    // Método que modifica la instancia (agrega una nota a "this.notas")
    agregarNota(nota) {
        if (nota < 0 || nota > 10) {
            console.warn('⚠️ La nota debe estar entre 0 y 10. No se agregó.');
            return;
        }
        this.notas.push(nota);
    }

    // Método que calcula y retorna un valor (sin modificar nada)
    obtenerPromedio() {
        if (this.notas.length === 0) return 0;
        const suma = this.notas.reduce((acc, n) => acc + n, 0);
        return suma / this.notas.length;
    }

    estaAprobado() {
        // Aprobado si tiene >= 4 promedio
        return this.obtenerPromedio() >= 4;
    }

    // Acceso al campo privado SOLO desde dentro de la clase
    obtenerDniCensurado() {
        // Mostramos solo los últimos 3 dígitos por seguridad
        const dniStr = String(this.#dni);
        return `***${dniStr.slice(-3)}`;
    }

    // MÉTODO ESTÁTICO: pertenece a la clase, no a la instancia.
    // Se llama como Estudiante.metodo(), NO como instancia.metodo().
    // Útil para "utilidades" relacionadas con la clase.
    static crearAnonimo() {
        return new Estudiante('Anónimo', 'Sin Apellido', '00000000');
    }
}


// ==========================================================================
// 2) CREAR INSTANCIAS con "new"
// ==========================================================================
// El operador "new" hace 4 cosas internas:
//   1) Crea un objeto vacío {}.
//   2) Lo asigna a "this".
//   3) Ejecuta el constructor.
//   4) Devuelve ese objeto.
//
// Cada llamada a "new" crea una INSTANCIA NUEVA E INDEPENDIENTE.
// ==========================================================================
console.log('\n--- 2) Crear instancias ---');

const laura = new Estudiante('Laura', 'Carelli', 32523394);
const juan = new Estudiante('Juan', 'Pérez', 30123456);

console.log('laura:', laura);
console.log('juan:', juan);

console.log('Cantidad creados:', Estudiante.cantidadCreados);  // 2


// ==========================================================================
// 3) USAR LOS MÉTODOS
// ==========================================================================
console.log('\n--- 3) Usar métodos ---');

console.log(laura.presentarse());   // 'Hola, soy Laura Carelli'
console.log(juan.presentarse());    // 'Hola, soy Juan Pérez'

// Cargar notas
laura.agregarNota(8);
laura.agregarNota(9);
laura.agregarNota(7);
juan.agregarNota(3);
juan.agregarNota(5);

console.log('Notas Laura:', laura.notas);                    // [8, 9, 7]
console.log('Promedio Laura:', laura.obtenerPromedio());     // 8
console.log('Laura aprobada?', laura.estaAprobado());        // true

console.log('Promedio Juan:', juan.obtenerPromedio());       // 4
console.log('Juan aprobado?', juan.estaAprobado());          // true

// Validación: intentar agregar una nota inválida
laura.agregarNota(15);   // ⚠️ warning


// ==========================================================================
// 4) CAMPOS PRIVADOS (#)
// ==========================================================================
// El # marca el campo como verdaderamente privado:
//   - NO se puede acceder desde fuera de la clase.
//   - Ni siquiera podés "leerlo" con instancia.#dni → error.
//
// Encapsulamiento: ocultar detalles internos y exponer solo lo necesario.
// ==========================================================================
console.log('\n--- 4) Campos privados ---');

console.log('DNI censurado:', laura.obtenerDniCensurado());  // '***394'

// Intentar acceder al campo privado desde afuera tira error:
// console.log(laura.#dni);   // ❌ SyntaxError: Private field '#dni' must be...

// laura.dni también es undefined (sin error):
console.log('laura.dni (sin #):', laura.dni);                // undefined


// ==========================================================================
// 5) MÉTODOS ESTÁTICOS
// ==========================================================================
// Se llaman SIN crear una instancia. Útiles para:
//   - Contadores.
//   - "Factory methods" (crear instancias de forma controlada).
//   - Utilidades relacionadas con la clase (validar email, parsear datos, etc.).
// ==========================================================================
console.log('\n--- 5) Estáticos ---');

const anonimo = Estudiante.crearAnonimo();   // factory method
console.log('Anónimo:', anonimo);
console.log('Cantidad creados ahora:', Estudiante.cantidadCreados);  // 3

// laura.crearAnonimo()  ← ❌ no existe en instancias, solo en la clase


// ==========================================================================
// 6) typeof y instanceof
// ==========================================================================
// Para preguntar "¿de qué tipo es esto?":
//   typeof variable → string con el tipo primitivo.
//   variable instanceof Clase → true si la variable es instancia de esa clase.
//
// Para clases SIEMPRE usá instanceof. typeof solo te dice "object".
// ==========================================================================
console.log('\n--- 6) typeof vs instanceof ---');

console.log('typeof laura:', typeof laura);                  // 'object'
console.log('laura instanceof Estudiante:', laura instanceof Estudiante);  // true
console.log('"hola" instanceof Estudiante:', 'hola' instanceof Estudiante); // false


// ==========================================================================
// 7) ¿POR QUÉ USAR CLASES? (vs solo objetos literales)
// ==========================================================================
// Sin clases, podríamos hacer algo así:
const otroEstudiante = {
    nombre: 'Juan',
    apellido: 'Pérez',
    notas: [],
    agregarNota(n) { this.notas.push(n); },
    obtenerPromedio() {
        return this.notas.reduce((a, b) => a + b, 0) / this.notas.length;
    }
};

// El PROBLEMA: cada vez que quiero un estudiante, tengo que REPETIR todo
// el código. Las clases nos dan un "molde" para crear muchas instancias
// con la misma forma y los mismos métodos.
//
// BENEFICIOS:
//   - DRY (Don't Repeat Yourself): no repetir código.
//   - Encapsulamiento: datos y métodos juntos.
//   - Herencia: una clase puede heredar de otra (lo veremos en el ej 07).
//   - Polimorfismo: tratar a distintas clases de la misma forma.


// ==========================================================================
// 8) APLICACIÓN: lista de estudiantes
// ==========================================================================
// Vamos a crear varios estudiantes, cargarles notas, y usar map/filter/reduce
// (¡del ej 04!) para obtener estadísticas.
// ==========================================================================
console.log('\n--- 7) Aplicación: lista de estudiantes ---');

const ana = new Estudiante('Ana', 'García', 28456789);
ana.agregarNota(6);
ana.agregarNota(8);
ana.agregarNota(9);

const beto = new Estudiante('Beto', 'López', 35987654);
beto.agregarNota(2);
beto.agregarNota(3);
beto.agregarNota(5);

const cami = new Estudiante('Cami', 'Ruiz', 41234567);
cami.agregarNota(10);
cami.agregarNota(10);
cami.agregarNota(9);

const curso = [ana, beto, cami];

// map: nombre + promedio
const promedios = curso.map(e => ({
    nombre: e.nombre,
    promedio: e.obtenerPromedio()
}));
console.log('Promedios:', promedios);

// filter: aprobados
const aprobados = curso.filter(e => e.estaAprobado());
console.log('Aprobados:', aprobados.map(e => e.nombre));

// reduce: promedio del curso entero
const promedioCurso = curso.reduce((acc, e) => acc + e.obtenerPromedio(), 0) / curso.length;
console.log('Promedio del curso:', promedioCurso.toFixed(2));


// ==========================================================================
// 9) PATRÓN: clase con propiedades "calculadas" (preview de get/set)
// ==========================================================================
// Adelantamos un poco el ejercicio 07: getters.
// Un getter permite definir una propiedad CALCULADA que se accede como si
// fuera un campo normal (sin paréntesis).
// ==========================================================================
console.log('\n--- 8) Preview: getter ---');

class Circulo {
    constructor(radio) {
        this.radio = radio;
    }

    // GETTER: se accede como propiedad, no como método.
    // Lo usaremos a fondo en el ejercicio 07.
    get area() {
        return Math.PI * this.radio ** 2;
    }

    get perimetro() {
        return 2 * Math.PI * this.radio;
    }
}

const c = new Circulo(5);
console.log('Radio:', c.radio);
console.log('Área:', c.area.toFixed(2));        // sin paréntesis ← es un getter
console.log('Perímetro:', c.perimetro.toFixed(2));


console.log('\n✅ Fin del ejercicio 06.');
