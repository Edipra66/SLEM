// Simulasi Data Siswa
const siswaData = [
    { nama: "Siswa A", poin: 1500, kelas: "SD", foto: "images/user1.png" },
    { nama: "Siswa B", poin: 1200, kelas: "SMP", foto: "images/user2.png" },
    { nama: "Siswa C", poin: 1800, kelas: "SMA", foto: "images/user3.png" },
    { nama: "Siswa D", poin: 2000, kelas: "SMK", foto: "images/user4.png" },
    { nama: "Siswa E", poin: 1000, kelas: "SD", foto: "images/user5.png" }
];

// Simpan Data di Local Storage (Simulasi)
localStorage.setItem("siswaData", JSON.stringify(siswaData));

// Referensi Elemen
const leaderboardList = document.getElementById("leaderboard-list");
const studentPhoto = document.getElementById("student-photo");
const studentName = document.getElementById("student-name");
const studentRank = document.getElementById("student-rank");
const studentPoints = document.getElementById("student-points");

// Data Siswa dari Local Storage
const dataSiswa = JSON.parse(localStorage.getItem("siswaData")) || [];

// Fungsi Menampilkan Papan Peringkat
function tampilkanPapanPeringkat() {
    leaderboardList.innerHTML = "";

    // Urutkan Berdasarkan Poin
    const peringkatSiswa = dataSiswa.sort((a, b) => b.poin - a.poin);

    peringkatSiswa.forEach((siswa, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${siswa.foto}" alt="${siswa.nama}">
            <h3>${siswa.nama}</h3>
            <p><strong>Poin:</strong> ${siswa.poin}</p>
            <p><strong>Peringkat:</strong> #${index + 1}</p>
        `;
        leaderboardList.appendChild(li);
    });
}

// Fungsi Menampilkan Detail Siswa Login
function tampilkanDetailSiswa() {
    const siswaLogin = dataSiswa[0]; // Simulasi Siswa Login

    if (siswaLogin) {
        studentPhoto.src = siswaLogin.foto;
        studentName.textContent = siswaLogin.nama;
        studentRank.textContent = `#${dataSiswa.findIndex((s) => s.nama === siswaLogin.nama) + 1}`;
        studentPoints.textContent = siswaLogin.poin;
    }
}

// Tombol Navigasi ke Lencana
document.getElementById("view-badges-btn").addEventListener("click", () => {
    window.location.href = "lencana.html";
});

// Tampilkan Data saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", () => {
    tampilkanPapanPeringkat();
    tampilkanDetailSiswa();
});
