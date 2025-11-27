# Calculadora simple (HTML, CSS, JavaScript)

Archivos incluidos:
- `index.html` — Interfaz de la calculadora
- `styles.css` — Estilos responsivos y accesibles
- `app.js` — Lógica (tokenizador, shunting-yard y evaluación RPN)

Instrucciones rápidas:

- Abrir localmente: doble clic en `index.html` o servir la carpeta con un servidor estático.
- Soporta entrada por teclado: dígitos, `.` , `+ - * /`, `Enter` = calcular, `Backspace` = borrar, `Escape` = limpiar.

Detalles técnicos:

- No se usa `eval()`.
- `app.js` implementa un tokenizer que reconoce números decimales y signo unario para negativos, luego convierte infix a RPN (shunting-yard) y evalúa la RPN.
- Muestra errores claros en la pantalla (por ejemplo, "División por cero" o "Expresión inválida").

Dónde colocar los archivos:

- Coloca los cuatro archivos en la misma carpeta (por ejemplo: la carpeta raíz del proyecto). Abrir `index.html` carga `styles.css` y `app.js` automáticamente.

Pruebas (opcional):

- El objeto global `window.Calculator` expone las funciones `tokenize`, `toRPN`, `evalRPN` y `evaluateExpression` para pruebas manuales o unitarias.

Ejemplo rápido en la consola del navegador:

```js
console.log(window.Calculator.evaluateExpression('3+4*2/ (1 -5)'))
```

Nota: el ejemplo con paréntesis no se soporta explícitamente en la UI actual (el parser básico no maneja paréntesis), pero las funciones expuestas permiten extender el parser si se desea.
