import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import Cards from "./Partials/Cards";

const Popular = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("movie");

  const [Popular, setPopular] = useState([]);
  const [Page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(
        `/${Category}/popular?language=en-US&page=${Page}`
      );

      const results = data.results;
      // console.log(results);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
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
    if (Popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setPopular([]);
      GetPopular();
      document.title = `UTFlex | Popular`;
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);
  return Popular.length > 0 ? (
    <div className=" w-screen bg-[#1F1E24] ">
      <div className="pt-[1%] px-[3%] w-full flex items-center">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] duration-200 mr-2 ri-arrow-left-line"
          ></i>
          Popular
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["tv", "movie"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
      </div>
      <InfiniteScroll
        dataLength={Popular.length}
        hasMore={hasMore}
        next={() => {
          console.log("i am from next ");
          GetPopular();
        }}
        loader={<h4>Loading...</h4>}
      >
        <Cards cardData={Popular} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
