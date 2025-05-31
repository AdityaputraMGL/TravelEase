const destinations = [
  {
    id: 1,
    name: "Pantai Kuta",
    location: "Bali",
    category: "Pantai",
    rating: 4.3,
    price: 50000,
    image: "images/pantai-kuta.jpg",
  },
  {
    id: 2,
    name: "Candi Borobudur",
    location: "Magelang",
    category: "Sejarah",
    rating: 4.7,
    price: 75000,
    image: "images/candi-borobudur.jpg",
  },
  {
    id: 3,
    name: "Keraton Yogyakarta",
    location: "Yogyakarta",
    category: "Sejarah",
    rating: 4.2,
    price: 30000,
    image: "images/keraton-jogja.jpg",
  },
  {
    id: 4,
    name: "Pantai Senggigi",
    location: "Lombok",
    category: "Pantai",
    rating: 4.1,
    price: 40000,
    image: "images/pantai-senggigi.jpg",
  },
  {
    id: 5,
    name: "Raja Ampat",
    location: "Papua Barat",
    category: "Alam",
    rating: 4.9,
    price: 150000,
    image: "images/raja-ampat.jpg",
  },
  {
    id: 6,
    name: "Bantimurung",
    location: "Sulawesi Selatan",
    category: "Alam",
    rating: 4.4,
    price: 20000,
    image: "images/bantimurung.jpg",
  },
  {
    id: 7,
    name: "Tana Toraja",
    location: "Sulawesi Selatan",
    category: "Budaya",
    rating: 4.6,
    price: 80000,
    image: "images/tana-toraja.jpg",
  },
  {
    id: 8,
    name: "Kawah Ijen",
    location: "Jawa Timur",
    category: "Alam",
    rating: 4.5,
    price: 60000,
    image: "images/kawah-ijen.jpg",
  },
];

// Ambil parameter query string URL
const params = new URLSearchParams(window.location.search);
const locationParam = params.get("location") || "";
const categoryParam = params.get("category") || "";
const minRatingParam = parseFloat(params.get("minRating")) || 0;

const resultsContainer = document.getElementById("results-container");
const bookingModal = document.getElementById("bookingModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const bookingForm = document.getElementById("bookingForm");
const errorMsg = document.getElementById("errorMsg");

// Filter destinasi berdasarkan parameter pencarian
function filterDestinations() {
  return destinations.filter((dest) => {
    const matchLocation =
      !locationParam ||
      dest.location.toLowerCase() === locationParam.toLowerCase();
    const matchCategory =
      !categoryParam ||
      dest.category.toLowerCase() === categoryParam.toLowerCase();
    const matchRating = dest.rating >= minRatingParam;

    return matchLocation && matchCategory && matchRating;
  });
}

// Render hasil pencarian ke halaman
function renderResults() {
  const filtered = filterDestinations();
  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsContainer.innerHTML =
      "<p>Tidak ada destinasi sesuai kriteria pencarian.</p>";
    return;
  }

  filtered.forEach((dest) => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <h2>${dest.name}</h2>
      <img src="${dest.image}" alt="${dest.name}" />
      <p>Lokasi: ${dest.location}</p>
      <p>Kategori: ${dest.category}</p>
      <p>Rating: ${dest.rating}</p>
      <p>Harga Tiket: Rp${dest.price.toLocaleString("id-ID")}</p>
      <button class="book-btn" data-id="${dest.id}">Pesan Tiket</button>
    `;

    resultsContainer.appendChild(card);
  });

  // Pasang event listener ke tombol "Pesan Tiket"
  document.querySelectorAll(".book-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openBookingModal(btn.getAttribute("data-id"));
    });
  });
}

let selectedDestination = null;

// Buka modal dan isi data destinasi yang dipilih
function openBookingModal(id) {
  selectedDestination = destinations.find((d) => d.id == id);
  if (!selectedDestination) return;

  bookingModal.style.display = "block";
  errorMsg.style.display = "none";
  bookingForm.reset();
}

// Tutup modal
closeModalBtn.onclick = () => {
  bookingModal.style.display = "none";
};

// Tutup modal kalau klik di luar modal content
window.onclick = function (event) {
  if (event.target == bookingModal) {
    bookingModal.style.display = "none";
  }
};

// Validasi dan proses pemesanan tiket
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = this.name.value.trim();
  const contact = this.contact.value.trim();
  const quantity = parseInt(this.quantity.value);
  const date = this.date.value;
  const payment = this.payment.value;

  // Validasi input
  if (!name) {
    showError("Nama lengkap harus diisi!");
    return;
  }
  if (!contact || !isValidContact(contact)) {
    showError("Email atau nomor telepon tidak valid!");
    return;
  }
  if (!quantity || quantity < 1) {
    showError("Jumlah tiket minimal 1!");
    return;
  }
  if (!date || !isValidDate(date)) {
    showError("Tanggal kunjungan tidak valid!");
    return;
  }
  if (!payment) {
    showError("Metode pembayaran harus dipilih!");
    return;
  }

  // Simulasi pemesanan tiket (ganti dengan API backend jika ada)
  alert(
    `Terima kasih, ${name}! Tiket untuk ${selectedDestination.name} berhasil dipesan sebanyak ${quantity} tiket pada tanggal ${date}. Metode pembayaran: ${payment}`
  );

  bookingModal.style.display = "none";
  bookingForm.reset();
});

// Tampilkan pesan error di modal
function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}

// Validasi email atau nomor telepon
function isValidContact(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{7,15}$/; // nomor telepon dengan 7-15 digit
  return emailRegex.test(input) || phoneRegex.test(input);
}

// Validasi tanggal (tidak boleh di masa lalu)
function isValidDate(dateStr) {
  const today = new Date();
  const inputDate = new Date(dateStr);
  today.setHours(0, 0, 0, 0); // set ke awal hari
  return inputDate >= today;
}

// Jalankan render saat halaman siap
document.addEventListener("DOMContentLoaded", renderResults);
