// Tab Switch Logic
function showTab(tabName) {
    document.getElementById('calculator').style.display = (tabName === 'calculator') ? 'block' : 'none';
    document.getElementById('graph').style.display = (tabName === 'graph') ? 'block' : 'none';
}

// Calculator Logic
function append(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

// Graph Plot Logic
let chart = null;

function plotGraph() {
    const equation = document.getElementById('equationInput').value;
    const xValues = [];
    const yValues = [];

    for (let x = -50; x <= 50; x += 1) {
        xValues.push(x);
        try {
            const y = eval(equation.replace(/x/g, `(${x})`));
            yValues.push(y);
        } catch {
            yValues.push(null);
        }
    }

    const ctx = document.getElementById('graphCanvas').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: `y = ${equation}`,
                data: yValues,
                borderColor: '#4f46e5',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'X' } },
                y: { title: { display: true, text: 'Y' } }
            }
        }
    });
}
