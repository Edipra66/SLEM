// Struktur Data Soal
let soalTugas = [];

// Referensi Elemen
const jumlahSoalInput = document.getElementById("jumlah-soal");
const tenggatWaktuInput = document.getElementById("tenggat-waktu");
const tujuanKelasInput = document.getElementById("tujuan-kelas");
const catatanInput = document.getElementById("catatan");
const questionNavigation = document.getElementById("question-navigation");
const questionForm = document.getElementById("question-form");
const jenisSoalInput = document.getElementById("jenis-soal");
const isiSoalInput = document.getElementById("isi-soal");
const pilihanGandaContainer = document.getElementById("pilihan-ganda-container");
const fileInput = document.getElementById("gambar-soal");
const addOptionBtn = document.getElementById("add-option");
const removeOptionBtn = document.getElementById("remove-option");

// Tombol
const resetBtn = document.getElementById("reset-btn");
const submitBtn = document.getElementById("submit-btn");

// Fungsi Membuat Template Soal Baru
function buatTemplateSoal() {
    return {
        jenis: "pilihan-ganda",
        isi: "",
        gambar: null,
        pilihan: ["", "", "", ""],
    };
}

// Fungsi Memperbarui Navigasi Soal
function buatNavigasiSoal(jumlahSoal) {
    questionNavigation.innerHTML = "";

    for (let i = 1; i <= jumlahSoal; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.dataset.index = i - 1;
        button.classList.add("question-btn");

        if (i === 1) button.classList.add("active");

        button.addEventListener("click", () => {
            simpanSoalAktif();
            pindahKeSoal(i - 1);
        });

        questionNavigation.appendChild(button);
    }
}

// Fungsi Menampilkan Soal Berdasarkan Nomor
function pindahKeSoal(index) {
    simpanSoalAktif(); // Simpan soal aktif sebelum berpindah

    const tombolSoal = document.querySelectorAll(".question-btn");
    tombolSoal.forEach((btn) => btn.classList.remove("active"));
    tombolSoal[index].classList.add("active");

    const soal = soalTugas[index];
    jenisSoalInput.value = soal.jenis;
    isiSoalInput.value = soal.isi;
    fileInput.value = ""; // Reset input file
    perbaruiJenisSoal(soal.jenis); // Perbarui format sesuai jenis soal

    // Tampilkan pilihan ganda jika jenis soal adalah pilihan ganda
    if (soal.jenis === "pilihan-ganda") {
        const pilihan = soal.pilihan || [];
        document.getElementById("pilihan-a").value = pilihan[0] || "";
        document.getElementById("pilihan-b").value = pilihan[1] || "";
        document.getElementById("pilihan-c").value = pilihan[2] || "";
        document.getElementById("pilihan-d").value = pilihan[3] || "";
    }
}

// Fungsi untuk Menyimpan Soal Aktif
function simpanSoalAktif() {
    const indexAktif = parseInt(document.querySelector(".question-btn.active").dataset.index);
    const jenis = jenisSoalInput.value;
    const isi = isiSoalInput.value.trim();
    const file = fileInput.files[0];
    const pilihan = Array.from(pilihanGandaContainer.querySelectorAll(".pilihan-row input"))
        .map((input) => input.value.trim())
        .filter((pil) => pil !== ""); // Hanya simpan pilihan yang terisi

    soalTugas[indexAktif] = {
        jenis,
        isi,
        gambar: file ? URL.createObjectURL(file) : null,
        pilihan: jenis === "pilihan-ganda" || jenis === "benar-salah" ? pilihan : null
    };
}

// Fungsi Memperbarui Jenis Soal
function perbaruiJenisSoal(jenis) {
    // Sembunyikan semua elemen pilihan
    pilihanGandaContainer.style.display = "none";

    // Tampilkan elemen sesuai jenis soal
    switch (jenis) {
        case "pilihan-ganda":
            pilihanGandaContainer.style.display = "block";
            break;

        case "essay":
        case "isian-singkat":
            isiSoalInput.placeholder = jenis === "essay" 
                ? "Isi soal essay di sini..." 
                : "Isi soal isian singkat di sini...";
            break;

        case "benar-salah":
            pilihanGandaContainer.style.display = "block";
            document.getElementById("pilihan-a").value = "Benar";
            document.getElementById("pilihan-b").value = "Salah";
            pilihanGandaContainer.querySelectorAll(".pilihan-row").forEach((row, index) => {
                row.style.display = index < 2 ? "flex" : "none";
            });
            break;

        case "numerik":
            isiSoalInput.placeholder = "Jawaban hanya menerima angka.";
            break;

        default:
            alert("Jenis soal tidak dikenal!");
    }
}

// Event Listener untuk Perubahan Jumlah Soal
jumlahSoalInput.addEventListener("change", (e) => {
    const jumlahBaru = parseInt(e.target.value);
    if (jumlahBaru < 1) {
        alert("Jumlah soal minimal 1.");
        jumlahSoalInput.value = 1;
        return;
    }

    if (jumlahBaru > soalTugas.length) {
        // Tambahkan soal baru jika jumlah soal bertambah
        for (let i = soalTugas.length; i < jumlahBaru; i++) {
            soalTugas.push(buatTemplateSoal());
        }
    } else if (jumlahBaru < soalTugas.length) {
        // Kurangi soal jika jumlah soal berkurang
        soalTugas = soalTugas.slice(0, jumlahBaru);
    }

    buatNavigasiSoal(jumlahBaru);
    pindahKeSoal(0); // Pindahkan ke soal pertama
});

// Event Listener untuk Perubahan Jenis Soal
jenisSoalInput.addEventListener("change", () => {
    const jenis = jenisSoalInput.value;
    perbaruiJenisSoal(jenis);
    simpanSoalAktif();
});

// Event Listener untuk Menambah dan Mengurangi Pilihan
addOptionBtn.addEventListener("click", () => {
    const optionCount = document.querySelectorAll(".pilihan-row").length;
    if (optionCount >= 6) {
        alert("Maksimal 6 pilihan.");
        return;
    }

    const newOption = document.createElement("div");
    newOption.classList.add("pilihan-row");
    newOption.innerHTML = `
        <label for="pilihan-${String.fromCharCode(65 + optionCount)}">
            ${String.fromCharCode(65 + optionCount)}:
        </label>
        <input type="text" id="pilihan-${String.fromCharCode(65 + optionCount)}" placeholder="Pilihan ${String.fromCharCode(65 + optionCount)}">
    `;
    pilihanGandaContainer.appendChild(newOption);
});

removeOptionBtn.addEventListener("click", () => {
    const optionRows = document.querySelectorAll(".pilihan-row");
    if (optionRows.length <= 2) {
        alert("Minimal 2 pilihan.");
        return;
    }

    pilihanGandaContainer.removeChild(optionRows[optionRows.length - 1]);
});

// Event Listener untuk Tombol Reset
resetBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin mengulang pembuatan tugas? Semua data akan dihapus.")) {
        soalTugas = new Array(1).fill(null).map(() => buatTemplateSoal());
        jumlahSoalInput.value = 1;
        buatNavigasiSoal(1);
        pindahKeSoal(0);
    }
});

// Event Listener untuk Tombol Selesai
submitBtn.addEventListener("click", () => {
    const jumlahSoal = jumlahSoalInput.value;
    const tenggatWaktu = tenggatWaktuInput.value;
    const tujuanKelas = Array.from(tujuanKelasInput.selectedOptions).map(opt => opt.value);
    const catatan = catatanInput.value.trim();

    if (!jumlahSoal || !tenggatWaktu || tujuanKelas.length === 0) {
        alert("Harap lengkapi semua informasi tugas.");
        return;
    }

    localStorage.setItem("tugasGuru", JSON.stringify({
        jumlahSoal,
        tenggatWaktu,
        tujuanKelas,
        catatan,
        soal: soalTugas,
    }));

    alert("Tugas berhasil disimpan dan dikirim!");
    window.location.href = "tugas_guru.html";
});

// Inisialisasi Halaman
document.addEventListener("DOMContentLoaded", () => {
    soalTugas = new Array(parseInt(jumlahSoalInput.value)).fill(null).map(() => buatTemplateSoal());
    buatNavigasiSoal(jumlahSoalInput.value);
    pindahKeSoal(0); // Pindah ke soal pertama
});
