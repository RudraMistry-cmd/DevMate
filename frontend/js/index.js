const searchInput = document.getElementById("searchInput");
const availableContainer = document.getElementById("availableContainer");
const comingSoonContainer = document.getElementById("comingSoonContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const noResults = document.getElementById("noResults");
const stats = document.getElementById("utilityStats");
const recentContainer = document.getElementById("recentContainer");
const recentSection = document.getElementById("recentSection");

if (availableContainer && comingSoonContainer) {
    availableContainer.className = "utility-grid";
    comingSoonContainer.className = "utility-grid";
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("favoriteUtilities") || "[]");
    } catch (error) {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem("favoriteUtilities", JSON.stringify(favorites));
}

function isFavorite(utility) {
    return getFavorites().some((item) => item.name === utility.name);
}

function createUtilityCard(utility) {
    const card = document.createElement("div");
    card.className = "utility-card";
    card.dataset.name = utility.name.toLowerCase();

    const header = document.createElement("div");
    header.className = "card-header";

    const titleLink = document.createElement("a");
    titleLink.href = utility.route;
    titleLink.className = "card-title-link";
    titleLink.textContent = `${utility.icon} ${utility.name}`;
    titleLink.addEventListener("click", () => {
        saveRecent(utility);
    });

    header.appendChild(titleLink);

    if (utility.status === "available") {
        const star = document.createElement("button");
        star.type = "button";
        star.className = "favorite-star";
        star.textContent = isFavorite(utility) ? "★" : "☆";
        star.setAttribute("aria-label", "Toggle favorite");
        star.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(utility, star);
        });
        header.appendChild(star);
    }

    const description = document.createElement("p");
    description.textContent = utility.description;

    card.appendChild(header);
    card.appendChild(description);

    return card;
}

function toggleFavorite(utility, star) {
    const favorites = getFavorites();
    const exists = favorites.some((item) => item.name === utility.name);

    if (exists) {
        const updated = favorites.filter((item) => item.name !== utility.name);
        saveFavorites(updated);
        star.textContent = "☆";
    } else {
        favorites.unshift(utility);
        saveFavorites(favorites);
        star.textContent = "★";
    }

    renderFavorites();
}

for (const utility of utilities) {
    const card = createUtilityCard(utility);
    if (utility.status === "available") {
        availableContainer.appendChild(card);
    } else {
        comingSoonContainer.appendChild(card);
    }
}

function saveRecent(utility) {
    if (utility.status !== "available") {
        return;
    }

    let recent = JSON.parse(localStorage.getItem("recentUtilities") || "[]");
    recent = recent.filter((item) => item.name !== utility.name);
    recent.unshift(utility);
    recent = recent.slice(0, 5);
    localStorage.setItem("recentUtilities", JSON.stringify(recent));
}

const total = utilities.length;
const available = utilities.filter((utility) => utility.status === "available").length;
const comingSoon = utilities.filter((utility) => utility.status === "coming-soon").length;
stats.textContent = `${available} Available • ${comingSoon} Coming Soon • ${total} Total`;

function createRecentLink(utility) {
    const link = document.createElement("a");
    link.addEventListener("click", () => {
        saveRecent(utility);
    });
    link.href = utility.route;
    link.textContent = `${utility.icon} ${utility.name}`;
    link.className = "recent-utility";

    return link;
}

function renderFavorites() {
    if (!favoritesContainer) {
        return;
    }

    favoritesContainer.innerHTML = "";
    const favorites = getFavorites();

    if (favorites.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No favorites yet.";
        favoritesContainer.appendChild(empty);
        return;
    }

    for (const utility of favorites) {
        const link = document.createElement("a");
        link.href = utility.route;
        link.className = "recent-utility";
        link.textContent = `${utility.icon} ${utility.name}`;
        favoritesContainer.appendChild(link);
    }
}

const recentUtilities = JSON.parse(localStorage.getItem("recentUtilities") || "[]");
for (const utility of recentUtilities) {
    const link = createRecentLink(utility);
    recentContainer.appendChild(link);
}

if (recentUtilities.length === 0) {
    recentSection.style.display = "none";
}

renderFavorites();

let utilityCards = document.querySelectorAll(".utility-card");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const search = searchInput.value.toLowerCase().trim();
        let found = false;

        for (const card of utilityCards) {
            const name = (card.getAttribute("data-name") || "").toLowerCase();
            const text = card.textContent.toLowerCase();
            const matches = name.includes(search) || text.includes(search);

            card.style.display = matches ? "" : "none";
            if (matches) found = true;
        }

        noResults.style.display = found ? "none" : "block";
    });
}

document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.focus();
        if (searchInput.value) {
            searchInput.select();
        }
    }
});