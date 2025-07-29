import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";

import axios from "../utils/axios";
import Cards from "./Partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

document.title = `UTFlex | Trending`;

const Trending = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("all");
  const [Duration, setDuration] = useState("day");
  const [Trending, setTrending] = useState([]);
  const [Page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const GetTrending = async (pageToFetch) => {
  //   try {
  //     const data = await axios.get(
  //       `trending/${Category}/${Duration}?language=en-US&page=${pageToFetch}`
  //     );
  //     setPage(pageToFetch + 1);

  //     // console.log(data.data.results);
  //     if (data.data.results.length === 0) {
  //       setHasMore(false);
  //       return;
  //     }
  //     console.log("hello from trending");
  //     setTrending((prev) => [...prev, ...data.data.results]);

  //     // setTrending(data.data.results);
  //     console.log(Trending);
  //     // console.log(data.data.results.length);

  //     // setTrending(
  //     //   data.data.results[(Math.random() * data.data.results.length).toFixed()]
  //     // );
  //   } catch (error) {
  //     console.log("error: ", error);
  //     setHasMore(false);
  //   }
  // };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${Category}/${Duration}?language=en-US&page=${Page}`
      );
      // console.log(data);

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(Page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("API fetch error:", error);
      setHasMore(false);
    }
  };

  // useEffect(() => {
  //   GetTrending();
  // }, [Duration, Category]);

  const refreshHandler = () => {
    if (Trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      setTrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category, Duration]);

  // console.log(Trending);

  return Trending.length > 0 ? (
    <div className=" w-screen bg-[#1F1E24] ">
      <div className="pt-[1%] px-[3%] w-full flex items-center">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] duration-200 mr-2 ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["tv", "movie", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["day", "week"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={Trending.length}
        hasMore={hasMore}
        next={GetTrending}

        // loader={<h4>Loading...</h4>}
      >
        <Cards cardData={Trending} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
