// Ambil data destinasi dan render detailnya
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

const destinations = [
  // sama dengan array di results.js / backend/data.js
];

const dest = destinations.find((d) => d.id === id);

if (!dest) {
  document.getElementById("detail-container").innerHTML =
    "<p>Destinasi tidak ditemukan.</p>";
} else {
  document.getElementById("dest-name").textContent = dest.name;
  document.getElementById("dest-image").src = dest.image;
  document.getElementById("dest-description").textContent = dest.description;

  const facilitiesList = document.getElementById("dest-facilities");
  facilitiesList.innerHTML = "";
  dest.facilities.forEach((facility) => {
    const li = document.createElement("li");
    li.textContent = facility;
    facilitiesList.appendChild(li);
  });

  document.getElementById("dest-location").textContent = dest.location;
  document.getElementById("dest-category").textContent = dest.category;
  document.getElementById("dest-rating").textContent = dest.rating;
  document.getElementById("dest-price").textContent =
    dest.price.toLocaleString();

  // Tangani form pemesanan tiket
  const bookingForm = document.getElementById("booking-form");
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const ticketQuantity = parseInt(
      document.getElementById("ticketQuantity").value
    );

    if (!customerName || ticketQuantity < 1) {
      alert("Harap isi nama pemesan dan jumlah tiket dengan benar.");
      return;
    }

    // Kirim data pemesanan ke backend
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationId: dest.id,
        customerName,
        ticketQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Pemesanan berhasil! Terima kasih, " + customerName);
        bookingForm.reset();
      })
      .catch((err) => {
        alert("Gagal melakukan pemesanan. Silakan coba lagi.");
        console.error(err);
      });
  });
}
