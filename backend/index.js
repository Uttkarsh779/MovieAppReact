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
app.get("/api/tmdb/trending/:type/:time", async (req, res) => {
  const { type, time } = req.params; // type = movie/tv/all, time = day/week

  if (!["day", "week"].includes(time)) {
    return res.status(400).json({ error: "Invalid time window" });
  }

  try {
    const response = await TMDB.get(`/trending/${type}/${time}`);
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

// app.get("/api/tmdb/person/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [detail, externalid, combinedCredits] = await Promise.all([
//       TMDB.get(`/person/${id}`),
//       TMDB.get(`/person/${id}/external_ids`),
//       TMDB.get(`/person/${id}/combined_credits`),
//     ]);

//     res.status(200).json({
//       detail: detail.data,
//       externalid: externalid.data,
//       combinedCredits: combinedCredits.data,
//     });
//   } catch (err) {
//     console.error("Error fetching person detail:", err.message);
//     res.status(500).json({ error: "Failed to fetch person details" });
//   }
// });

app.get("/api/tmdb/person/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await TMDB.get(`/person/${id}`);
    res.json(detail.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch person details" });
  }
});

app.get("/api/tmdb/person/:id/external_ids", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/person/${id}/external_ids`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch external IDs" });
  }
});

app.get("/api/tmdb/person/:id/combined_credits", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/person/${id}/combined_credits`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch combined credits" });
  }
});

app.get("/api/tmdb/person/:id/movie_credits", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/person/${id}/movie_credits`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie credits" });
  }
});

app.get("/api/tmdb/person/:id/tv_credits", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/person/${id}/tv_credits`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TV credits" });
  }
});

// app.get("/api/tmdb/movie/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [detail, externalid, recommendations, similar] = await Promise.all([
//       TMDB.get(`/movie/${id}`),
//       TMDB.get(`/movie/${id}/external_ids`),
//       TMDB.get(`/movie/${id}/recommendations`),
//       TMDB.get(`/movie/${id}/similar`),
//     ]);

//     res.status(200).json({
//       detail: detail.data,
//       externalid: externalid.data,
//       recommendations: recommendations.data,
//       similar: similar.data,
//     });
//   } catch (error) {
//     console.error("Error fetching movie details:", error.message);
//     res.status(500).json({ error: "Failed to fetch movie data" });
//   }
// });

app.get("/api/tmdb/tv/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/tv/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TV details" });
  }
});

app.get("/api/tmdb/tv/:id/recommendations", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/tv/${id}/recommendations`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

app.get("/api/tmdb/tv/:id/external_ids", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/tv/${id}/external_ids`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch external IDs" });
  }
});

app.get("/api/tmdb/tv/:id/similar", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/tv/${id}/similar`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch similar TV shows" });
  }
});

app.get("/api/tmdb/tv/:id/videos", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/tv/${id}/videos`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

app.get("/api/tmdb/tv/:id/watch/providers", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/tv/${id}/watch/providers`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watch providers" });
  }
});

// Get Movie Details
app.get("/api/tmdb/movie/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/movie/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// Get Movie Recommendations
app.get("/api/tmdb/movie/:id/recommendations", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/movie/${id}/recommendations`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

// Get Movie External IDs (IMDB, Wikidata, etc.)
app.get("/api/tmdb/movie/:id/external_ids", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/movie/${id}/external_ids`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch external IDs" });
  }
});

// Get Similar Movies
app.get("/api/tmdb/movie/:id/similar", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/movie/${id}/similar`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch similar movies" });
  }
});

// Get Movie Videos (for trailers)
app.get("/api/tmdb/movie/:id/videos", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/movie/${id}/videos`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// Get Watch Providers for the Movie
app.get("/api/tmdb/movie/:id/watch/providers", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await TMDB.get(`/movie/${id}/watch/providers`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watch providers" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch details
    const [detail, externalid, recommendations, similar] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${TMDB_API_KEY}`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      ),
    ]);

    res.status(200).json({
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data,
      similar: similar.data,
    });
  } catch (error) {
    console.error("Error fetching TV details:", error.message);
    res.status(500).json({ error: "Failed to fetch TV details" });
  }
});

app.get("/api/tmdb/search/multi", async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await TMDB.get(`/search/multi`, {
      params: {
        query,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("TMDB search error:", err.message);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

app.get("*", async (req, res) => {
  res.send("Error.jsx");
});

// You can add more routes like trending, people, tv shows etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
