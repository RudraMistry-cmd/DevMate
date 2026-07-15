const input = document.getElementById('jsonInput');
const output = document.getElementById('jsonOutput');

async function processJSON(action) {
    if (!input.value.trim()) {
        output.value = 'Please enter JSON to process.';
        return;
    }

    try {
        const response = await fetch('/json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input.value, action })
        });

        const data = await response.json();

        if (data.success) {
            output.value = data.output;
        } else {
            output.value = data.error || 'Something went wrong.';
        }
    } catch (error) {
        output.value = `Request failed: ${error.message}`;
    }
}

function clearFields() {
    input.value = '';
    output.value = '';
}

async function copyOutput() {
    if (!output.value.trim()) {
        output.value = 'Nothing to copy.';
        return;
    }

    try {
        await navigator.clipboard.writeText(output.value);
        output.value = 'Copied to clipboard.';
    } catch (error) {
        output.value = `Copy failed: ${error.message}`;
    }
}

document.getElementById('formatBtn').addEventListener('click', () => processJSON('format'));
document.getElementById('minifyBtn').addEventListener('click', () => processJSON('minify'));
document.getElementById('validateBtn').addEventListener('click', () => processJSON('validate'));
document.getElementById('copyBtn').addEventListener('click', copyOutput);
document.getElementById('clearBtn').addEventListener('click', clearFields);
