document.addEventListener("DOMContentLoaded", () => {

    const dateEl = document.getElementById("current-date");
    const timeEl = document.getElementById("current-time");

    function updateDateTime() {
        const now = new Date();

        dateEl.textContent = now.toLocaleDateString();
        timeEl.textContent = now.toLocaleTimeString();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

});