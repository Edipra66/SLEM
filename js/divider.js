// JavaScript untuk Divider Guru dan Siswa

document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("student-form");
    const teacherForm = document.getElementById("teacher-form");

    // Fungsi untuk Proses Formulir Siswa
    if (studentForm) {
        studentForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const classCode = document.getElementById("class-code").value;
            const school = document.getElementById("school").value;



            // Simpan Data ke Local Storage
            const studentData = { classCode, school };
            localStorage.setItem("studentData", JSON.stringify(studentData));
            alert("Data berhasil disimpan! Mengarahkan ke dashboard siswa...");
            window.location.href = "dashboard_siswa.html";
        });
    }

    // Fungsi untuk Proses Formulir Guru
    if (teacherForm) {
        teacherForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullname = document.getElementById("fullname").value;
            const school = document.getElementById("school").value;
            const subject = document.getElementById("subject").value;



            // Simpan Data ke Local Storage
            const teacherData = { fullname, school, subject };
            localStorage.setItem("teacherData", JSON.stringify(teacherData));
            alert("Data berhasil disimpan! Mengarahkan ke dashboard guru...");
            window.location.href = "dashboard_guru.html";
        });
    }
});
