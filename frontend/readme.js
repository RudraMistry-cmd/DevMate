function generateReadme() {
    const projectName = document.getElementById('projectName').value;
    const description = document.getElementById('description').value;
    const features = document.getElementById('features').value;
    const techStack = document.getElementById('techStack').value;
    const installation = document.getElementById('installation').value;
    const usage = document.getElementById('usage').value;
    const futureImprovements = document.getElementById('futureImprovements').value;
    const license = document.getElementById('license').value;

    if (projectName.trim() === "") {
        alert("Project name is required.");
        return;
    }

    if (description.trim() === "") {
        alert("Description is required.");
        return;
    }

    if (features.trim() === "") {
        alert("At least one feature is required.");
        return;
    }

    if (techStack.trim() === "") {
        alert("At least one tech stack item is required.");
        return;
    }

    if (installation.trim() === "") {
        alert("Installation is required.");
        return;
    }

    if (usage.trim() === "") {
        alert("Usage is required.");
        return;
    }

    if (license.trim() === "") {
        alert("License is required.");
        return;
    }

    const payload = {
        project_name: projectName.trim(),
        project_description: description.trim(),
        features: features.split('\n').map(item => item.trim()).filter(Boolean),
        tech_stack: techStack.split('\n').map(item => item.trim()).filter(Boolean),
        installation: installation.trim(),
        usage: usage.trim(),
        future_improvements: futureImprovements.split('\n').map(item => item.trim()).filter(Boolean),
        license: license.trim()
    };

    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    generateBtn.style.cursor = 'not-allowed';
    document.getElementById('output').value = 'Generating README...';

    fetch('http://127.0.0.1:8000/readme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const readme = typeof data === 'string' ? data : data.readme || '';
        document.getElementById('output').value = readme;
    })
    .catch(error => {
        document.getElementById('output').value = 'Unable to generate README from the API.';
        console.error(error);
    })
    .finally(() => {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate README';
        generateBtn.style.cursor = 'pointer';
    });
}

function copyReadme() {
    const output = document.getElementById('output');
    if (!output.value) {
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output.value);
    } else {
        output.select();
        document.execCommand('copy');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');

    if (generateBtn) {
        generateBtn.addEventListener('click', generateReadme);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyReadme);
    }
});
