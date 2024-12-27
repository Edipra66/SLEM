// Simulasi Data Kelas
let dataKelas = JSON.parse(localStorage.getItem("dataKelasGuru")) || [];

// Referensi Elemen
const createClassBtn = document.getElementById("create-class-btn");
const classList = document.getElementById("class-items");
const classDetail = document.getElementById("class-detail");
const classInfo = document.getElementById("class-info");

// Fungsi Menampilkan Daftar Kelas
function tampilkanDaftarKelas() {
    classList.innerHTML = "";

    if (dataKelas.length === 0) {
        classList.innerHTML = "<p>Tidak ada kelas yang dibuat.</p>";
        return;
    }

    dataKelas.forEach((kelas, index) => {
        const classItem = document.createElement("li");
        classItem.classList.add("class-item");

        classItem.innerHTML = `
            <div>
                <span class="class-name">${kelas.namaKelas}</span>
                <span class="class-code">Kode: ${kelas.kodeKelas}</span>
            </div>
            <button class="detail-btn" data-index="${index}">Lihat Detail</button>
        `;

        classList.appendChild(classItem);
    });

    // Tambahkan Event Listener untuk Tombol Detail
    document.querySelectorAll(".detail-btn").forEach((btn) =>
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            tampilkanDetailKelas(index);
        })
    );
}

// Fungsi Menampilkan Detail Kelas
function tampilkanDetailKelas(index) {
    const kelas = dataKelas[index];

    classInfo.innerHTML = `
        <div class="class-info-item">
            <h3>Nama Kelas</h3>
            <p>${kelas.namaKelas}</p>
        </div>
        <div class="class-info-item">
            <h3>Kode Kelas</h3>
            <p>${kelas.kodeKelas}</p>
        </div>
        <div class="class-info-item">
            <h3>Daftar Siswa</h3>
            <ul>
                ${kelas.siswa
                    .map((siswa) => `<li>${siswa.nama} - ${siswa.poin} Poin</li>`)
                    .join("")}
            </ul>
        </div>
        <div class="class-info-item">
            <button class="task-btn">Buat Tugas</button>
            <button class="group-btn">Buat Kelompok</button>
        </div>
    `;

    // Tambahkan Event Listener untuk Tombol Aksi
    document.querySelector(".task-btn").addEventListener("click", () => {
        buatTugas(index);
    });

    document.querySelector(".group-btn").addEventListener("click", () => {
        buatKelompok(index);
    });
}

// Fungsi Membuat Kelas Baru
function buatKelasBaru() {
    const namaKelas = prompt("Masukkan nama kelas:");
    if (!namaKelas) return alert("Nama kelas tidak boleh kosong.");

    const kodeKelas = `KLS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const kelasBaru = {
        namaKelas,
        kodeKelas,
        siswa: [],
    };

    dataKelas.push(kelasBaru);
    simpanDataKelas();
    tampilkanDaftarKelas();
    alert(`Kelas "${namaKelas}" berhasil dibuat dengan kode: ${kodeKelas}`);
}

// Event Listener untuk Tombol Buat Kelas Baru
createClassBtn.addEventListener("click", buatKelasBaru);

// Fungsi Menyimpan Data ke Local Storage
function simpanDataKelas() {
    localStorage.setItem("dataKelasGuru", JSON.stringify(dataKelas));
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    tampilkanDaftarKelas();
});
