// calculator.js

// Utility: check if operator is valid
function isValidOperator(op) {
  return op === "+" || op === "-" || op === "*" || op === "/" || op === "%";
}

// Utility: compute result
function compute(x, y, op) {
  switch (op) {
    case "+": return x + y;
    case "-": return x - y;
    case "*": return x * y;
    case "/": return x / y;
    case "%": return x % y;
    default: return null;
  }
}

// Store valid numeric results only (exclude errors)
const validResults = [];

// Build results table
document.write("<h2>Results</h2>");
document.write("<table>");
document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");

while (true) {
  // Prompt for x
  const xInput = prompt("Enter the first number (x):");
  if (xInput === null) break;

  // Prompt for y
  const yInput = prompt("Enter the second number (y):");
  if (yInput === null) break;

  // Prompt for operator
  const operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) break;

  // Convert inputs
  const x = Number(xInput);
  const y = Number(yInput);

  let resultDisplay = "";
  let numericResult = null;

  // Validate numbers
  if (isNaN(x) || isNaN(y)) {
    resultDisplay = "Error: x and y must be numeric.";
  }
  // Validate operator
  else if (!isValidOperator(operator)) {
    resultDisplay = "Error: invalid operator.";
  }
  // Extra safety for division/mod by zero
  else if ((operator === "/" || operator === "%") && y === 0) {
    resultDisplay = "Error: cannot divide/mod by zero.";
  }
  // Otherwise compute
  else {
    numericResult = compute(x, y, operator);

    // Handle weird cases (shouldn't happen)
    if (numericResult === null || Number.isNaN(numericResult)) {
      resultDisplay = "Error: computation failed.";
    } else {
      resultDisplay = numericResult;
      validResults.push(numericResult);
    }
  }

  // Add row to results table
  document.write(
    "<tr><td>" + xInput + "</td><td>" + operator + "</td><td>" + yInput + "</td><td>" + resultDisplay + "</td></tr>"
  );
}

document.write("</table>");

// Summary table after loop ends
document.write("<h2>Summary (Valid Results Only)</h2>");

if (validResults.length === 0) {
  document.write("<p>No valid results to summarize.</p>");
} else {
  let total = 0;
  let min = validResults[0];
  let max = validResults[0];

  for (let i = 0; i < validResults.length; i++) {
    const v = validResults[i];
    total += v;
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const avg = total / validResults.length;

  document.write("<table>");
  document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");
  document.write(
    "<tr><td>" + min + "</td><td>" + max + "</td><td>" + avg + "</td><td>" + total + "</td></tr>"
  );
  document.write("</table>");
}
