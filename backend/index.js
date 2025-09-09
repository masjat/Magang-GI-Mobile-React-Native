const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Health check
app.get("/", (_, res) => res.json({ ok: true }));

// GET by NIM
app.get("/mahasiswa/:nim", async (req, res) => {
  try {
    const { nim } = req.params;
    const { rows } = await pool.query("SELECT * FROM mahasiswa WHERE nim=$1", [nim]);
    if (!rows.length) return res.json(null);
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// GET list
app.get("/mahasiswa", async (_, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM mahasiswa ORDER BY nim ASC");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create
app.post("/mahasiswa", async (req, res) => {
  try {
    const { nim, name, gender, address, phone } = req.body;
    if (!nim || !name) return res.status(400).json({ error: "nim dan name wajib" });

    const { rows } = await pool.query(
      "INSERT INTO mahasiswa (nim, name, gender, address, phone) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [nim, name, gender || null, address || null, phone || null]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === "23505") { // duplicate key
      return res.status(409).json({ error: "NIM sudah terdaftar" });
    }
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE by NIM
app.delete("/mahasiswa/:nim", async (req, res) => {
  try {
    const { nim } = req.params;
    await pool.query("DELETE FROM mahasiswa WHERE nim=$1", [nim]);
    res.json({ message: `Mahasiswa dengan NIM ${nim} dihapus` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API ready on port ${PORT}`));
