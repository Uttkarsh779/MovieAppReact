import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import Cards from "./Partials/Cards";

const Movie = () => {
  document.title = "UTFlex | Movie";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("now_playing");

  const [Movie, setMovie] = useState([]);
  const [Page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${Category}?language=en-US&page=${Page}`
      );

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage(Page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("API fetch error:", error);
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if (Movie.length === 0) {
      GetMovie();
    } else {
      setPage(1);
      setMovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Category]);

  return Movie.length > 0 ? (
    <div className="w-full bg-[#1F1E24]  px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="pt-4 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl text-zinc-400 font-semibold flex items-center">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556cd] duration-200 mr-2 ri-arrow-left-line cursor-pointer"
            ></i>
            Movie
            <small className="ml-2 text-xs sm:text-sm text-zinc-600">
              {Category}
            </small>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <Topnav />
          <Dropdown
            title="Category"
            options={["upcoming", "top_rated", "popular", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={Movie.length}
        hasMore={hasMore}
        next={GetMovie}
        loader={<h4 className="text-center text-white py-4">Loading...</h4>}
      >
        <Cards cardData={Movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
