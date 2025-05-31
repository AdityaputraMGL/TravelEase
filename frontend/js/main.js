const form = document.getElementById("searchForm");
const resultsEl = document.getElementById("results");
const locSelect = document.getElementById("location");

async function populateLocations() {
  try {
    const res = await fetch("/api/destinations");
    const all = await res.json();
    const uniq = Array.from(new Set(all.map((d) => d.location))).sort();
    locSelect.innerHTML = '<option value="">Semua Lokasi</option>';
    uniq.forEach((loc) => {
      const opt = document.createElement("option");
      opt.value = loc;
      opt.textContent = loc;
      locSelect.appendChild(opt);
    });
  } catch {
    resultsEl.textContent = "Gagal memuat lokasi.";
  }
}

async function loadDestinations(filters = {}) {
  const params = new URLSearchParams(filters);
  const url =
    "/api/destinations" + (params.toString() ? "?" + params.toString() : "");
  let list;
  try {
    const res = await fetch(url);
    list = await res.json();
  } catch {
    resultsEl.textContent = "Gagal terhubung ke server.";
    return;
  }

  resultsEl.innerHTML = "";
  if (!Array.isArray(list) || list.length === 0) {
    resultsEl.textContent = "Destinasi tidak ditemukan.";
    return;
  }

  list.forEach((d) => {
    const card = document.createElement("div");
    card.className = "destination";
    card.innerHTML = `
      <h3><a href="detail.html?id=${d.id}">${d.name}</a></h3>
      <img src="${d.image}" alt="${d.name}" class="destination-image" />
      <p>Lokasi: ${d.location}</p>
      <p>Kategori: ${d.category}</p>
      <p>Rating: ${d.rating.toFixed(1)}</p>
      <p>Harga Tiket: Rp${d.price.toLocaleString()}</p>
    `;
    resultsEl.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  resultsEl.textContent = "Silakan cari destinasi terlebih dahulu.";
  populateLocations();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = locSelect.value;
  const category = document.getElementById("category").value;
  let minRating = document.getElementById("minRating").value;
  if (minRating.endsWith("+")) minRating = minRating.slice(0, -1);

  const filters = {};
  if (location) filters.location = location;
  if (category) filters.category = category;
  if (minRating) filters.minRating = minRating;

  loadDestinations(filters);
});
