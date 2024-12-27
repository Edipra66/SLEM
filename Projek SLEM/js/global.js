// Referensi Tombol Keluar
const signOutBtn = document.getElementById("sign-out");

// Fungsi Keluar
signOutBtn.addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        // Hapus Data Local Storage
        localStorage.removeItem("loggedInUser");

        // Alihkan ke Halaman Index
        window.location.href = "index.html";
    }
});

// Validasi Login di Setiap Halaman
-const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

-if (!loggedInUser) {
    alert("Anda belum login. Silakan login terlebih dahulu.");
    window.location.href = "index.html";
}
