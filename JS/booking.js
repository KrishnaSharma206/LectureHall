const token = localStorage.getItem("token");

async function book() {
  await fetch("http://localhost:5000/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({
      hall: hall.value,
      startDateTime: new Date(start.value).toISOString(),
      endDateTime: new Date(end.value).toISOString(),
      purpose: purpose.value
    })
  });

  alert("Booking sent");
}