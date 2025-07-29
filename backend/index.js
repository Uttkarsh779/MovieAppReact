const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  },
});

// Get popular movies
app.get("/api/tmdb/popular", async (req, res) => {
  try {
    const response = await TMDB.get("/movie/popular");
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// Get movie details
// backend/index.js
app.get("/api/tmdb/trending/:type/day", async (req, res) => {
  const { type } = req.params;
  try {
    const response = await TMDB.get(`/trending/${type}/day`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending content" });
  }
});

// You can add more routes like trending, people, tv shows etc.

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
