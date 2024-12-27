// Referensi Elemen
const profilePhoto = document.getElementById("profile-photo");
const changePhotoBtn = document.getElementById("change-photo-btn");
const uploadPhoto = document.getElementById("upload-photo");

const studentName = document.getElementById("student-name");
const studentPoints = document.getElementById("student-points");
const studentEmail = document.getElementById("student-email");
const studentPhone = document.getElementById("student-phone");

const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const badgeSelect = document.getElementById("badge-select");
const profileForm = document.getElementById("profile-form");

// Data Simulasi Local Storage
let profilSiswa = JSON.parse(localStorage.getItem("profilSiswa")) || {
    nama: "Nama Lengkap",
    poin: 0,
    email: "Belum Terhubung",
    telepon: "Belum Terhubung",
    foto: "images/default-avatar.png",
    lencanaAktif: ""
};

// Fungsi Menyimpan Data ke Local Storage
function simpanProfilKeLocalStorage() {
    localStorage.setItem("profilSiswa", JSON.stringify(profilSiswa));
}

// Fungsi Menampilkan Data Profil
function tampilkanProfil() {
    profilePhoto.src = profilSiswa.foto;
    studentName.textContent = profilSiswa.nama;
    studentPoints.textContent = profilSiswa.poin;
    studentEmail.textContent = profilSiswa.email;
    studentPhone.textContent = profilSiswa.telepon;
    badgeSelect.value = profilSiswa.lencanaAktif;
}

// Fungsi Memuat Lencana dari Local Storage
function muatLencana() {
    const dataLencana = JSON.parse(localStorage.getItem("daftarLencana")) || [];
    badgeSelect.innerHTML = `<option value="" selected>Pilih Lencana</option>`;

    dataLencana.forEach((lencana) => {
        const option = document.createElement("option");
        option.value = lencana.nama;
        option.textContent = lencana.nama;
        badgeSelect.appendChild(option);
    });
}

// Fungsi Mengunggah Foto Profil Baru
changePhotoBtn.addEventListener("click", () => uploadPhoto.click());

uploadPhoto.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilSiswa.foto = reader.result;
            simpanProfilKeLocalStorage();
            tampilkanProfil();
            alert("Foto profil berhasil diperbarui!");
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi Memperbarui Profil
profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Perbarui Data Profil
    profilSiswa.email = emailInput.value.trim() || profilSiswa.email;
    profilSiswa.telepon = phoneInput.value.trim() || profilSiswa.telepon;
    profilSiswa.lencanaAktif = badgeSelect.value;

    simpanProfilKeLocalStorage();
    tampilkanProfil();
    alert("Profil berhasil diperbarui!");
    profileForm.reset();
});

// Tampilkan Profil Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", () => {
    muatLencana();
    tampilkanProfil();
});
