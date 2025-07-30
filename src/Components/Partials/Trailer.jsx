import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "Movie" : "Tv";
  // console.log(category);

  const ytvideo = useSelector((state) => state[category].info.videos);

  console.log("this is from ytvideo", ytvideo);
  // console.log(pathname.includes("movie"), ytvideo);
  // console.log(pathname.includes("tv"), ytvideo);

  const trailer = ytvideo.results.filter((video) => video.type === "Trailer");

  // console.log(category);

  // console.log("Trailer key:", trailer[0]?.key);

  return (
    trailer && (
      <div className="absolute top-0 z-[100] bg-[rgba(0,0,0,0.9)] left-0 w-screen h-full flex items-center justify-center">
        <Link
          onClick={() => navigate(-1)}
          className="ri-close-large-line text-white text-3xl right-[20%] top-[20%] absolute"
        ></Link>
        <ReactPlayer
          height={500}
          width={800}
          controls
          src={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}

          // url={`https://www.youtube.com/watch?v=${trailer[0]?.key}`}
        />
      </div>
    )
  );
};

export default Trailer;
