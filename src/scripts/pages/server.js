import express from "express";

const app = express();
const port = 3000;

// Middleware untuk baca body JSON
app.use(express.json());

// Endpoint GET sederhana
app.get("/api/halo", (req, res) => {
  res.json({ pesan: "Halo dari API JavaScript!" });
});

// Endpoint POST sederhana
app.post("/api/data", (req, res) => {
  const { nama } = req.body;
  res.json({ pesan: `Hai, ${nama}!` });
});

// Jalankan server
app.listen(port, () => {
  console.log(`API berjalan di http://localhost:${port}`);
});
