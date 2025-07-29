import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

const HorizontalCards = ({ data }) => {
  const Shorten = (overview, x) => {
    return overview.slice(0, x);
  };
  return (
    data && (
      <div className="h-[42vh] w-full pt-0 p-5 mb-15">
        {/* {console.log(data)} */}

        <div className="flex gap-3 w-full h-full overflow-hidden overflow-x-auto pb-2 mb-5">
          {data.map((data, index) => (
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              key={index}
              className="max-w-[25vh] min-w-[25vh] h-full bg-zinc-900"
            >
              <img
                className="w-full h-[50%] shadow-sm"
                src={
                  data.backdrop_path || data.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        data.backdrop_path || data.profile_path
                      }`
                    : "public/images/no_image.avif"
                }
                alt="img"
              />
              <h1 className=" text-2xl p-1 text-white font-semibold ">
                {Shorten(
                  data.title ||
                    data.original_title ||
                    data.name ||
                    data.original_name,
                  11
                )}
              </h1>
              <p className="p-1 text-sm text-white ">
                {Shorten(data.overview, 50)}
                {/* {data.overview} */}
                {/* <NavLink
                to={`/${data.media_type}/details/${data.id}`}
                className="text-zinc-400"
              >
                ...more
              </NavLink> */}
              </p>
            </Link>
          ))}

          {/* <div className="max-w-[25vh] h-full bg-red-200 ">
          <img className="w-full h-[50%] shadow-sm" src="#" alt="img" />
          <h1 className="text-3xl">Movie Title</h1>
          <p className=" p-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi,
            sunt.
          </p>
        </div> */}
        </div>
      </div>
    )
  );
};

export default HorizontalCards;
