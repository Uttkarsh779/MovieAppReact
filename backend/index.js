const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// const cors = require("cors");
// app.use(cors());

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

// Get movies by category like now_playing, popular, top_rated, upcoming
app.get("/api/tmdb/movie/:category", async (req, res) => {
  const { category } = req.params;
  const { page, language } = req.query;

  try {
    const response = await TMDB.get(`/movie/${category}`, {
      params: { page, language },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Movie fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch movies by category" });
  }
});

app.get("/api/tmdb/tv/:category", async (req, res) => {
  const { category } = req.params;
  const { page, language } = req.query;

  try {
    const response = await TMDB.get(`/tv/${category}`, {
      params: { page, language },
    });
    res.json(response.data);
  } catch (err) {
    console.error("TV Shows fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch TV shows by category" });
  }
});

app.get("/api/tmdb/person/popular", async (req, res) => {
  const { page, language } = req.query;

  try {
    const response = await TMDB.get("/person/popular", {
      params: { page, language },
    });
    res.json(response.data);
  } catch (err) {
    console.error("People fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch popular people" });
  }
});

// You can add more routes like trending, people, tv shows etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
