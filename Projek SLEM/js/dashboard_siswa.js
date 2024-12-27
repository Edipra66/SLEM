// Fungsi untuk Menampilkan Data Siswa
document.addEventListener("DOMContentLoaded", () => {
    // Data Dummy Siswa (diambil dari Local Storage atau Server nantinya)
    const studentData = JSON.parse(localStorage.getItem("studentData")) || {
        fullname: "Nama Lengkap",
        school: "Nama Sekolah",
        classCode: "Kode Kelas"
    };

    // Menampilkan Data di Halaman
    document.getElementById("student-name").textContent = studentData.fullname.split(" ")[0] || "Siswa";
    document.getElementById("school-name").textContent = studentData.school;
    document.getElementById("student-fullname").textContent = studentData.fullname;
    document.getElementById("class-code").textContent = studentData.classCode;

    // Fungsi Menampilkan Notifikasi Terbaru
    const notifications = [
        "🔔 Tugas Matematika harus diselesaikan sebelum 20 Desember 2023!",
        "🔔 Kelompok IPA akan berdiskusi pada 22 Desember 2023!"
    ];

    const notificationBar = document.querySelector(".notification-bar p");
    notificationBar.textContent = notifications[0] || "Tidak ada notifikasi baru.";

    // Fungsi Ganti Foto Profil
    const profilePic = document.querySelector(".profile-pic");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png, image/jpeg";

    profilePic.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
                localStorage.setItem("profilePic", e.target.result); // Simpan gambar ke Local Storage
            };
            reader.readAsDataURL(file);
        }
    });

    // Muat Foto Profil jika tersedia
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic) {
        profilePic.src = savedProfilePic;
    }
});
