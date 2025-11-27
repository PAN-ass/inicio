/* ========================================
   ANALIZADOR DE TEXTO - JAVASCRIPT
   ======================================== */

// ===== REFERENCIAS AL DOM =====
const textArea = document.getElementById('textArea');
const caracteresTotales = document.getElementById('caracteresTotales');
const caracteresSinEspacios = document.getElementById('caracteresSinEspacios');
const numeroPalabras = document.getElementById('numeroPalabras');
const numeroOraciones = document.getElementById('numeroOraciones');
const tiempoLectura = document.getElementById('tiempoLectura');
const promedioFPO = document.getElementById('promedioFPO');

const limpiarBtn = document.getElementById('limpiarBtn');
const copiarEstadisticasBtn = document.getElementById('copiarEstadisticasBtn');
const notificacion = document.getElementById('notificacion');

// ========================================
// FUNCIÓN: Contar caracteres totales
// Propósito: Contar todos los caracteres incluyendo espacios y puntuación
// Parámetros: texto - string a analizar
// Retorna: number - cantidad de caracteres
// ========================================
function contarCaracteres(texto) {
    try {
        // Retornar la longitud del texto tal como está
        return texto.length;
    } catch (error) {
        console.error('Error al contar caracteres:', error);
        return 0;
    }
}

// ========================================
// FUNCIÓN: Contar caracteres sin espacios
// Propósito: Contar caracteres excluyendo espacios en blanco
// Parámetros: texto - string a analizar
// Retorna: number - cantidad de caracteres sin espacios
// ========================================
function contarCaracteresSinEspacios(texto) {
    try {
        // Eliminar todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
        const textoSinEspacios = texto.replace(/\s/g, '');
        return textoSinEspacios.length;
    } catch (error) {
        console.error('Error al contar caracteres sin espacios:', error);
        return 0;
    }
}

// ========================================
// FUNCIÓN: Contar palabras
// Propósito: Contar el número de palabras considerando espacios múltiples
// Parámetros: texto - string a analizar
// Retorna: number - cantidad de palabras
// ========================================
function contarPalabras(texto) {
    try {
        // Validar que el texto no esté vacío
        if (!texto || texto.trim().length === 0) {
            return 0;
        }

        // Separar por espacios en blanco (incluyendo múltiples espacios)
        // \s+ captura uno o más espacios en blanco consecutivos
        const palabras = texto.trim().split(/\s+/);

        // Filtrar palabras vacías (en caso de que existan)
        const palabrasFiltradas = palabras.filter(palabra => palabra.length > 0);

        return palabrasFiltradas.length;
    } catch (error) {
        console.error('Error al contar palabras:', error);
        return 0;
    }
}

// ========================================
// FUNCIÓN: Contar oraciones
// Propósito: Contar oraciones basadas en puntos, interrogaciones y exclamaciones
// Parámetros: texto - string a analizar
// Retorna: number - cantidad de oraciones
// ========================================
function contarOraciones(texto) {
    try {
        // Validar que el texto no esté vacío
        if (!texto || texto.trim().length === 0) {
            return 0;
        }

        // Buscar terminadores de oraciones: . ! ?
        // [.!?] coincide con cualquiera de estos caracteres
        // g = búsqueda global (todas las ocurrencias)
        const oraciones = texto.match(/[.!?]+/g);

        // Si no hay oraciones encontradas, retornar 0
        // Si hay, retornar la cantidad de coincidencias
        return oraciones ? oraciones.length : 0;
    } catch (error) {
        console.error('Error al contar oraciones:', error);
        return 0;
    }
}

// ========================================
// FUNCIÓN: Calcular tiempo de lectura
// Propósito: Estimar el tiempo necesario para leer el texto (200 palabras/minuto)
// Parámetros: numPalabras - número total de palabras
// Retorna: string - tiempo formateado (ej: "2 min 30 seg")
// ========================================
function calcularTiempoLectura(numPalabras) {
    try {
        // Velocidad de lectura estándar: 200 palabras por minuto
        const VELOCIDAD_LECTURA = 200;

        // Si no hay palabras, retornar "0 seg"
        if (numPalabras === 0) {
            return '0 seg';
        }

        // Calcular tiempo en segundos
        const tiempoSegundos = (numPalabras / VELOCIDAD_LECTURA) * 60;

        // Si el tiempo es menor a 1 minuto, mostrar solo segundos
        if (tiempoSegundos < 60) {
            return Math.ceil(tiempoSegundos) + ' seg';
        }

        // Calcular minutos y segundos restantes
        const minutos = Math.floor(tiempoSegundos / 60);
        const segundos = Math.ceil(tiempoSegundos % 60);

        // Si los segundos son 60, sumar a minutos
        if (segundos === 60) {
            return (minutos + 1) + ' min';
        }

        // Retornar formato "X min Y seg"
        return minutos + ' min ' + segundos + ' seg';
    } catch (error) {
        console.error('Error al calcular tiempo de lectura:', error);
        return '0 seg';
    }
}

// ========================================
// FUNCIÓN: Calcular promedio de palabras por oración
// Propósito: Obtener el promedio de palabras que contiene cada oración
// Parámetros: numPalabras - número de palabras
//            numOraciones - número de oraciones
// Retorna: string - promedio redondeado a 2 decimales
// ========================================
function calcularPromedioPalabrasXOracion(numPalabras, numOraciones) {
    try {
        // Si no hay oraciones, retornar 0
        if (numOraciones === 0) {
            return '0';
        }

        // Calcular el promedio
        const promedio = (numPalabras / numOraciones).toFixed(2);

        return promedio;
    } catch (error) {
        console.error('Error al calcular promedio:', error);
        return '0';
    }
}

// ========================================
// FUNCIÓN: Actualizar estadísticas
// Propósito: Recalcular y actualizar todas las estadísticas en tiempo real
// Parámetros: ninguno (obtiene datos del textarea)
// Retorna: undefined
// ========================================
function actualizarEstadisticas() {
    try {
        // Obtener el texto del textarea
        const texto = textArea.value;

        // Calcular todas las métricas
        const caracteres = contarCaracteres(texto);
        const caracteresSinEsp = contarCaracteresSinEspacios(texto);
        const palabras = contarPalabras(texto);
        const oraciones = contarOraciones(texto);
        const tiempoLect = calcularTiempoLectura(palabras);
        const promedio = calcularPromedioPalabrasXOracion(palabras, oraciones);

        // Actualizar elementos en el DOM con animación
        actualizarElemento(caracteresTotales, caracteres);
        actualizarElemento(caracteresSinEspacios, caracteresSinEsp);
        actualizarElemento(numeroPalabras, palabras);
        actualizarElemento(numeroOraciones, oraciones);
        actualizarElemento(tiempoLectura, tiempoLect);
        actualizarElemento(promedioFPO, promedio);

        // Log para debugging
        console.log(`Análisis de texto: ${caracteres} caracteres, ${palabras} palabras, ${oraciones} oraciones`);
    } catch (error) {
        console.error('Error al actualizar estadísticas:', error);
        mostrarMensajeError('Error al procesar el texto');
    }
}

// ========================================
// FUNCIÓN: Actualizar elemento con animación
// Propósito: Cambiar el valor de un elemento y aplicar animación
// Parámetros: elemento - elemento del DOM a actualizar
//            valor - nuevo valor a mostrar
// Retorna: undefined
// ========================================
function actualizarElemento(elemento, valor) {
    try {
        // Verificar si el valor cambió
        if (elemento.textContent !== String(valor)) {
            // Cambiar el texto
            elemento.textContent = valor;

            // Aplicar clase de animación
            elemento.classList.remove('actualizado');
            // Triggear reflow para reiniciar la animación
            void elemento.offsetWidth;
            elemento.classList.add('actualizado');
        }
    } catch (error) {
        console.error('Error al actualizar elemento:', error);
    }
}

// ========================================
// FUNCIÓN: Limpiar todo
// Propósito: Resetear el textarea y todas las estadísticas
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function limpiar() {
    try {
        // Limpiar el textarea
        textArea.value = '';

        // Resetear todas las estadísticas a 0
        caracteresTotales.textContent = '0';
        caracteresSinEspacios.textContent = '0';
        numeroPalabras.textContent = '0';
        numeroOraciones.textContent = '0';
        tiempoLectura.textContent = '0 seg';
        promedioFPO.textContent = '0';

        // Enfocar el textarea para continuar escribiendo
        textArea.focus();

        console.log('✓ Texto y estadísticas limpiados');
    } catch (error) {
        console.error('Error al limpiar:', error);
        mostrarMensajeError('Error al limpiar el contenido');
    }
}

// ========================================
// FUNCIÓN: Copiar estadísticas al portapapeles
// Propósito: Generar un texto con las estadísticas y copiarlo
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function copiarEstadisticas() {
    try {
        // Obtener los valores actuales
        const caracteres = caracteresTotales.textContent;
        const caracteresSinEsp = caracteresSinEspacios.textContent;
        const palabras = numeroPalabras.textContent;
        const oraciones = numeroOraciones.textContent;
        const tiempo = tiempoLectura.textContent;
        const promedio = promedioFPO.textContent;

        // Crear el texto a copiar
        const estadisticasTexto = 
            `ESTADÍSTICAS DEL TEXTO\n` +
            `═════════════════════════════════════════\n` +
            `📊 Caracteres (con espacios): ${caracteres}\n` +
            `✏️  Caracteres (sin espacios): ${caracteresSinEsp}\n` +
            `💬 Palabras: ${palabras}\n` +
            `📌 Oraciones: ${oraciones}\n` +
            `⏱️  Tiempo de lectura: ${tiempo}\n` +
            `📈 Promedio palabras/oración: ${promedio}\n` +
            `═════════════════════════════════════════\n` +
            `Generado con Analizador de Texto`;

        // Usar Clipboard API para copiar
        navigator.clipboard.writeText(estadisticasTexto).then(() => {
            // Mostrar notificación de éxito
            mostrarNotificacion();
            console.log('✓ Estadísticas copiadas al portapapeles');
        }).catch(() => {
            // Si Clipboard API falla, intentar método alternativo
            copiarPorSeleccion(estadisticasTexto);
        });
    } catch (error) {
        console.error('Error al copiar estadísticas:', error);
        mostrarMensajeError('Error al copiar las estadísticas');
    }
}

// ========================================
// FUNCIÓN: Copiar por selección (fallback)
// Propósito: Método alternativo para copiar usando execCommand
// Parámetros: texto - texto a copiar
// Retorna: undefined
// ========================================
function copiarPorSeleccion(texto) {
    try {
        // Crear un elemento temporal
        const elementoTemporal = document.createElement('textarea');
        elementoTemporal.value = texto;
        document.body.appendChild(elementoTemporal);

        // Seleccionar el texto
        elementoTemporal.select();

        // Ejecutar comando de copia
        document.execCommand('copy');

        // Eliminar el elemento temporal
        document.body.removeChild(elementoTemporal);

        // Mostrar notificación
        mostrarNotificacion();
    } catch (error) {
        console.error('Error en método alternativo de copia:', error);
        mostrarMensajeError('No se pudo copiar las estadísticas');
    }
}

// ========================================
// FUNCIÓN: Mostrar notificación de éxito
// Propósito: Mostrar mensaje temporal indicando que se copiaron las estadísticas
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function mostrarNotificacion() {
    try {
        // Agregar clase para mostrar
        notificacion.classList.add('mostrar');

        // Remover la clase después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    } catch (error) {
        console.error('Error al mostrar notificación:', error);
    }
}

// ========================================
// FUNCIÓN: Mostrar mensaje de error
// Propósito: Mostrar mensaje de error en la consola y potencialmente en la UI
// Parámetros: mensaje - texto del error
// Retorna: undefined
// ========================================
function mostrarMensajeError(mensaje) {
    try {
        console.error('❌ ' + mensaje);
        // Aquí se podría añadir una UI para mostrar el error al usuario
    } catch (error) {
        console.error('Error al mostrar mensaje de error:', error);
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Escuchar cambios en el textarea (actualización en tiempo real)
textArea.addEventListener('input', actualizarEstadisticas);

// Escuchar cuando el usuario entra al textarea
textArea.addEventListener('focus', () => {
    console.log('✓ Usuario enfocado en el textarea');
});

// Escuchar cuando el usuario sale del textarea
textArea.addEventListener('blur', () => {
    console.log('✓ Usuario salió del textarea');
});

// Botón: Limpiar
limpiarBtn.addEventListener('click', () => {
    limpiar();
});

// Botón: Copiar estadísticas
copiarEstadisticasBtn.addEventListener('click', () => {
    // Validar que haya contenido antes de copiar
    if (textArea.value.trim().length === 0) {
        mostrarMensajeError('No hay contenido para copiar');
        return;
    }
    copiarEstadisticas();
});

// Prevenir comportamiento por defecto en ciertas teclas
textArea.addEventListener('keydown', (evento) => {
    // Por si se quiere añadir comportamientos especiales
    if (evento.ctrlKey || evento.metaKey) {
        if (evento.key === 'a') {
            // Ctrl+A: seleccionar todo (comportamiento estándar)
            console.log('Seleccionar todo');
        }
    }
});

// ========================================
// INICIALIZACIÓN
// ========================================

// Actualizar estadísticas al cargar la página
actualizarEstadisticas();

// Enfocar el textarea automáticamente
textArea.focus();

console.log('✓ Analizador de Texto cargado correctamente');
