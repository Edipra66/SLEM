// Simulasi Data Lencana
const daftarLencana = [
    {
        id: 1,
        nama: "Rajin Belajar",
        deskripsi: "Menyelesaikan 5 tugas dalam 1 minggu.",
        ikon: "images/lencana1.png",
        status: "completed" // completed | pending
    },
    {
        id: 2,
        nama: "Aktif Diskusi",
        deskripsi: "Berpartisipasi dalam 3 diskusi kelompok.",
        ikon: "images/lencana2.png",
        status: "pending"
    },
    {
        id: 3,
        nama: "Juara Kelas",
        deskripsi: "Mendapatkan peringkat 1 selama 1 bulan.",
        ikon: "images/lencana3.png",
        status: "pending"
    }
];

// Simpan Data ke Local Storage (Simulasi)
localStorage.setItem("daftarLencana", JSON.stringify(daftarLencana));

// Halaman Lencana
// Referensi Elemen
const badgeList = document.getElementById("badge-list");

// Data Lencana dari Local Storage
const dataLencana = JSON.parse(localStorage.getItem("daftarLencana")) || [];

// Fungsi Menampilkan Daftar Lencana
function tampilkanLencana() {
    badgeList.innerHTML = "";

    dataLencana.forEach((lencana) => {
        const badgeCard = document.createElement("div");
        badgeCard.classList.add("badge-card");

        badgeCard.innerHTML = `
            <img src="${lencana.ikon}" alt="${lencana.nama}">
            <h3>${lencana.nama}</h3>
            <p>${lencana.deskripsi}</p>
            <span class="badge-status ${lencana.status}">
                ${lencana.status === "completed" ? "Selesai" : "Tertunda"}
            </span>
        `;
        badgeList.appendChild(badgeCard);
    });
}

// Fungsi Admin Menambahkan Lencana Baru
function tambahLencanaBaru(nama, deskripsi, ikon) {
    const lencanaBaru = {
        id: dataLencana.length + 1,
        nama,
        deskripsi,
        ikon,
        status: "pending"
    };

    dataLencana.push(lencanaBaru);
    localStorage.setItem("daftarLencana", JSON.stringify(dataLencana));
    tampilkanLencana();
    alert(`Lencana "${nama}" berhasil ditambahkan!`);
}

// Tampilkan Lencana Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", tampilkanLencana);

// Simulasi Menambahkan Lencana Baru Melalui Console
tambahLencanaBaru(
    "Ahli Tugas",
    "Menyelesaikan semua tugas selama 1 bulan.",
    "images/lencana4.png"
);
