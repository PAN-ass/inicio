import java.util.Scanner;
public class Main {

// Función que convierte un valor a número y valida que sea un número válido
function convertirANumero(valor) {
    // Intentamos convertir la entrada a número usando Number
    var num = Number(valor);
    // isNaN devuelve true si num no es un número válido
    if (isNaN(num)) {
        // Lanzamos un error con mensaje claro para quien use la función
        throw new Error("Entrada inválida: se esperaba un número, recibí '" + valor + "'");
    }
    // Devolvemos el número convertido
    return num;
}

// Función que suma dos valores (sin usar sintaxis avanzada ES6)
function sumar(a, b) {
    // Convertimos la primera entrada a número por seguridad
    var n1 = convertirANumero(a);
    // Convertimos la segunda entrada a número por seguridad
    var n2 = convertirANumero(b);
    // Calculamos la suma de los dos números
    var resultado = n1 + n2;
    // Devolvemos el resultado de la suma
    return resultado;
}

// Ejemplos de uso (probar en la consola del navegador o en Node.js)
try {
    console.log("Sumar 3 + 4 =", sumar(3, 4));         // 7
    console.log("Sumar '5' + '2' =", sumar("5", "2")); // 7 (convierte cadenas a números)
} catch (e) {
    // Si ocurre un error, mostramos el mensaje en consola
    console.error(e.message);
}

public static void main(String[] args) {
	// 1) Definición concisa (1-2 frases)
	System.out.println("1) Definición concisa:");
	System.out.println("Una variable es un nombre que guarda un valor para que el programa lo use.");
	System.out.println();

	// 2) Analogía detallada
	System.out.println("2) Analogía detallada (caja = variable):");
	System.out.println("- Caja = variable: un contenedor donde guardas algo.");
	System.out.println("- Etiqueta = nombre: la marca que te dice qué hay dentro de la caja.");
	System.out.println("- Contenido = valor: lo que realmente está dentro de la caja.");
	System.out.println("- Cerrar/abrir = asignar/leer: pones algo en la caja (asignar) o lo sacas para verlo (leer).");
	System.out.println("- Mover la caja = reasignar: cambias lo que hay dentro o mueves la caja a otro lugar.");
	System.out.println("- Caja vacía = null/undefined: la etiqueta existe pero no hay contenido dentro.");
	System.out.println();
	System.out.println("Tres ejemplos cotidianos:");
	System.out.println("1. Mudanza: una caja etiquetada 'libros' contiene libros; si la vacías y pones ropa, la reasignaste.");
	System.out.println("2. Cocina: un frasco etiquetado 'azúcar' contiene azúcar; si está vacío es como null.");
	System.out.println("3. Oficina: una carpeta con etiqueta 'facturas' guarda documentos; cambiar su contenido es reasignar.");
	System.out.println();

	// 3) Mini-ejemplo en pseudocódigo (2-3 líneas)
	System.out.println("3) Mini-ejemplo en pseudocódigo:");
	System.out.println("var caja;           // declarar");
	System.out.println("caja = \"libros\";  // asignar");
	System.out.println("caja = \"ropa\";    // reasignar");
	System.out.println();

	// 4) Frase final
	System.out.println("4) Resumen:");
	System.out.println("Ver una variable como una caja con etiqueta ayuda a entender cómo se guarda, cambia y lee la información.");
}
}