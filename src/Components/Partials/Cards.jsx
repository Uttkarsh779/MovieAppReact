import React from "react";
import { Link, useParams } from "react-router-dom";

const Cards = ({ cardData, title }) => {
  const { data } = useParams();

  return (
    <div className="w-full flex flex-wrap justify-center gap-6 p-4 bg-[#1F1E24]">
      {cardData.map((data, index) => (
        <Link
          to={`/${data.media_type || title}/details/${data.id}`}
          key={index}
          className="w-full sm:w-[45%] md:w-[30%] lg:w-[20%] mt-4"
        >
          <img
            className="w-full h-[40vh] object-cover shadow-lg rounded"
            src={
              data.backdrop_path || data.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    data.backdrop_path || data.profile_path
                  }`
                : "public/images/no_image.avif"
            }
            alt="img"
          />
          <h1 className="text-lg sm:text-xl text-zinc-300 mt-2 text-center font-semibold">
            {data.title ||
              data.original_title ||
              data.name ||
              data.original_name}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
