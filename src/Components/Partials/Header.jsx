import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    data && (
      <div
        className="w-full h-[35vh] sm:h-[45vh] md:h-[53vh] flex flex-col justify-end rounded bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.profile_path
          })`,
        }}
      >
        <div className="ml-4 sm:ml-6 md:ml-10">
          {/* Title */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4 py-2 sm:px-6 sm:py-3 leading-tight">
            {data.title ||
              data.original_title ||
              data.name ||
              data.original_name}
          </h1>

          {/* Overview */}
          <p className="text-white px-4 sm:px-6 text-sm sm:text-base max-w-[95%] sm:max-w-[85%] leading-relaxed">
            {data.overview}...
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              className="text-blue-300 ml-1"
            >
              more
            </Link>
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center px-4 sm:px-6 py-2 gap-x-6 gap-y-2 text-white text-sm sm:text-base">
            <div className="flex items-center">
              <i className="text-yellow-300 text-lg sm:text-xl ri-megaphone-fill"></i>
              <span className="ml-2">{data.release_date}</span>
            </div>
            <div className="flex items-center">
              <i className="text-yellow-300 text-lg sm:text-xl ri-clapperboard-fill"></i>
              <span className="ml-2 capitalize">{data.media_type}</span>
            </div>
          </div>

          {/* Watch Trailer Button */}
          <div className="px-4 sm:px-6 py-3 mb-6 sm:mb-12">
            <Link
              to={`/${data.media_type}/details/${data.id}/trailer`}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold bg-[#6556cd] text-white rounded-md hover:bg-[#574cbd] transition-colors duration-200"
            >
              Watch Trailer
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
