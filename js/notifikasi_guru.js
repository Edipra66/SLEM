// Data Simulasi Notifikasi
const dataNotifikasiGuru = [
    {
        judul: "Tugas Matematika - Persamaan Kuadrat",
        deskripsi: "Tenggat waktu mendekat pada 20 Desember 2024.",
        waktu: "18 Desember 2024"
    },
    {
        judul: "Pengumpulan Tugas IPA",
        deskripsi: "Siswa A telah mengumpulkan tugas Fisika.",
        waktu: "19 Desember 2024"
    },
    {
        judul: "Kelompok Diskusi Bahasa Indonesia",
        deskripsi: "Kelompok 3 telah menyelesaikan proyek akhir.",
        waktu: "18 Desember 2024"
    }
];

// Simpan Data Simulasi di Local Storage
localStorage.setItem("notifikasiGuru", JSON.stringify(dataNotifikasiGuru));

// FUNGSI Referensi Elemen
const notificationList = document.getElementById("notification-list");

// Fungsi Menampilkan Notifikasi
function tampilkanNotifikasi() {
    const notifikasi = JSON.parse(localStorage.getItem("notifikasiGuru")) || [];

    notificationList.innerHTML = ""; // Reset Daftar

    if (notifikasi.length === 0) {
        notificationList.innerHTML = "<p>Tidak ada notifikasi saat ini.</p>";
    } else {
        notifikasi.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("notification-card");

            card.innerHTML = `
                <div>
                    <h3>${item.judul}</h3>
                    <p>${item.deskripsi}</p>
                </div>
                <time>${item.waktu}</time>
            `;

            notificationList.appendChild(card);
        });
    }
}

// Fungsi Hapus Semua Notifikasi (Opsional)
function hapusSemuaNotifikasi() {
    if (confirm("Apakah Anda yakin ingin menghapus semua notifikasi?")) {
        localStorage.removeItem("notifikasiGuru");
        tampilkanNotifikasi();
        alert("Semua notifikasi telah dihapus.");
    }
}

// Tampilkan Data Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", tampilkanNotifikasi);
