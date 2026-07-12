function findMatches(){
    const inputText = document.getElementById("inputText").value;
    const regexPattern = document.getElementById("regexPattern").value;
    const globalFlag = document.getElementById("flagGlobal").checked;
    const ignoreCase = document.getElementById("flagIgnoreCase").checked;
    const multiline = document.getElementById("flagMultiLine").checked;
    const resultsDiv = document.getElementById("results");
    const matchBtn = document.getElementById("matchBtn");

    resultsDiv.innerHTML = "<p>Checking matches...</p>";
    matchBtn.disabled = true;
    matchBtn.textContent = "Checking...";
    matchBtn.style.cursor = "not-allowed";
    
    if (inputText.trim() === "") {
        alert("Please enter some text.");
        matchBtn.disabled = false;
        matchBtn.textContent = "Find Matches";
        matchBtn.style.cursor = "pointer";
        return;
    }

    if (regexPattern.trim() === "") {
        alert("Please enter a regex pattern.");
        matchBtn.disabled = false;
        matchBtn.textContent = "Find Matches";
        matchBtn.style.cursor = "pointer";
        return;
    }

    fetch("/regex", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input_text: inputText,
            regex_pattern: regexPattern,
            global_flag: globalFlag,
            ignore_case: ignoreCase,
            multiline: multiline
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            resultsDiv.innerHTML = `<div style="color:#b91c1c;"><strong>Invalid regex</strong><p>${data.error}</p></div>`;
            return;
        }

        resultsDiv.innerHTML = `<h4>Total Matches: ${data.count}</h4>`;

        if (!data.matches || data.matches.length === 0) {
            resultsDiv.innerHTML += "<p>No matches found.</p>";
            return;
        }

        const list = document.createElement("ol");
        list.style.paddingLeft = "20px";

        data.matches.forEach((match, index) => {
            const item = document.createElement("li");
            item.innerHTML = `<strong>Match ${index + 1}</strong><br><code>${match}</code>`;
            list.appendChild(item);
        });

        resultsDiv.appendChild(list);
    })
    .catch(error => {
        resultsDiv.innerHTML = `<div style="color:#b91c1c;"><strong>Request failed</strong><p>${error.message}</p></div>`;
    })
    .finally(() => {
        matchBtn.disabled = false;
        matchBtn.textContent = "Find Matches";
        matchBtn.style.cursor = "pointer";
    });
}