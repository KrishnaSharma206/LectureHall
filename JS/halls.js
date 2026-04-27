const token = localStorage.getItem("token");

async function addHall() {
  await fetch("https://lecturehall.onrender.com/api/halls", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      name: name.value,
      capacity: capacity.value,
      location: location.value,
      facilities: facilities.value.split(",")
    })
  });

  loadHalls();
}

async function loadHalls() {
  const res = await fetch("https://lecturehall.onrender.com/api/halls", {
    headers: { "Authorization": token }
  });

  const halls = await res.json();

  hallList.innerHTML = halls.map(h =>
    `<div class="card">${h.name} (${h.capacity})</div>`
  ).join("");
}

loadHalls();