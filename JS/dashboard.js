const role = localStorage.getItem("role");

if (role === "admin") {
  document.getElementById("adminPanel").style.display = "block";
}

if (role === "faculty") {
  document.getElementById("facultyPanel").style.display = "block";
}