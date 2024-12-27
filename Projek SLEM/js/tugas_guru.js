// Simulasi Data Tugas (Jika Belum Ada di Local Storage)
let daftarTugas = JSON.parse(localStorage.getItem("daftarTugasGuru")) || [];

// Referensi Elemen
const taskList = document.getElementById("task-items");
const createTaskBtn = document.getElementById("create-task-btn");

// Fungsi Menampilkan Daftar Tugas
function tampilkanDaftarTugas() {
    taskList.innerHTML = "";

    if (daftarTugas.length === 0) {
        taskList.innerHTML = "<p>Tidak ada tugas yang dibuat.</p>";
        return;
    }

    daftarTugas.forEach((tugas, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        taskItem.innerHTML = `
            <div>
                <span class="task-title">${tugas.judul}</span>
                <span class="task-date">Tenggat Waktu: ${tugas.tenggat}</span>
            </div>
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;

        taskList.appendChild(taskItem);
    });

    // Tambahkan Event Listener untuk Tombol Edit
    document.querySelectorAll(".edit-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            editTugas(index);
        })
    );
}

// Fungsi Navigasi ke Halaman Buat Tugas
createTaskBtn.addEventListener("click", () => {
    window.location.href = "buat_tugas.html";
});

// Fungsi Menyimpan Data ke Local Storage
function simpanTugasKeLocalStorage() {
    localStorage.setItem("daftarTugasGuru", JSON.stringify(daftarTugas));
}

// Fungsi Edit Tugas (Simulasi)
function editTugas(index) {
    alert(`Fitur Edit Tugas untuk "${daftarTugas[index].judul}" sedang dalam pengembangan.`);
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    tampilkanDaftarTugas();
});
