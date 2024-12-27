// Ambil ID Grup dari URL
const grupId = new URLSearchParams(window.location.search).get("id");
const dataGrup = JSON.parse(localStorage.getItem("dataGrup")) || [];

// Cek Keberadaan Grup
const grup = dataGrup.find((g) => g.id == grupId);
if (!grup) {
    alert("Grup tidak ditemukan!");
    window.location.href = "kelompok.html";
    return;
}

// Menampilkan Info Grup
document.getElementById("nama-grup").textContent = grup.namaGrup;
document.getElementById("deskripsi-grup").textContent = grup.deskripsi;

// Tampilkan Daftar Anggota
const memberList = document.getElementById("member-list");
grup.anggota.forEach((anggota) => {
    const li = document.createElement("li");
    li.textContent = anggota;
    memberList.appendChild(li);
});

// Tampilkan Pesan Obrolan
function tampilkanPesan() {
    const chatArea = document.getElementById("chat-area");
    chatArea.innerHTML = "";
    grup.pesan.forEach((p) => {
        const pesanElemen = document.createElement("div");
        pesanElemen.classList.add("chat-message");
        pesanElemen.innerHTML = `<strong>${p.pengirim}:</strong> ${p.teks}`;
        chatArea.appendChild(pesanElemen);
    });
}
tampilkanPesan();

// Kirim Pesan Baru
document.getElementById("form-chat").addEventListener("submit", (e) => {
    e.preventDefault();
    const inputPesan = document.getElementById("input-pesan").value.trim();

    if (inputPesan) {
        grup.pesan.push({ pengirim: "Siswa Contoh", teks: inputPesan });
        localStorage.setItem("dataGrup", JSON.stringify(dataGrup));
        tampilkanPesan();
        document.getElementById("input-pesan").value = ""; // Reset input
    }
});

// Fungsi Unggah Tugas
document.getElementById("form-upload").addEventListener("submit", (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file-input").files[0];

    if (fileInput) {
        const tugasBaru = {
            namaFile: fileInput.name,
            ukuranFile: fileInput.size,
            waktuUnggah: new Date().toLocaleString(),
        };

        if (!grup.tugas) grup.tugas = [];
        grup.tugas.push(tugasBaru);

        // Simpan Data ke Local Storage
        localStorage.setItem("dataGrup", JSON.stringify(dataGrup));
        alert(`Tugas "${fileInput.name}" berhasil diunggah!`);
        document.getElementById("file-input").value = ""; // Reset File Input
    } else {
        alert("Harap pilih file sebelum mengunggah.");
    }
});
