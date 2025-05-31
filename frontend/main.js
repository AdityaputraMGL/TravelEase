const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = document.getElementById("location").value;
  const category = document.getElementById("category").value;
  const minRating = document.getElementById("minRating").value;

  let query = [];
  if (location) query.push(`location=${encodeURIComponent(location)}`);
  if (category) query.push(`category=${encodeURIComponent(category)}`);
  if (minRating) query.push(`minRating=${encodeURIComponent(minRating)}`);

  const url = `http://localhost:3000/api/destinations${
    query.length ? "?" + query.join("&") : ""
  }`;

  const response = await fetch(url);
  const destinations = await response.json();

  resultsDiv.innerHTML = "";
  if (destinations.length === 0) {
    resultsDiv.textContent = "Tidak ada destinasi ditemukan.";
    return;
  }

  destinations.forEach((d) => {
    const div = document.createElement("div");
    div.className = "destination";

    div.innerHTML = `
      <h3><a href="detail.html?id=${d.id}">${d.name}</a></h3>
      <p>Lokasi: ${d.location}</p>
      <p>Kategori: ${d.category}</p>
      <p>Rating: ${d.rating}</p>
      <p>Harga Tiket: Rp${d.price.toLocaleString()}</p>
    `;

    resultsDiv.appendChild(div);
  });
});
