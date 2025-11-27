//EJERCICIO: DETECTOR DE PALINDROMOS
//Objetivo: crea una logica compleja encapsulada en una funcion 
//Un palidromo es una palabra o frace que se lee igual hacia adelante que hacia atras
//Ejemplos de palidromos: "anilina", "reconocer", "oso", "ojo"
//crea una funcion llamada esPalindromo que reciba un texto y retorne true si es palindromo y false si no lo es
function esPalindromo(texto) {
    //Elimina espacios y convierte a minusculas
    const textoLimpio = texto.replace(/\s+/g, '').toLowerCase();
    //Invierte el texto
    const textoInvertido = textoLimpio.split('').reverse().join('');
    //Compara el texto limpio con el texto invertido
    return textoLimpio === textoInvertido;
}