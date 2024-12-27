// Simulasi Data Guru (Jika belum ada di Local Storage)
if (!localStorage.getItem("profilGuru")) {
    const dataGuru = {
        nama: "Budi Santoso",
        sekolah: "SMA Negeri 1 Jakarta",
        jumlahSiswa: 120,
        fotoProfil: "images/default-avatar.png",
        email: "",
        telepon: ""
    };
    localStorage.setItem("profilGuru", JSON.stringify(dataGuru));
}

// Ambil Data Guru dari Local Storage
let profilGuru = JSON.parse(localStorage.getItem("profilGuru"));

// Referensi Elemen
const profilePhoto = document.getElementById("profile-photo");
const teacherName = document.getElementById("teacher-name");
const schoolName = document.getElementById("school-name");
const studentCount = document.getElementById("student-count");
const uploadPhotoInput = document.getElementById("upload-photo");
const changePhotoBtn = document.getElementById("change-photo-btn");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const connectionForm = document.getElementById("connection-form");

// FUNGSI Menampilkan Data Guru di Halaman
function tampilkanDataGuru() {
    profilePhoto.src = profilGuru.fotoProfil;
    teacherName.textContent = profilGuru.nama;
    schoolName.textContent = `Sekolah: ${profilGuru.sekolah}`;
    studentCount.textContent = `Jumlah Siswa: ${profilGuru.jumlahSiswa}`;
    emailInput.value = profilGuru.email || "";
    phoneInput.value = profilGuru.telepon || "";
}

// Fungsi Mengganti Foto Profil
changePhotoBtn.addEventListener("click", () => {
    uploadPhotoInput.click();
});

uploadPhotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilGuru.fotoProfil = reader.result; // Simpan URL Gambar
            localStorage.setItem("profilGuru", JSON.stringify(profilGuru));
            tampilkanDataGuru();
            alert("Foto profil berhasil diperbarui!");
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi Menyimpan Email dan Telepon
connectionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    profilGuru.email = emailInput.value.trim();
    profilGuru.telepon = phoneInput.value.trim();

    localStorage.setItem("profilGuru", JSON.stringify(profilGuru));
    alert("Data akun berhasil diperbarui!");
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", tampilkanDataGuru);
