const notifications = [
    {
        id: 1,
        type: "Tugas Baru",
        message: "Tugas Matematika baru telah ditambahkan.",
        dueDate: "20 Desember 2023",
        link: "tugas.html?id=1"
    },
    {
        id: 2,
        type: "Tenggat Waktu",
        message: "Tenggat waktu tugas IPA mendekat!",
        dueDate: "22 Desember 2023",
        link: "tugas.html?id=2"
    },
    {
        id: 3,
        type: "Tugas Dinilai",
        message: "Tugas Bahasa Indonesia telah dinilai.",
        dueDate: "Sudah Selesai",
        link: "tugas.html?id=3"
    }
];

// Simpan di Local Storage (simulasi)
localStorage.setItem("notifications", JSON.stringify(notifications));

// Tampilan Notifikasi
document.addEventListener("DOMContentLoaded", () => {
    const notificationList = document.getElementById("notifications");

    // Ambil notifikasi dari Local Storage
    const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

    // Tampilkan notifikasi
    notifications.forEach(notification => {
        const li = document.createElement("li");
        li.classList.add("notification-item");
        li.innerHTML = `
            <span class="notification-date">${notification.dueDate}</span>
            <p>${notification.message} <a href="${notification.link}" class="notification-link">Lihat Tugas</a></p>
        `;
        notificationList.appendChild(li);
    });
});
