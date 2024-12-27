document.addEventListener("DOMContentLoaded", () => {
    const groupsList = document.getElementById("groups-list");
    const dataGrup = JSON.parse(localStorage.getItem("dataGrup")) || [];

    // Tampilkan daftar grup yang dibuat oleh guru
    dataGrup.forEach((grup) => {
        const groupItem = document.createElement("div");
        groupItem.classList.add("group-item");

        groupItem.innerHTML = `
            <h3>${grup.namaGrup}</h3>
            <p>${grup.deskripsi}</p>
            <button class="btn-view-group" data-id="${grup.id}">Masuk ke Grup</button>
        `;
        groupsList.appendChild(groupItem);
    });
});

// Navigasi ke Halaman Chat Grup
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-view-group")) {
        const grupId = e.target.dataset.id;
        window.location.href = `chat_grup.html?id=${grupId}`;
    }
});
