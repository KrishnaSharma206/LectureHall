const token = localStorage.getItem("token");

async function schedule() {
  const res = await fetch("https://lecturehall.onrender.com/api/scheduler/auto-schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      capacity: +capacity.value,
      startRange: new Date(startRange.value).toISOString(),
      endRange: new Date(endRange.value).toISOString(),
      durationMinutes: +duration.value,
      facilities: facilities.value.split(",")
    })
  });

  const data = await res.json();

  result.innerHTML = `
    <div class="card">
      Hall: ${data.hall.name}<br>
      Start: ${new Date(data.start).toLocaleString()}<br>
      End: ${new Date(data.end).toLocaleString()}
    </div>
  `;
}