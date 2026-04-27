async function login() {
  const res = await fetch("https://lecturehall.onrender.com/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed");
  }
}