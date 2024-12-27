// Fungsi Utama JavaScript untuk Login dan Register

document.addEventListener("DOMContentLoaded", () => {
    // Tombol Submit Form
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // Simulasi Database Sementara
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Fungsi Register
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullname = document.getElementById("fullname").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            if (password !== confirmPassword) {
                alert("Kata sandi tidak cocok!");
                return;
            }

            if (users.find((user) => user.username === username)) {
                alert("Nama pengguna sudah terdaftar!");
                return;
            }

            users.push({ fullname, username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Pendaftaran berhasil!");
            window.location.href = "login.html";
        });
    }

    // Fungsi Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const user = users.find(
                (user) => user.username === username && user.password === password
            );

            if (!user) {
                alert("Nama pengguna atau kata sandi salah!");
                return;
            }

            alert(`Selamat datang, ${user.fullname}!`);
            window.location.href = "divider.html";
        });
    }
});

// Divider

