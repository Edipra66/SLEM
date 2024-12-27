document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const tugas = JSON.parse(localStorage.getItem("tugasGuru")) || [];

    // Tampilkan Tugas yang Belum Selesai
    tugas.forEach((item) => {
        if (item.status === "baru") {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            taskItem.innerHTML = `
                <div class="task-header">
                    <span class="task-date">${item.tanggal}</span>
                    <h3>${item.mataPelajaran}</h3>
                </div>
                <p>${item.deskripsi}</p>
                <button class="btn-view-task" data-id="${item.id}">Kerjakan</button>
            `;
            taskList.appendChild(taskItem);
        }
    });
});

// Menandai Tugas Selesai
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-view-task")) {
        const tugasId = e.target.dataset.id;
        const tugas = JSON.parse(localStorage.getItem("tugasGuru")) || [];

        const tugasIndex = tugas.findIndex((item) => item.id == tugasId);
        if (tugasIndex !== -1) {
            tugas[tugasIndex].status = "selesai";
            tugas[tugasIndex].siswa.push({
                nama: "Siswa Contoh",
                kelas: "X IPA 1"
            });

            localStorage.setItem("tugasGuru", JSON.stringify(tugas));
            alert("Tugas berhasil diselesaikan!");
            location.reload(); // Memperbarui halaman
        }
    }
});
