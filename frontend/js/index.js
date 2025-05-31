// Data destinasi contoh
const destinations = [
  { location: "Bali", category: "Pantai" },
  { location: "Jawa Timur", category: "Alam" },
  { location: "Lombok", category: "Pantai" },
  { location: "Magelang", category: "Sejarah" },
  { location: "Papua Barat", category: "Alam" },
  { location: "Sulawesi Selatan", category: "Budaya" },
  { location: "Yogyakarta", category: "Sejarah" },
];

// Fungsi untuk isi dropdown Lokasi
function populateLocations() {
  const locationSelect = document.getElementById("location");
  locationSelect.innerHTML = ""; // kosongkan dulu

  // Buat daftar lokasi unik
  const uniqueLocations = [...new Set(destinations.map((d) => d.location))];

  // Opsi default Semua Lokasi
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Semua Lokasi";
  locationSelect.appendChild(defaultOption);

  // Isi opsi lokasi
  uniqueLocations.forEach((loc) => {
    const option = document.createElement("option");
    option.value = loc;
    option.textContent = loc;
    locationSelect.appendChild(option);
  });
}

// Fungsi untuk isi dropdown Kategori
function populateCategories() {
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = ""; // kosongkan dulu

  // Daftar kategori unik
  const uniqueCategories = [...new Set(destinations.map((d) => d.category))];

  // Opsi default Semua Kategori
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Semua Kategori";
  categorySelect.appendChild(defaultOption);

  // Isi opsi kategori
  uniqueCategories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Jalankan saat halaman siap
window.addEventListener("DOMContentLoaded", () => {
  populateLocations();
  populateCategories();
});
