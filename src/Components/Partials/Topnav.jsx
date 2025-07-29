import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const Topnav = () => {
  const [Input, SetInput] = useState("");
  const [Search, setSearch] = useState([]);

  const clearInput = () => {
    SetInput("");
  };

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${Input}`);
      setSearch(data.results);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (Input.trim().length > 0) {
      GetSearches();
    } else {
      setSearch([]);
    }
  }, [Input]);

  return (
    <div className="w-full h-[8vh] px-4 sm:px-6 md:px-10 relative flex justify-center items-center bg-[#1F1E24]">
      <i className="text-xl sm:text-2xl text-zinc-200 ri-search-line"></i>

      <input
        onChange={(e) => SetInput(e.target.value)}
        className="mx-4 sm:mx-6 w-full sm:w-[60%] md:w-[50%] lg:w-[40%] text-zinc-200 font-semibold px-3 py-1 bg-transparent  border-zinc-400 outline-none"
        type="text"
        placeholder="Search Anything"
        value={Input}
      />

      <i
        onClick={clearInput}
        className={`text-2xl sm:text-3xl text-zinc-200 ri-close-line cursor-pointer ${
          Input.length > 0 ? "visible" : "invisible"
        }`}
      ></i>

      {/* Search Dropdown */}
      {Search.length > 0 && (
        <div className="absolute top-[110%] w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[60vh] overflow-auto bg-zinc-200 rounded shadow-md z-50">
          {Search.map((data, index) => (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={index}
              onClick={() => SetInput("")}
              className="flex items-center gap-4 p-3 border-b border-zinc-300 hover:bg-zinc-300 duration-200"
            >
              <img
                className="h-16 w-24 object-cover rounded"
                src={
                  data.backdrop_path || data.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        data.backdrop_path || data.profile_path
                      }`
                    : "/images/no_image.avif"
                }
                alt="img"
              />
              <span className="font-semibold text-zinc-700 text-sm sm:text-base line-clamp-2">
                {data.title ||
                  data.original_title ||
                  data.name ||
                  data.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Topnav;
