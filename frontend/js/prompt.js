function optimizePrompt(){
    const userPrompt = document.getElementById("userPrompt").value
    const category = document.getElementById("category").value
    const optimizedPrompt = document.getElementById("optimizedPrompt")
    const changesDiv = document.getElementById("changes");
    const optimizeBtn = document.getElementById("optimizeBtn");

    changesDiv.innerHTML = " ";

    optimizeBtn.disabled = true;
    optimizeBtn.style.cursor = "not-allowed";
    optimizeBtn.textContent = "Optimizing...";

    if (userPrompt.trim() === "" || category === "Select your Category") {
        alert("Please enter a prompt and select a valid category.");
        optimizeBtn.disabled = false;
        optimizeBtn.textContent = "Optimize Prompt";
        optimizeBtn.style.cursor = "pointer";
        return;
    }

    fetch("/prompt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_prompt: userPrompt,
            category: category
        })
    })
    .then(response => response.json())
    .then(data => {
        optimizedPrompt.value = data.optimized_prompt;

        changesDiv.innerHTML = "";

        for (const change of data.changes) {
            const changeElement = document.createElement("p");
            changeElement.textContent = change;
            changesDiv.appendChild(changeElement);
        }
    })
    .catch(error => {
        console.error(error);
        alert("Unable to connect to local AI.");
    })
    .finally(() => {
        optimizeBtn.disabled = false;
        optimizeBtn.textContent = "Optimize Prompt";
        optimizeBtn.style.cursor = "pointer";
    });
}