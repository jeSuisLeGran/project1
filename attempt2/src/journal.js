document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("entry-form");
    const tickerInput = document.getElementById("ticker");
    const entryInput = document.getElementById("entry");
    const descInput = document.getElementById("description");
    const entriesList = document.getElementById("entries-list");

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    renderEntries();

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const ticker = tickerInput.value.trim().toUpperCase();
        const entry = parseFloat(entryInput.value);
        const description = descInput.value.trim();
        const date = new Date().toLocaleDateString();

        if (!ticker || isNaN(entry)) return;

        const target = Math.round(entry * 1.01 * 100) / 100;

        const newEntry = {
            id: Date.now(),
            ticker,
            entry,
            target,
            description,
            date
        };

        entries.push(newEntry);
        saveEntries();
        renderEntries();

        form.reset();
    });

    function renderEntries() {
        entriesList.innerHTML = "";

        entries.forEach(item => {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${item.ticker}</strong> (${item.date})<br>
                Entry: $${item.entry} | Target (1%): $${item.target}<br>
                ${item.description || ""}
                <br>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            `;

            entriesList.appendChild(li);
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                const id = Number(this.dataset.id);
                entries = entries.filter(entry => entry.id !== id);
                saveEntries();
                renderEntries();
            });
        });
    }

    function saveEntries() {
        localStorage.setItem("journalEntries", JSON.stringify(entries));
    }

});