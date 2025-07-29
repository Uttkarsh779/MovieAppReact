import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import Cards from "./Partials/Cards";

const TvShows = () => {
  const { id } = useParams();
  // console.log(id);
  document.title = "UTFlex | TvShows";
  const navigate = useNavigate();
  const [Category, setCategory] = useState("top_rated");

  const [TvShows, setTvShows] = useState([]);
  const [Page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetTvShows = async () => {
    try {
      const { data } = await axios.get(
        `/tv/${Category}?language=en-US&page=${Page}`
      );

      const results = data.results;
      // console.log(results);

      if (data.results.length > 0) {
        setTvShows((prevState) => [...prevState, ...data.results]);
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
    if (TvShows.length === 0) {
      GetTvShows();
    } else {
      setPage(1);
      setTvShows([]);
      GetTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);
  return TvShows.length > 0 ? (
    <div className=" w-screen bg-[#1F1E24] ">
      <div className="pt-[1%] px-[3%] w-full flex items-center ">
        <div className="text-3xl  text-zinc-400 font-semibold flex ">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] duration-200 mr-2 ri-arrow-left-line "
          ></i>
          <span className="">TV_Shows </span>
          <small className="w-[10%] text-xs ml-3 mt-[12%] text-zinc-500">
            ({Category})
          </small>
        </div>
        <Topnav />
        <Dropdown
          title="Category"
          options={["top_rated", "popular", "on_the_air", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={TvShows.length}
        hasMore={hasMore}
        next={() => {
          GetTvShows();
        }}
        loader={<h4>Loading...</h4>}
      >
        <Cards cardData={TvShows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
