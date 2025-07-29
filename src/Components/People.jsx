import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./Partials/Topnav";
import Dropdown from "./Partials/Dropdown";
import Cards from "./Partials/Cards";

const People = () => {
  const navigate = useNavigate();
  const [Category, setCategory] = useState("");

  const [People, setPeople] = useState([]);
  const [Page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(
        `/person/popular?language=en-US&page=${Page}`
      );

      const results = data.results;
      // console.log(results);

      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
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
    if (People.length === 0) {
      GetPeople();
    } else {
      setPage(1);
      setPeople([]);
      GetPeople();
      document.title = `UTFlex | People`;
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [Category]);
  return People.length > 0 ? (
    <div className=" w-screen bg-[#1F1E24] ">
      <div className="pt-[1%] px-[3%] w-full flex items-center">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className=" hover:text-[#6556cd] duration-200 mr-2 ri-arrow-left-line"
          ></i>
          People
        </h1>
        <Topnav />
      </div>
      <InfiniteScroll
        dataLength={People.length}
        hasMore={hasMore}
        next={() => {
          console.log("i am from next ");
          GetPeople();
        }}
        loader={<h4>Loading...</h4>}
      >
        <Cards cardData={People} title="People" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
