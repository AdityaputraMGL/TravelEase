const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const nameEl = document.getElementById("name");
const descEl = document.getElementById("description");
const locEl = document.getElementById("location");
const catEl = document.getElementById("category");
const ratingEl = document.getElementById("rating");
const priceEl = document.getElementById("price");
const facilitiesEl = document.getElementById("facilities");
const messageEl = document.getElementById("message");
const bookingForm = document.getElementById("bookingForm");

async function loadDestination() {
  const response = await fetch(`http://localhost:3000/api/destinations/${id}`);
  if (!response.ok) {
    nameEl.textContent = "Destinasi tidak ditemukan";
    return;
  }
  const d = await response.json();
  nameEl.textContent = d.name;
  descEl.textContent = d.description;
  locEl.textContent = d.location;
  catEl.textContent = d.category;
  ratingEl.textContent = d.rating;
  priceEl.textContent = d.price.toLocaleString();
  facilitiesEl.textContent = d.facilities.join(", ");
}

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const tickets = parseInt(document.getElementById("ticketsInput").value);

  if (!name || !email || !tickets || tickets < 1) {
    messageEl.textContent = "Mohon isi semua field dengan benar.";
    return;
  }

  const response = await fetch("http://localhost:3000/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destinationId: parseInt(id), name, email, tickets }),
  });

  const data = await response.json();
  if (response.ok) {
    messageEl.textContent = data.message;
    bookingForm.reset();
  } else {
    messageEl.textContent = data.message || "Terjadi kesalahan saat booking.";
  }
});

loadDestination();
