// calculator.js

const rows = [];
const validResults = [];

let continueLoop = true;

while (continueLoop) {
  const xInput = prompt("Enter the first number (x):");
  if (xInput === null) { continueLoop = false; break; }

  const yInput = prompt("Enter the second number (y):");
  if (yInput === null) { continueLoop = false; break; }

  const op = prompt("Enter an operator (+, -, *, /, %):");
  if (op === null) { continueLoop = false; break; }

  const x = xInput.trim();
  const y = yInput.trim();
  const operator = op.trim();

  let result;
  let isError = false;

  if (isNaN(x) || isNaN(y) || x === "" || y === "") {
    result = "wrong input number";
    isError = true;
  } else if (!["+", "-", "*", "/", "%"].includes(operator)) {
    result = "computation error";
    isError = true;
  } else {
    const nx = parseFloat(x);
    const ny = parseFloat(y);
    switch (operator) {
      case "+": result = nx + ny; break;
      case "-": result = nx - ny; break;
      case "*": result = nx * ny; break;
      case "/": result = ny !== 0 ? nx / ny : "computation error"; isError = ny === 0; break;
      case "%": result = ny !== 0 ? nx % ny : "computation error"; isError = ny === 0; break;
    }
  }

  rows.push({ x, y, operator, result, isError });
  if (!isError) validResults.push(result);
}

// Build the page
const min = validResults.length ? Math.min(...validResults) : "N/A";
const max = validResults.length ? Math.max(...validResults) : "N/A";
const total = validResults.length ? validResults.reduce((a, b) => a + b, 0) : "N/A";
const avg = validResults.length ? parseFloat((total / validResults.length).toFixed(2)) : "N/A";

document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator Results</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0f0f13;
      --surface: #1a1a24;
      --surface2: #22223a;
      --accent: #f5a623;
      --accent2: #e05c2a;
      --text: #f0eee8;
      --muted: #7a7a9a;
      --error-bg: #2a1010;
      --error-text: #ff6b6b;
      --valid-bg: #0f1e20;
      --valid-text: #5ddcb0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      padding: 2rem;
      background-image: radial-gradient(ellipse at 20% 20%, #1e1030 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 80%, #0a1520 0%, transparent 50%);
    }
    header {
      margin-bottom: 3rem;
      border-left: 4px solid var(--accent);
      padding-left: 1.2rem;
    }
    header h1 {
      font-family: 'Space Mono', monospace;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: var(--accent);
      letter-spacing: -0.02em;
    }
    header p {
      color: var(--muted);
      font-size: 0.9rem;
      margin-top: 0.3rem;
      font-weight: 300;
    }
    .section-title {
      font-family: 'Space Mono', monospace;
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 1rem;
    }
    .section-title span {
      color: var(--accent);
      margin-right: 0.5rem;
    }
    .table-wrap {
      overflow-x: auto;
      margin-bottom: 3rem;
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: var(--surface);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 40px rgba(0,0,0,0.4);
    }
    thead th {
      background: var(--surface2);
      font-family: 'Space Mono', monospace;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent);
      padding: 1rem 1.4rem;
      text-align: left;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    tbody tr {
      transition: background 0.15s;
    }
    tbody tr:hover {
      background: rgba(255,255,255,0.03);
    }
    tbody tr:not(:last-child) td {
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    td {
      padding: 0.9rem 1.4rem;
      font-size: 0.95rem;
    }
    td.num {
      font-family: 'Space Mono', monospace;
      color: #a0b4ff;
    }
    td.op {
      font-family: 'Space Mono', monospace;
      font-size: 1.1rem;
      color: var(--accent);
      text-align: center;
    }
    td.result-ok {
      font-family: 'Space Mono', monospace;
      color: var(--valid-text);
      font-weight: 700;
    }
    td.result-err {
      color: var(--error-text);
      font-style: italic;
      font-size: 0.85rem;
    }
    .no-data {
      text-align: center;
      padding: 3rem;
      color: var(--muted);
      font-style: italic;
    }
    .summary-table table {
      max-width: 600px;
    }
    .summary-table thead th {
      text-align: center;
    }
    .summary-table td {
      text-align: center;
      font-family: 'Space Mono', monospace;
      font-size: 1.1rem;
      color: var(--accent2);
      font-weight: 700;
    }
  </style>
</head>
<body>
  <header>
    <h1>// Calculator Results</h1>
    <p>${rows.length} operation${rows.length !== 1 ? "s" : ""} computed &mdash; ${validResults.length} valid result${validResults.length !== 1 ? "s" : ""}</p>
  </header>

  <p class="section-title"><span>01</span> Operations Log</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>x</th>
          <th>op</th>
          <th>y</th>
          <th>result</th>
        </tr>
      </thead>
      <tbody>
        ${rows.length === 0
          ? `<tr><td colspan="4" class="no-data">No operations were performed.</td></tr>`
          : rows.map(r => `
        <tr>
          <td class="num">${r.x}</td>
          <td class="op">${r.operator}</td>
          <td class="num">${r.y}</td>
          <td class="${r.isError ? "result-err" : "result-ok"}">${r.result}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>

  <p class="section-title"><span>02</span> Summary</p>
  <div class="table-wrap summary-table">
    <table>
      <thead>
        <tr>
          <th>Min</th>
          <th>Max</th>
          <th>Average</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${min}</td>
          <td>${max}</td>
          <td>${avg}</td>
          <td>${total}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>`);