// app.js - Lógica de la calculadora
// Implementa tokenizador, shunting-yard y evaluación de RPN

(function () {
  'use strict';

  // Selectores UI
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const keys = document.querySelector('.keys');

  // Estado actual de la expresión (string)
  let expression = '';

  // UTILIDADES
  function isOperator(ch) {
    return ['+', '-', '*', '/'].includes(ch);
  }

  // Tokenizador: convierte string en tokens (números y operadores)
  // Maneja números decimales y signo unario (-)
  function tokenize(expr) {
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];
      if (ch === ' ') { i++; continue; }

      // número (posible signo unario)
      if (ch === '.' || /[0-9]/.test(ch) || (ch === '-' && (i === 0 || isOperator(expr[i-1])))) {
        let j = i;
        let numStr = '';
        // capture leading '-' for unary minus
        if (expr[j] === '-') { numStr += '-'; j++; }
        let hasDot = false;
        while (j < expr.length && (/[0-9]/.test(expr[j]) || expr[j] === '.')) {
          if (expr[j] === '.') {
            if (hasDot) break; // segundo punto -> termina número aquí
            hasDot = true;
          }
          numStr += expr[j];
          j++;
        }
        if (numStr === '-' || numStr === '.' || numStr === '-.') {
          throw new Error('Número inválido en la expresión');
        }
        tokens.push({ type: 'number', value: parseFloat(numStr) });
        i = j;
        continue;
      }

      // operadores
      if (isOperator(ch)) {
        tokens.push({ type: 'operator', value: ch });
        i++;
        continue;
      }

      // cualquier otro carácter no esperado
      throw new Error('Carácter no válido: ' + ch);
    }
    return tokens;
  }

  // Shunting-yard: infix -> RPN (postfix)
  function toRPN(tokens) {
    const output = [];
    const ops = [];
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };

    for (const token of tokens) {
      if (token.type === 'number') {
        output.push(token);
      } else if (token.type === 'operator') {
        while (ops.length > 0 && prec[ops[ops.length-1].value] >= prec[token.value]) {
          output.push(ops.pop());
        }
        ops.push(token);
      }
    }

    while (ops.length > 0) output.push(ops.pop());
    return output;
  }

  // Evalúa una expresión en RPN
  function evalRPN(rpn) {
    const stack = [];
    for (const token of rpn) {
      if (token.type === 'number') stack.push(token.value);
      else if (token.type === 'operator') {
        if (stack.length < 2) throw new Error('Expresión inválida');
        const b = stack.pop();
        const a = stack.pop();
        let res;
        switch (token.value) {
          case '+': res = a + b; break;
          case '-': res = a - b; break;
          case '*': res = a * b; break;
          case '/':
            if (b === 0) throw new Error('División por cero');
            res = a / b; break;
          default:
            throw new Error('Operador desconocido: ' + token.value);
        }
        stack.push(res);
      }
    }
    if (stack.length !== 1) throw new Error('Expresión inválida');
    return stack[0];
  }

  // Evalúa expresión string usando los pasos anteriores
  function evaluateExpression(expr) {
    const tokens = tokenize(expr);
    const rpn = toRPN(tokens);
    return evalRPN(rpn);
  }

  // UI helpers
  function updateScreen() {
    expressionEl.textContent = expression || '0';
    resultEl.classList.remove('error');
  }

  function showResult(value) {
    resultEl.textContent = String(value);
    resultEl.classList.remove('error');
  }

  function showError(msg) {
    resultEl.textContent = msg;
    resultEl.classList.add('error');
  }

  // Input handling from buttons and keyboard
  function handleInputValue(val) {
    // Digits and dot
    if (/[0-9.]/.test(val)) {
      // Prevent multiple dots in the current number
      const lastNumberMatch = expression.match(/-?[0-9]*\.?[0-9]*$/);
      const lastNum = lastNumberMatch ? lastNumberMatch[0] : '';
      if (val === '.' && lastNum.includes('.')) return; // ignore second dot
      expression += val;
      updateScreen();
      return;
    }

    // Operators
    if (isOperator(val)) {
      // allow unary minus at start or after operator
      if (expression === '' && val === '-') {
        expression = '-'; updateScreen(); return;
      }

      // Prevent two consecutive operators (except allow unary minus after another operator)
      const lastChar = expression.slice(-1);
      if (isOperator(lastChar)) {
        // if last is operator and user typed '-', allow unary minus
        if (val === '-' && lastChar !== '-') {
          expression += '-'; updateScreen(); return;
        }
        // otherwise replace the last operator
        expression = expression.slice(0, -1) + val;
        updateScreen();
        return;
      }

      expression += val; updateScreen(); return;
    }
  }

  // Calculate current expression
  function calculate() {
    if (!expression) return;
    try {
      const value = evaluateExpression(expression);
      showResult(value);
      expression = String(value); // allow chaining
      updateScreen();
    } catch (err) {
      showError(err.message);
    }
  }

  // Clear and backspace
  function clearAll() {
    expression = '';
    updateScreen();
    resultEl.textContent = '';
  }

  function backspace() {
    if (expression.length > 0) expression = expression.slice(0, -1);
    updateScreen();
  }

  // Event listeners
  keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    if (action === 'clear') { clearAll(); return; }
    if (action === 'backspace') { backspace(); return; }
    if (action === 'equals') { calculate(); return; }
    if (value) handleInputValue(value);
  });

  // Keyboard input support
  document.addEventListener('keydown', (e) => {
    // Allow digits, ., operators
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      e.preventDefault(); handleInputValue(e.key); return;
    }
    if (['+','-','*','/'].includes(e.key)) { e.preventDefault(); handleInputValue(e.key); return; }
    if (e.key === 'Enter') { e.preventDefault(); calculate(); return; }
    if (e.key === 'Backspace') { e.preventDefault(); backspace(); return; }
    if (e.key === 'Escape') { e.preventDefault(); clearAll(); return; }
  });

  // Initialize
  updateScreen();

  // Expose for testing/debug if needed
  window.Calculator = {
    tokenize,
    toRPN,
    evalRPN,
    evaluateExpression,
  };

})();
