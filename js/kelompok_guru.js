// Simulasi Data Kelas dan Siswa
const dataKelas = {
    "Kelas 10 IPA": ["Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar"],
    "Kelas 11 IPA": ["Gita", "Hadi", "Ika", "Joko", "Kiki", "Lina"],
    "Kelas 12 IPA": ["Maya", "Nina", "Omar", "Putri", "Rafi", "Santi"]
};

// Simpan Data Simulasi di Local Storage
if (!localStorage.getItem("dataKelas")) {
    localStorage.setItem("dataKelas", JSON.stringify(dataKelas));
}

// Referensi Elemen
const formRandomizer = document.getElementById("randomizer-form");
const classSelect = document.getElementById("class-select");
const groupCountInput = document.getElementById("group-count");
const groupList = document.getElementById("group-items");

// Inisialisasi Data Kelompok
let dataKelompok = JSON.parse(localStorage.getItem("dataKelompok")) || [];

// FUNGSI Memuat Kelas ke Dropdown
function muatKelas() {
    const kelas = JSON.parse(localStorage.getItem("dataKelas"));
    classSelect.innerHTML = '<option value="">Pilih Kelas</option>';
    for (let key in kelas) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        classSelect.appendChild(option);
    }
}

// Fungsi Randomizer
function acakKelompok(kelas, jumlahKelompok) {
    const siswa = [...kelas];
    const kelompok = Array.from({ length: jumlahKelompok }, () => []);

    // Acak Siswa ke Kelompok
    while (siswa.length) {
        for (let i = 0; i < jumlahKelompok; i++) {
            if (siswa.length) {
                const randomIndex = Math.floor(Math.random() * siswa.length);
                kelompok[i].push(siswa.splice(randomIndex, 1)[0]);
            }
        }
    }
    return kelompok;
}

// Menampilkan Daftar Kelompok
function tampilkanKelompok() {
    groupList.innerHTML = "";
    if (dataKelompok.length === 0) {
        groupList.innerHTML = "<p>Tidak ada kelompok yang dibuat.</p>";
        return;
    }

    dataKelompok.forEach((kelompok, index) => {
        const groupItem = document.createElement("li");
        groupItem.classList.add("group-item");

        groupItem.innerHTML = `
            <h3>Kelompok ${index + 1}</h3>
            <ul>
                ${kelompok.map((siswa) => `<li>${siswa}</li>`).join("")}
            </ul>
        `;

        groupList.appendChild(groupItem);
    });
}

// Form Randomizer Submit
formRandomizer.addEventListener("submit", (e) => {
    e.preventDefault();

    const kelas = classSelect.value;
    const jumlahKelompok = parseInt(groupCountInput.value);

    // Validasi Input
    if (!kelas || jumlahKelompok <= 0) {
        alert("Harap isi kelas dan jumlah kelompok dengan benar.");
        return;
    }

    const siswa = JSON.parse(localStorage.getItem("dataKelas"))[kelas];
    if (!siswa) {
        alert("Data kelas tidak ditemukan.");
        return;
    }

    if (jumlahKelompok > siswa.length) {
        alert("Jumlah kelompok tidak boleh melebihi jumlah siswa.");
        return;
    }

    // Acak Kelompok
    const kelompokBaru = acakKelompok(siswa, jumlahKelompok);
    dataKelompok = kelompokBaru;

    // Simpan ke Local Storage dan Tampilkan
    localStorage.setItem("dataKelompok", JSON.stringify(dataKelompok));
    tampilkanKelompok();
    alert("Kelompok berhasil dibuat!");
    formRandomizer.reset();
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    muatKelas();
    tampilkanKelompok();
});
