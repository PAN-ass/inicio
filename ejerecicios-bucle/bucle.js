// ejericio: Arrasys y Objetivos
// 1.Arrays (Listas)
// Crea una lista de tus comidas favoritas.
const comidasFavoritas = ["Pizza", "sushi", "tacos"];
// Como agrego un elemento a un array en JS
comidasFavoritas.push("Hamburguesa");
//muestro la lista en consola
console.log("comidasFavoritas:", comidasFavoritas);

// 2. Objetos (Diccionarios/Fichas)
// Crea un objeto que te represente a ti (nombre, edad, si te gusta programar).
let alumno = {
    nombre: "Francisco",
    edad: 17,
    programador: true,
    habilidades: ["JavaScript", "Python", "C++"],
    estatura: 1.56
};

//Como accedo a la propiedad nombre de un objeto alumno
console.log("Nombre del alumno es:", alumno.nombre);
console.log("Habilidad 1 del alumno es:", alumno.habilidades[0]);
console.log("Estatura del alumno es:", alumno.estatura);
console.log("Pogramador: ", alumno.programador);

// 3.array de objetos 
// crea unalista de 3 alumnos (objetos) con nombre y calificacion
const listaAlumnos = [
    { nombre: "Ana", calificacion: 85 },
    { nombre: "Luis", calificacion: 92
},
    {nombre: "Maria", calificacion: 78 }
];

// escribir un bucle que rrecora el array de alumnos e imprima solo los que aprovaron (>80)
