import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import TvShows from "./Components/TvShows";
import People from "./Components/People";
import MovieDetails from "./Components/MovieDetails";
import TvDetails from "./Components/TvDetails";
import PeopleDetails from "./Components/PeopleDetails";
import Trailer from "./Components/Partials/Trailer";
import Error from "./Components/Partials/Error";

const App = () => {
  return (
    <div className=" bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Movies" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/TV_Shows" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/People" element={<People />} />
        <Route path="/People/details/:id" element={<PeopleDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
