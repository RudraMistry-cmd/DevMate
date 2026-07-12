const searchInput = document.getElementById("searchInput");
const utilityCards = document.querySelectorAll(".utility-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    if(!searchInput || !noResults){
        console.log("Search UI not found");
        return;
    }
    const search = searchInput.value.toLowerCase().trim();
    let found = false;

    for (const card of utilityCards) {
        const name = (card.getAttribute("data-name") || "").toLowerCase();
        const text = card.textContent.toLowerCase();
        const matches = name.includes(search) || text.includes(search);

        card.style.display = matches ? "" : "none";
        if(matches) found = true;
    }
    noResults.style.display = found ? "none" : "block";
});

document.addEventListener("keydown", function(e){
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
        e.preventDefault();
        searchInput.focus();
        if(searchInput.value){
            searchInput.select();
        }
    }
})