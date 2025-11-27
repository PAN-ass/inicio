/**
 * Función para convertir temperaturas de Celsius a Fahrenheit y Kelvin
 * @param {number} celsius - Temperatura en grados Celsius
 * @returns {object} Objeto con las conversiones a Fahrenheit y Kelvin
 */
function convertirTemperatura(celsius) {
  // Validar que el input sea un número válido
  if (typeof celsius !== 'number' || isNaN(celsius)) {
    return { error: 'Por favor ingresa un número válido' };
  }

  // Fórmula para convertir Celsius a Fahrenheit: (C × 9/5) + 32
  const fahrenheit = (celsius * 9/5) + 32;

  // Fórmula para convertir Celsius a Kelvin: C + 273.15
  const kelvin = celsius + 273.15;

  // Retornar un objeto con todos los valores redondeados a 2 decimales
  return {
    celsius: Math.round(celsius * 100) / 100,
    fahrenheit: Math.round(fahrenheit * 100) / 100,
    kelvin: Math.round(kelvin * 100) / 100
  };
}

/**
 * Función auxiliar para mostrar la conversión de forma legible
 * @param {number} celsius - Temperatura en Celsius
 */
function mostrarConversion(celsius) {
  const resultado = convertirTemperatura(celsius);
  
  // Verificar si hay error
  if (resultado.error) {
    console.log(`❌ ${resultado.error}`);
    return;
  }

  // Mostrar el resultado formateado
  console.log(`
╔════════════════════════════════════════╗
║      CONVERSOR DE TEMPERATURAS         ║
╠════════════════════════════════════════╣
║ Celsius:    ${resultado.celsius}°C
║ Fahrenheit: ${resultado.fahrenheit}°F
║ Kelvin:     ${resultado.kelvin} K
╚════════════════════════════════════════╝
  `);
}

// ========== EJEMPLOS DE USO ==========

// Ejemplo 1: Convertir 0°C (punto de congelación del agua)
console.log('--- Ejemplo 1: Agua congelada (0°C) ---');
console.log(convertirTemperatura(0));
mostrarConversion(0);

// Ejemplo 2: Convertir 100°C (punto de ebullición del agua)
console.log('\n--- Ejemplo 2: Agua hirviendo (100°C) ---');
console.log(convertirTemperatura(100));
mostrarConversion(100);

// Ejemplo 3: Convertir temperatura corporal normal (37°C)
console.log('\n--- Ejemplo 3: Temperatura corporal (37°C) ---');
console.log(convertirTemperatura(37));
mostrarConversion(37);

// Ejemplo 4: Convertir temperatura negativa (-40°C)
console.log('\n--- Ejemplo 4: Temperatura muy fría (-40°C) ---');
console.log(convertirTemperatura(-40));
mostrarConversion(-40);

// Ejemplo 5: Intentar convertir un valor inválido
console.log('\n--- Ejemplo 5: Valor inválido ---');
console.log(convertirTemperatura('texto'));
mostrarConversion('texto');
