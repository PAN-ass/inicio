/**
 * Calcula el área de un círculo dado su radio.
 *
 * Explicación: Aplica la fórmula A = π · r². El parámetro `radio` se espera como número
 * y debería ser mayor o igual a 0 para representar un radio válido.
 *
 * @param {number} radio - Radio del círculo en las unidades deseadas (>= 0).
 * @returns {number} Área del círculo en unidades cuadradas.
 *
 * @example
 * // Área de un círculo de radio 3
 * // devuelve aproximadamente 28.274333882308138
 * areaCirculo(3);
 */

/**
 * Calcula el área de un rectángulo dada su base y altura.
 *
 * Explicación: Multiplica la base por la altura (A = base · altura). Ambos parámetros se
 * esperan como números y normalmente deben ser >= 0.
 *
 * @param {number} base - Longitud de la base en las unidades deseadas.
 * @param {number} altura - Altura en las mismas unidades.
 * @returns {number} Área del rectángulo en unidades cuadradas.
 *
 * @example
 * // Área de un rectángulo de base 5 y altura 2
 * // devuelve 10
 * areaRectangulo(5, 2);
 */

/**
 * Calcula el volumen de un cilindro reutilizando la función que calcula el área de la base.
 *
 * Explicación: Primero obtiene el área de la base circular mediante `areaCirculo(radio)`
 * y luego multiplica por la altura para obtener el volumen (V = áreaBase · altura = π · r² · h).
 * Es aconsejable pasar valores numéricos no negativos para `radio` y `altura`.
 *
 * @param {number} radio - Radio de la base del cilindro en las unidades deseadas (>= 0).
 * @param {number} altura - Altura del cilindro en las mismas unidades (>= 0).
 * @returns {number} Volumen del cilindro en unidades cúbicas.
 *
 * @example
 * // Volumen de un cilindro de radio 2 y altura 5
 * // devuelve aproximadamente 62.83185307179586
 * calcularVolumenCilindro(2, 5);
 */
//Ejercicio: area y volumenes 
//Objetivo crear multiples funciones y reutilizables
//Crear una funcion para calcular el area de un circulo dado su radio 
function areaCirculo(radio){
    return Math.PI * Math.pow(radio, 2);
}
//Crea una funcion para calcular el area de un rectangulo dado su base y altura
function areaRectangulo(base, altura){
    return base * altura; 
}
//Crear una funcion para calcular el volumen de un cilindro
//Crea la funcion 'calularVolumenCilindro' reuitilizando la funcion 'areaCirculo'
function calcularVolumenCilindro(radio, altura){
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}