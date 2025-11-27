/* ========================================
   RELOJ DIGITAL CON ALARMA - JAVASCRIPT
   ======================================== */

// ===== VARIABLES GLOBALES =====
let alarmaActiva = false;           // Indica si hay una alarma configurada
let horaAlarmaConfigurada = null;   // Almacena la hora configurada (formato HH:MM)
let alarmaYaSonada = false;         // Previene que la alarma suene múltiples veces

// ===== REFERENCIAS AL DOM =====
const relojDisplay = document.getElementById('relojDisplay');
const fechaDisplay = document.getElementById('fechaDisplay');
const horaAlarmaInput = document.getElementById('horaAlarma');
const establecerBtn = document.getElementById('establecerBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const notificacion = document.getElementById('notificacion');
const cerrarAlarmaBtn = document.getElementById('cerrarAlarmaBtn');
const alarmaOverlay = document.getElementById('alarmaOverlay');

// ========================================
// FUNCIÓN: Obtener hora actual formateada
// Propósito: Actualizar el display del reloj con HH:MM:SS
// Parámetros: ninguno
// Retorna: string en formato HH:MM:SS
// ========================================
function obtenerHoraActual() {
    const ahora = new Date();
    const horas = agregarCero(ahora.getHours());
    const minutos = agregarCero(ahora.getMinutes());
    const segundos = agregarCero(ahora.getSeconds());
    
    return `${horas}:${minutos}:${segundos}`;
}

// ========================================
// FUNCIÓN: Agregar cero a la izquierda
// Propósito: Formatear números de una cifra con cero
// Parámetros: numero - número a formatear
// Retorna: string con dos dígitos (ej: "05" para 5)
// ========================================
function agregarCero(numero) {
    return numero < 10 ? '0' + numero : numero;
}

// ========================================
// FUNCIÓN: Obtener fecha actual en español
// Propósito: Mostrar fecha con nombres de meses en español
// Parámetros: ninguno
// Retorna: string con formato "Día, DD de Mes de YYYY"
// ========================================
function obtenerFechaEnEspanol() {
    const ahora = new Date();
    
    // Array con nombres de días en español
    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    
    // Array con nombres de meses en español
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const nombreDia = dias[ahora.getDay()];
    const dia = agregarCero(ahora.getDate());
    const nombreMes = meses[ahora.getMonth()];
    const año = ahora.getFullYear();
    
    // Capitalizar primer carácter del día
    const nombreDiaCapitalizado = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
    
    return `${nombreDiaCapitalizado}, ${dia} de ${nombreMes} de ${año}`;
}

// ========================================
// FUNCIÓN: Actualizar displays (reloj y fecha)
// Propósito: Refrescar la hora y fecha cada segundo
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function actualizarDisplays() {
    relojDisplay.textContent = obtenerHoraActual();
    fechaDisplay.textContent = obtenerFechaEnEspanol();
}

// ========================================
// FUNCIÓN: Validar que hora de alarma sea futura
// Propósito: Evitar configurar alarmas para horas pasadas
// Parámetros: horaAlarma - string en formato HH:MM
// Retorna: boolean (true si es futura, false si no)
// ========================================
function esHoraFutura(horaAlarma) {
    // Obtener hora actual en formato HH:MM
    const ahora = new Date();
    const horaActual = agregarCero(ahora.getHours()) + ':' + agregarCero(ahora.getMinutes());
    
    // Comparar como strings (funciona porque formato HH:MM permite comparación lexicográfica)
    return horaAlarma > horaActual;
}

// ========================================
// FUNCIÓN: Establecer alarma
// Propósito: Configurar una nueva alarma
// Parámetros: ninguno (obtiene valor del input)
// Retorna: undefined
// ========================================
function establecerAlarma() {
    const horaSeleccionada = horaAlarmaInput.value;
    
    // Validar que se haya seleccionado una hora
    if (!horaSeleccionada) {
        alert('Por favor, selecciona una hora para la alarma');
        return;
    }
    
    // Validar que la hora sea futura
    if (!esHoraFutura(horaSeleccionada)) {
        alert('La hora de la alarma debe ser futura (posterior a la hora actual)');
        return;
    }
    
    // Guardar la hora configurada
    horaAlarmaConfigurada = horaSeleccionada;
    alarmaActiva = true;
    alarmaYaSonada = false;
    
    // Actualizar interfaz
    actualizarEstadoAlarma();
    
    // Feedback visual
    console.log(`✓ Alarma configurada para las ${horaSeleccionada}`);
}

// ========================================
// FUNCIÓN: Cancelar alarma
// Propósito: Desactivar la alarma configurada
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function cancelarAlarma() {
    alarmaActiva = false;
    horaAlarmaConfigurada = null;
    alarmaYaSonada = false;
    
    // Limpiar input
    horaAlarmaInput.value = '';
    
    // Actualizar interfaz
    actualizarEstadoAlarma();
    
    // Ocultar notificación si estaba visible
    ocultarNotificacion();
    
    console.log('✓ Alarma cancelada');
}

// ========================================
// FUNCIÓN: Actualizar estado visual de alarma
// Propósito: Reflejar en la interfaz si hay alarma activa
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function actualizarEstadoAlarma() {
    if (alarmaActiva && horaAlarmaConfigurada) {
        // Alarma activa: mostrar indicador verde pulsante
        statusIndicator.classList.add('active');
        statusIndicator.classList.remove('inactive');
        statusText.textContent = `Alarma activa: ${horaAlarmaConfigurada}`;
        statusText.style.color = '#00ff00';
    } else {
        // Alarma inactiva: indicador gris
        statusIndicator.classList.remove('active');
        statusIndicator.classList.add('inactive');
        statusText.textContent = 'Sin alarma activa';
        statusText.style.color = '#00d4ff';
    }
}

// ========================================
// FUNCIÓN: Mostrar notificación de alarma
// Propósito: Activar la notificación visual cuando suena la alarma
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function mostrarNotificacion() {
    notificacion.classList.add('activa');
    alarmaOverlay.classList.add('activa');
    
    // Sonido de alarma (simulado con alert)
    // En un proyecto real, aquí se reproduciría un archivo de audio
    reproducirSonidoAlarma();
    
    console.log('🔔 ¡¡¡ALARMA SONANDO!!!');
}

// ========================================
// FUNCIÓN: Ocultar notificación de alarma
// Propósito: Desactivar la notificación visual
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function ocultarNotificacion() {
    notificacion.classList.remove('activa');
    alarmaOverlay.classList.remove('activa');
}

// ========================================
// FUNCIÓN: Reproducir sonido de alarma
// Propósito: Generar un sonido usando Web Audio API o alert
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function reproducirSonidoAlarma() {
    try {
        // Intentar usar Web Audio API para generar sonido
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear osciladores para generar un sonido tipo "alerta"
        const oscilador = audioContext.createOscillator();
        const ganancia = audioContext.createGain();
        
        oscilador.connect(ganancia);
        ganancia.connect(audioContext.destination);
        
        // Configurar frecuencia y duración
        oscilador.frequency.value = 800; // Frecuencia en Hz
        oscilador.type = 'sine';
        
        // Bajar volumen para no ser muy agresivo
        ganancia.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Reproducir durante 2 segundos
        oscilador.start(audioContext.currentTime);
        oscilador.stop(audioContext.currentTime + 2);
        
    } catch (error) {
        // Si Web Audio no funciona, usar alert como fallback
        alert('¡ALARMA! La hora programada ha llegado.');
    }
}

// ========================================
// FUNCIÓN: Comparar hora actual con alarma
// Propósito: Detectar cuándo debe sonar la alarma
// Parámetros: ninguno
// Retorna: undefined
// ========================================
function verificarAlarma() {
    // Solo verificar si hay una alarma activa
    if (!alarmaActiva || !horaAlarmaConfigurada) {
        return;
    }
    
    // Obtener hora actual en formato HH:MM
    const ahora = new Date();
    const horaActualFormato = agregarCero(ahora.getHours()) + ':' + agregarCero(ahora.getMinutes());
    
    // Comparar con hora configurada
    if (horaActualFormato === horaAlarmaConfigurada && !alarmaYaSonada) {
        // Marcar que la alarma ya sonó (para no repetir)
        alarmaYaSonada = true;
        
        // Mostrar notificación
        mostrarNotificacion();
        
        // Desactivar automáticamente después de que el usuario la cierre
        // (se gestiona mediante el botón de cerrar)
    }
}

// ========================================
// EVENT LISTENERS - BOTONES
// ========================================

// Botón: Establecer Alarma
establecerBtn.addEventListener('click', establecerAlarma);

// Botón: Cancelar Alarma
cancelarBtn.addEventListener('click', cancelarAlarma);

// Botón: Cerrar notificación de alarma
cerrarAlarmaBtn.addEventListener('click', () => {
    ocultarNotificacion();
    cancelarAlarma();
});

// Permitir establecer alarma con Enter en el input
horaAlarmaInput.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        establecerAlarma();
    }
});

// ========================================
// INICIALIZACIÓN
// ========================================

// Actualizar displays inmediatamente
actualizarDisplays();

// Actualizar reloj cada segundo
setInterval(() => {
    actualizarDisplays();
    // También verificar la alarma cada segundo
    verificarAlarma();
}, 1000);

console.log('✓ Reloj Digital con Alarma cargado correctamente');
