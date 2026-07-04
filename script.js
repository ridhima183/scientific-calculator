const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let expression = '';
let history = '';
let justEvaluated = false;

function updateDisplay() {
  display.textContent = expression || '0';
  historyDisplay.textContent = history;
}

function clearAll() {
  expression = '';
  history = '';
  justEvaluated = false;
  updateDisplay();
}

function appendValue(value) {
  if (justEvaluated) {
    expression = '';
    justEvaluated = false;
  }
  expression += value;
  updateDisplay();
}

function appendOperator(op) {
  if (expression === '' && op !== '-') return;
  if (justEvaluated) justEvaluated = false;
  expression += op;
  updateDisplay();
}

function addFunction(fn) {
  if (justEvaluated) {
    expression = '';
    justEvaluated = false;
  }
  expression += fn;
  updateDisplay();
}

function deleteLast() {
  if (justEvaluated) {
    justEvaluated = false;
  }
  expression = expression.slice(0, -1);
  updateDisplay();
}

function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function replaceScientific(expr) {
  let e = expr
    .replace(/÷/g, '/')
    .replace(/×/g, '*')
    .replace(/−/g, '-')
    .replace(/π/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/(\d+(\.\d+)?)%/g, '($1/100)')
    .replace(/(\d+(\.\d+)?)!/g, 'factorial($1)')
    .replace(/(\d+(\.\d+)?)²/g, '($1**2)')
    .replace(/\^/g, '**');

  return e;
}

function calculateResult() {
  if (!expression.trim()) return;

  try {
    history = expression + ' =';
    let jsExpr = replaceScientific(expression);

    const result = new Function('factorial', `return ${jsExpr}`)(factorial);

    if (!Number.isFinite(result)) {
      display.textContent = 'Error';
      expression = '';
      justEvaluated = true;
      return;
    }

    const rounded = Math.round(result * 1e10) / 1e10;
    expression = String(rounded);
    justEvaluated = true;
    updateDisplay();
  } catch (error) {
    display.textContent = 'Error';
    expression = '';
    justEvaluated = true;
    history = '';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
      appendValue(value);
      return;
    }

    switch (action) {
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteLast();
        break;
      case 'percent':
        appendValue('%');
        break;
      case 'divide':
        appendOperator('÷');
        break;
      case 'multiply':
        appendOperator('×');
        break;
      case 'subtract':
        appendOperator('−');
        break;
      case 'add':
        appendOperator('+');
        break;
      case 'power':
        appendValue('^');
        break;
      case 'square':
        appendValue('²');
        break;
      case 'pi':
        appendValue('π');
        break;
      case 'e':
        appendValue('e');
        break;
      case 'factorial':
        appendValue('!');
        break;
      case 'open-paren':
        appendValue('(');
        break;
      case 'close-paren':
        appendValue(')');
        break;
      case 'sin':
        addFunction('sin(');
        break;
      case 'cos':
        addFunction('cos(');
        break;
      case 'tan':
        addFunction('tan(');
        break;
      case 'log':
        addFunction('log(');
        break;
      case 'ln':
        addFunction('ln(');
        break;
      case 'sqrt':
        addFunction('sqrt(');
        break;
      case 'equals':
        calculateResult();
        break;
    }
  });
});

updateDisplay();