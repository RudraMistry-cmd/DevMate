function toggleBodySection() {
    const method = document.getElementById('methodSelect').value;
    const bodySection = document.getElementById('bodySection');

    if (method === 'GET' || method === 'DELETE') {
        bodySection.style.display = 'none';
    } else {
        bodySection.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const methodSelect = document.getElementById('methodSelect');
    if (methodSelect) {
        methodSelect.addEventListener('change', toggleBodySection);
    }
    toggleBodySection();
});

function sendRequest() {
    const url = document.getElementById('apiUrl').value.trim();
    const method = document.getElementById('methodSelect').value.trim();
    const headersInput = document.getElementById('headersInput').value.trim();
    const body = document.getElementById('bodyInput').value;

    toggleBodySection();

    if (url === "") {
        alert("Please enter an API URL.");
        return;
    }

    try {
        new URL(url);
    } catch (error) {
        alert("Please enter a valid API URL.");
        return;
    }

    if (method === "") {
        alert("Please select a request method.");
        return;
    }

    let headers = {};
    if (headersInput !== "") {
        const lines = headersInput.split('\n');
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === "") {
                continue;
            }

            const separatorIndex = trimmedLine.indexOf(':');
            if (separatorIndex === -1) {
                alert("Headers must be in 'Key: Value' format.");
                return;
            }

            const key = trimmedLine.slice(0, separatorIndex).trim();
            const value = trimmedLine.slice(separatorIndex + 1).trim();

            if (!key || !value) {
                alert("Headers must be in 'Key: Value' format.");
                return;
            }

            headers[key] = value;
        }
    }

    const payload = {
        url,
        method,
        headers,
        body
    };
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    sendBtn.style.cursor = 'not-allowed';

    fetch('http://127.0.0.1:8000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('statusText').textContent = data["status"];
        document.getElementById('timeText').textContent = data["time"];
        let responseText = data.body;
        try {
            responseText = JSON.stringify(
                JSON.parse(responseText),
                null,
                4
            );
        } catch {}
        document.getElementById("responseBox").textContent = responseText;
    })
    .catch(error => {
        document.getElementById("statusText").textContent = "Error";
        document.getElementById("timeText").textContent = "-";
        document.getElementById("responseBox").textContent = error.message;
        console.error(error);
    })
    .finally(() => {
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Request';
        sendBtn.style.cursor = 'pointer';
    });
}