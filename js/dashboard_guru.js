// Data Simulasi Guru dan Tugas
const dataGuru = {
    nama: "Bapak Ahmad",
    sekolah: "SMA Negeri 1 Contoh",
    kelas: "Kelas 12 IPA"
};

const dataTugas = [
    {
        judul: "Tugas Matematika - Persamaan Kuadrat",
        tenggat: "20 Desember 2024",
        status: "Belum Dinilai"
    },
    {
        judul: "Tugas Fisika - Hukum Newton",
        tenggat: "22 Desember 2024",
        status: "Sudah Dinilai"
    }
];

// FUNGSI Simpan Data Simulasi di Local Storage
localStorage.setItem("dataGuru", JSON.stringify(dataGuru));
localStorage.setItem("dataTugas", JSON.stringify(dataTugas));

// Referensi Elemen
const teacherPhoto = document.getElementById("teacher-photo");
const teacherName = document.getElementById("teacher-name");
const teacherSchool = document.getElementById("teacher-school");
const teacherClass = document.getElementById("teacher-class");
const notificationList = document.getElementById("notification-list");
const signOutBtn = document.getElementById("sign-out");

// Fungsi Menampilkan Data Guru
function tampilkanDataGuru() {
    const guru = JSON.parse(localStorage.getItem("dataGuru"));

    if (guru) {
        teacherName.textContent = guru.nama;
        teacherSchool.textContent = `Sekolah: ${guru.sekolah}`;
        teacherClass.textContent = `Wali ${guru.kelas}`;
    } else {
        alert("Data guru tidak ditemukan. Harap login ulang.");
        window.location.href = "index.html";
    }
}

// Fungsi Menampilkan Notifikasi Tugas
function tampilkanNotifikasiTugas() {
    const tugas = JSON.parse(localStorage.getItem("dataTugas")) || [];

    notificationList.innerHTML = ""; // Reset Daftar

    if (tugas.length === 0) {
        notificationList.innerHTML = "<li>Tidak ada notifikasi tugas saat ini.</li>";
    } else {
        tugas.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.judul}</span>
                <span>Tenggat: ${item.tenggat}</span>
            `;
            notificationList.appendChild(li);
        });
    }
}

// Fungsi Keluar
signOutBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem("dataGuru");
        localStorage.removeItem("dataTugas");
        alert("Berhasil keluar!");
        window.location.href = "index.html";
    }
});

// Tampilkan Data Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", () => {
    tampilkanDataGuru();
    tampilkanNotifikasiTugas();
});
