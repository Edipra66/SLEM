// Referensi Elemen
const addClassBtn = document.getElementById("add-class-btn");
const classModal = document.getElementById("class-modal");
const closeModalBtn = document.getElementById("close-modal");
const classForm = document.getElementById("class-form");
const classCodeInput = document.getElementById("class-code-input");
const classList = document.getElementById("class-list");

// Simulasi Data Kelas
let daftarKelas = JSON.parse(localStorage.getItem("daftarKelas")) || [];

// Fungsi Menampilkan Daftar Kelas
function tampilkanDaftarKelas() {
    classList.innerHTML = "";

    daftarKelas.forEach((kelas) => {
        const classCard = document.createElement("div");
        classCard.classList.add("class-card");

        classCard.innerHTML = `
            <h2>${kelas.namaKelas}</h2>
            <p>Guru: ${kelas.namaGuru}</p>
            <p>Kode Kelas: ${kelas.kodeKelas}</p>
            <button class="class-btn" data-id="${kelas.kodeKelas}">Lihat Kelas</button>
        `;
        classList.appendChild(classCard);
    });
}

// Membuka Modal Tambah Kode Kelas
addClassBtn.addEventListener("click", () => {
    classModal.style.display = "flex";
});

// Menutup Modal
closeModalBtn.addEventListener("click", () => {
    classModal.style.display = "none";
});

// Menambahkan Kelas Baru
classForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const kodeKelas = classCodeInput.value.trim();

    if (kodeKelas !== "") {
        // Simulasi Data Guru dan Kelas
        const kelasBaru = {
            kodeKelas,
            namaKelas: `Kelas ${kodeKelas}`,
            namaGuru: "Guru Contoh",
            siswa: []
        };

        // Tambahkan ke Local Storage
        daftarKelas.push(kelasBaru);
        localStorage.setItem("daftarKelas", JSON.stringify(daftarKelas));

        alert(`Kelas ${kelasBaru.namaKelas} berhasil ditambahkan!`);
        classCodeInput.value = "";
        classModal.style.display = "none";
        tampilkanDaftarKelas();
    } else {
        alert("Harap masukkan kode kelas yang valid.");
    }
});

// Melihat Detail Kelas
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("class-btn")) {
        const kodeKelas = e.target.dataset.id;

        // Simpan Data Detail Kelas
        const kelasDipilih = daftarKelas.find(
            (kelas) => kelas.kodeKelas === kodeKelas
        );
        if (kelasDipilih) {
            localStorage.setItem("kelasDipilih", JSON.stringify(kelasDipilih));
            window.location.href = "detail_kelas.html";
        } else {
            alert("Kelas tidak ditemukan!");
        }
    }
});

// Tampilkan Data Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", tampilkanDaftarKelas);
