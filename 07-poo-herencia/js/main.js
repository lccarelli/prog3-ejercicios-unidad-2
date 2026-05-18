// ==========================================================================
// EJERCICIO 07 — POO: herencia, get/set y "clases abstractas"
// ==========================================================================
//
// 📚 APRENDIZAJES DE ESTE ARCHIVO:
//   1) HERENCIA: una clase puede extender de otra con "extends".
//   2) "super()" para llamar al constructor de la clase padre.
//   3) "super.metodo()" para llamar a un método heredado.
//   4) OVERRIDE: redefinir un método heredado en la clase hija.
//   5) GETTERS y SETTERS: propiedades calculadas + validación al asignar.
//   6) CLASES ABSTRACTAS (JS no las tiene nativas, simulación con throw
//      en el constructor).
//   7) POLIMORFISMO: tratar a clases distintas con la misma interfaz.
//
// 💡 La herencia es MUY común en parciales. Saber escribir una jerarquía
//    simple (Persona → Estudiante / Profesor) es fundamental.
// ==========================================================================

console.log('======== EJERCICIO 07 — POO: HERENCIA Y GET/SET ========');


// ==========================================================================
// 1) CLASE BASE (la "padre")
// ==========================================================================
// Persona define lo común a todas las personas: nombre, apellido, edad.
// Más adelante, Estudiante y Profesor van a HEREDAR de esta clase.
// ==========================================================================
console.log('\n--- 1) Clase base: Persona ---');

class Persona {
    // Campos privados para encapsular y poder validar con setters.
    #nombre;
    #apellido;
    #edad;

    constructor(nombre, apellido, edad) {
        // ⛔ "Clase abstracta" simulada:
        // Persona NO debería instanciarse directamente, solo a través de sus
        // hijas. Si alguien intenta "new Persona(...)" tiramos error.
        // JS no tiene clases abstractas nativas, así que esto es el truco.
        if (new.target === Persona) {
            throw new Error('Persona es una clase abstracta. Usá Estudiante o Profesor.');
        }
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
    }

    // ==================================================
    // GETTERS y SETTERS
    // ==================================================
    // GETTER (get):
    //   - Permite definir una "propiedad calculada".
    //   - Se ACCEDE como propiedad, SIN paréntesis: persona.nombreCompleto
    //   - Sirve para EXPONER datos privados o calcular algo al vuelo.
    //
    // SETTER (set):
    //   - Se llama al ASIGNAR un valor: persona.nombre = "X".
    //   - Sirve para VALIDAR el valor antes de aceptarlo.
    //
    // El patrón "campo privado #x + getter + setter" es la forma
    // profesional de proteger datos en JS.

    get nombre() { return this.#nombre; }
    set nombre(valor) {
        if (typeof valor !== 'string' || valor.trim() === '') {
            throw new Error('Nombre inválido');
        }
        this.#nombre = valor.trim();
    }

    get apellido() { return this.#apellido; }
    set apellido(valor) {
        if (typeof valor !== 'string' || valor.trim() === '') {
            throw new Error('Apellido inválido');
        }
        this.#apellido = valor.trim();
    }

    get edad() { return this.#edad; }
    set edad(valor) {
        if (typeof valor !== 'number' || valor < 0 || valor > 130) {
            throw new Error('Edad inválida (debe ser 0-130)');
        }
        this.#edad = valor;
    }

    // PROPIEDAD CALCULADA: nombre + apellido. Se accede SIN paréntesis.
    get nombreCompleto() {
        return `${this.#nombre} ${this.#apellido}`;
    }

    // Método que las clases hijas pueden REUSAR o REDEFINIR (override)
    presentarse() {
        return `Hola, soy ${this.nombreCompleto} y tengo ${this.#edad} años.`;
    }
}


// ==========================================================================
// 2) HERENCIA con extends + super()
// ==========================================================================
// extends:  "Estudiante hereda de Persona".
// super():  llama al constructor de la clase padre. ES OBLIGATORIO en el
//           constructor de una clase hija, ANTES de usar this.
// super.metodo(): llama a un método del padre desde la hija.
// ==========================================================================
console.log('\n--- 2) Estudiante extends Persona ---');

class Estudiante extends Persona {
    #legajo;
    notas = [];

    constructor(nombre, apellido, edad, legajo) {
        // OBLIGATORIO: llamar a super() antes de usar this.
        super(nombre, apellido, edad);
        this.#legajo = legajo;
    }

    get legajo() { return this.#legajo; }

    agregarNota(n) {
        if (n < 0 || n > 10) {
            throw new Error('La nota debe estar entre 0 y 10');
        }
        this.notas.push(n);
    }

    get promedio() {
        if (this.notas.length === 0) return 0;
        return this.notas.reduce((a, b) => a + b, 0) / this.notas.length;
    }

    // OVERRIDE: redefinimos presentarse() de la clase padre.
    // ⚠️ También usamos super.presentarse() para reutilizar el mensaje base
    //    y agregarle algo nuevo. Es lo más limpio.
    presentarse() {
        return `${super.presentarse()} Soy estudiante con legajo ${this.#legajo}.`;
    }
}

const laura = new Estudiante('Laura', 'Carelli', 26, 'LC-2024');
laura.agregarNota(8);
laura.agregarNota(9);
laura.agregarNota(7);

console.log(laura.presentarse());
console.log('Promedio:', laura.promedio.toFixed(2));


// ==========================================================================
// 3) OTRA CLASE QUE HEREDA: Profesor
// ==========================================================================
console.log('\n--- 3) Profesor extends Persona ---');

class Profesor extends Persona {
    #materias;
    #antiguedad;

    constructor(nombre, apellido, edad, materias = [], antiguedad = 0) {
        super(nombre, apellido, edad);
        this.#materias = materias;
        this.#antiguedad = antiguedad;
    }

    get materias() { return [...this.#materias]; }     // copia para no exponer el array original
    get antiguedad() { return this.#antiguedad; }

    agregarMateria(materia) {
        this.#materias.push(materia);
    }

    // Override: como en Estudiante, pero con info distinta.
    presentarse() {
        return `${super.presentarse()} Soy profesor de ${this.#materias.join(', ')}.`;
    }
}

const ian = new Profesor('Ian', 'Oliva', 40, ['Programación III'], 8);
ian.agregarMateria('Análisis de Datos');
console.log(ian.presentarse());
console.log('Materias:', ian.materias);


// ==========================================================================
// 4) CLASE ABSTRACTA en acción
// ==========================================================================
// Si intentamos instanciar Persona directamente, debe tirar error.
// ==========================================================================
console.log('\n--- 4) Clase "abstracta" (no se puede instanciar directo) ---');

try {
    const p = new Persona('X', 'Y', 30);
    console.log(p);
} catch (error) {
    console.log('✅ Tiró error como esperábamos:', error.message);
}


// ==========================================================================
// 5) GETTERS y SETTERS en acción
// ==========================================================================
// Los usamos como si fueran propiedades, pero por debajo se ejecuta una función.
// ==========================================================================
console.log('\n--- 5) Getters y setters ---');

// GETTER: accedemos como propiedad
console.log('Nombre completo:', laura.nombreCompleto);   // sin paréntesis

// SETTER: asignamos con =
laura.edad = 27;                                          // pasa por el set edad
console.log('Edad después de asignar 27:', laura.edad);

// El SETTER valida: si pasamos algo inválido, tira error.
try {
    laura.edad = -5;
} catch (e) {
    console.log('✅ Validación de edad funcionó:', e.message);
}

try {
    laura.nombre = '';
} catch (e) {
    console.log('✅ Validación de nombre funcionó:', e.message);
}


// ==========================================================================
// 6) POLIMORFISMO
// ==========================================================================
// Polimorfismo = "muchas formas". Distintas clases pueden tener el MISMO
// método (presentarse), pero cada una lo implementa a su manera. Eso nos
// permite tratarlas de forma uniforme.
//
// Ejemplo: un array mezcla Estudiantes y Profesores. Recorremos llamando
// a presentarse() en todos, y cada uno responde con SU versión.
// ==========================================================================
console.log('\n--- 6) Polimorfismo ---');

const personas = [
    new Estudiante('Ana', 'Pérez', 22, 'AP-2025'),
    new Profesor('Maximiliano', 'Neiner', 38, ['JS', 'CSS'], 10),
    new Estudiante('Juan', 'López', 24, 'JL-2024')
];

personas.forEach(p => console.log(p.presentarse()));

// Otro ejemplo: filtrar por tipo con instanceof
const soloEstudiantes = personas.filter(p => p instanceof Estudiante);
console.log('Solo estudiantes:', soloEstudiantes.map(e => e.nombreCompleto));


// ==========================================================================
// 7) CADENA DE HERENCIA
// ==========================================================================
// Una clase puede heredar de otra que a su vez hereda. JS busca el método
// PRIMERO en la clase de la instancia, después en la padre, después en la
// abuela... hasta llegar a Object (todos los objetos heredan de Object).
//
// instanceof devuelve true para TODAS las clases de la cadena.
// ==========================================================================
console.log('\n--- 7) Cadena de herencia ---');

class EstudianteAvanzado extends Estudiante {
    constructor(nombre, apellido, edad, legajo, area) {
        super(nombre, apellido, edad, legajo);
        this.area = area;
    }

    // Override que agrega más info al de Estudiante (que a su vez agregaba al de Persona)
    presentarse() {
        return `${super.presentarse()} Estoy haciendo mi tesis en ${this.area}.`;
    }
}

const tesista = new EstudianteAvanzado('Sofía', 'Diaz', 28, 'SD-2020', 'Inteligencia Artificial');
console.log(tesista.presentarse());
// → "Hola, soy Sofía Diaz y tengo 28 años. Soy estudiante con legajo SD-2020.
//    Estoy haciendo mi tesis en Inteligencia Artificial."

// instanceof a lo largo de la cadena
console.log('tesista instanceof EstudianteAvanzado:', tesista instanceof EstudianteAvanzado); // true
console.log('tesista instanceof Estudiante:', tesista instanceof Estudiante);                 // true
console.log('tesista instanceof Persona:', tesista instanceof Persona);                       // true
console.log('tesista instanceof Object:', tesista instanceof Object);                         // true


// ==========================================================================
// 8) RESUMEN para parcial: ¿qué evaluar?
// ==========================================================================
// 1) Crear una clase con constructor y métodos.
// 2) Hacer que una clase extienda de otra con extends.
// 3) Usar super() en el constructor de la hija.
// 4) Hacer override de un método.
// 5) Usar getters/setters para encapsular y validar.
// 6) Saber qué hace "new" y qué es "this".
// 7) Diferencia entre instanceof y typeof.
//
// Patrón mental para el parcial:
//   - Si dos clases comparten lógica → poné lo común en una clase base.
//   - Si un campo debería ser inmutable o validado → usá getter/setter
//     con campo privado.

console.log('\n✅ Fin del ejercicio 07.');
