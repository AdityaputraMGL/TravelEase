// server.js
const express = require("express");
const path = require("path");

const app = express();

// Middleware untuk parsing JSON (jika dibutuhkan)
app.use(express.json());

// Serve static files dari folder frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Contoh route API sederhana (optional)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Tangani semua request lain dengan mengirim index.html (untuk SPA, opsional)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
