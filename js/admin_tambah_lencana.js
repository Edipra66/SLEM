// Referensi Elemen
const formTambahLencana = document.getElementById("form-tambah-lencana");
const namaLencana = document.getElementById("badge-name");
const deskripsiLencana = document.getElementById("badge-desc");
const ikonLencana = document.getElementById("badge-icon");
const badgeList = document.getElementById("badge-list");

// Ambil Data Lencana dari Local Storage
let daftarLencana = JSON.parse(localStorage.getItem("daftarLencana")) || [];

// Fungsi Menyimpan Data ke Local Storage
function simpanLencanaKeLocalStorage() {
    localStorage.setItem("daftarLencana", JSON.stringify(daftarLencana));
}

// Fungsi Menampilkan Daftar Lencana
function tampilkanLencanaAdmin() {
    badgeList.innerHTML = "";

    daftarLencana.forEach((lencana) => {
        const badgeCard = document.createElement("li");
        badgeCard.classList.add("badge-card-admin");

        badgeCard.innerHTML = `
            <img src="${lencana.ikon}" alt="${lencana.nama}">
            <h3>${lencana.nama}</h3>
            <p>${lencana.deskripsi}</p>
            <button class="admin-btn edit" data-id="${lencana.id}">Edit</button>
            <button class="admin-btn delete" data-id="${lencana.id}">Hapus</button>
        `;
        badgeList.appendChild(badgeCard);
    });
}

// Fungsi Menambahkan Lencana Baru
formTambahLencana.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = ikonLencana.files[0];

    if (!file) {
        alert("Harap unggah ikon lencana.");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const lencanaBaru = {
            id: daftarLencana.length + 1,
            nama: namaLencana.value.trim(),
            deskripsi: deskripsiLencana.value.trim(),
            ikon: reader.result,
            status: "pending"
        };

        // Tambahkan Lencana dan Simpan
        daftarLencana.push(lencanaBaru);
        simpanLencanaKeLocalStorage();

        alert(`Lencana "${lencanaBaru.nama}" berhasil ditambahkan!`);
        formTambahLencana.reset();
        tampilkanLencanaAdmin();
    };
    reader.readAsDataURL(file);
});

// Fungsi Mengedit Lencana
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
        const idLencana = parseInt(e.target.dataset.id);
        const lencanaDipilih = daftarLencana.find((l) => l.id === idLencana);

        if (lencanaDipilih) {
            namaLencana.value = lencanaDipilih.nama;
            deskripsiLencana.value = lencanaDipilih.deskripsi;

            formTambahLencana.addEventListener("submit", (ev) => {
                ev.preventDefault();

                const file = ikonLencana.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        lencanaDipilih.nama = namaLencana.value.trim();
                        lencanaDipilih.deskripsi = deskripsiLencana.value.trim();
                        lencanaDipilih.ikon = reader.result;

                        simpanLencanaKeLocalStorage();
                        alert("Lencana berhasil diperbarui!");
                        formTambahLencana.reset();
                        tampilkanLencanaAdmin();
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("Harap unggah ikon baru.");
                }
            }, { once: true });
        }
    }
});

// Fungsi Menghapus Lencana
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const idLencana = parseInt(e.target.dataset.id);

        if (confirm("Apakah Anda yakin ingin menghapus lencana ini?")) {
            daftarLencana = daftarLencana.filter((l) => l.id !== idLencana);
            simpanLencanaKeLocalStorage();
            tampilkanLencanaAdmin();
            alert("Lencana berhasil dihapus!");
        }
    }
});

// Tampilkan Data Saat Halaman Dimuat
document.addEventListener("DOMContentLoaded", tampilkanLencanaAdmin);
