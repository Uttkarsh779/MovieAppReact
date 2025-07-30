import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  const Shorten = (overview, x) => overview?.slice(0, x) || "";

  return (
    data && (
      <div className="w-full p-4">
        <div className="flex gap-4 overflow-x-auto pb-3 scroll-smooth">
          {data.map((item, index) => (
            <Link
              to={`/${item.media_type}/details/${item.id}`}
              key={index}
              className="flex-shrink-0 bg-zinc-900 rounded-md shadow-md w-[18vh] sm:w-[22vh] md:w-[25vh]"
            >
              <img
                className="w-full h-[30%] sm:h-[40%] md:h-[50%] object-cover rounded-t-md"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path || item.profile_path
                      }`
                    : "/images/no_image.avif"
                }
                alt="img"
              />
              <h1 className="text-sm sm:text-base text-white font-semibold px-2 pt-1 truncate">
                {Shorten(
                  item.title ||
                    item.original_title ||
                    item.name ||
                    item.original_name,
                  25
                )}
              </h1>
              <p className="text-xs sm:text-sm text-white px-2 pb-2 line-clamp-2">
                {Shorten(item.overview, 60)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default HorizontalCards;
