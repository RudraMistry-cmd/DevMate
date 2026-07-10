function optimizePrompt(){
    const userPrompt = document.getElementById("userPrompt").value
    const category = document.getElementById("category").value
    const optimizedPrompt = document.getElementById("optimizedPrompt")
    const changesDiv = document.getElementById("changes");
    changesDiv.innerHTML = "";

    if(userPrompt != "" && category != "Select your Category"){
        fetch("http://127.0.0.1:8000/optimize", {
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

        });
    }else{
        alert("Please enter a prompt and select a valid category.")
    }
}