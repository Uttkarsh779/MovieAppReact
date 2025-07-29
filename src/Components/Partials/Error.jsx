import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-full relative">
      <img className="w-full h-full" src="/error.gif" alt="" />
      <Link
        to={"/"}
        className="text-white rounded text-3xl absolute top-[75%] left-[41%] bg-blue-300 px-20 py-5"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Error;
