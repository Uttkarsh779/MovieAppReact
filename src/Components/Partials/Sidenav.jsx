import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#6556cd] p-2 rounded focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`ri-${isOpen ? "close" : "menu"}-line text-2xl`}></i>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 h-full w-[70%] md:w-[20%] bg-[#1F1E24] border-r border-zinc-700 p-6 transition-transform duration-300 z-40`}
      >
        <h1 className="text-2xl font-bold mt-2">
          <i className="ri-tv-fill mr-2 text-[#6556cd]"></i>
          <span className="text-white">UTFlex</span>
        </h1>

        <nav className="flex flex-col text-zinc-400 text-lg md:text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10">New Feeds</h1>
          {[
            { to: "/Trending", icon: "fire-fill", text: "Trending" },
            { to: "/Popular", icon: "bard-fill", text: "Popular" },
            { to: "/Movies", icon: "film-fill", text: "Movies" },
            { to: "/TV_Shows", icon: "tv-2-fill", text: "TV Shows" },
            { to: "/People", icon: "team-fill", text: "People" },
          ].map(({ to, icon, text }) => (
            <Link
              to={to}
              key={to}
              className="hover:bg-[#6556cd] rounded-xl duration-300 p-3"
              onClick={() => setIsOpen(false)}
            >
              <i className={`ri-${icon} mr-2`}></i>
              {text}
            </Link>
          ))}
        </nav>

        <hr className="border-none h-[1px] bg-zinc-200 mt-2" />

        <nav className="flex flex-col text-zinc-400 text-lg md:text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-8">
            Website Information
          </h1>
          <Link
            to="/about"
            className="hover:bg-[#6556cd] rounded-xl duration-300 p-3"
            onClick={() => setIsOpen(false)}
          >
            <i className="ri-information-2-fill mr-2"></i>
            About
          </Link>
          <Link
            to="/contact"
            className="hover:bg-[#6556cd] rounded-xl duration-300 p-3"
            onClick={() => setIsOpen(false)}
          >
            <i className="ri-phone-fill mr-2"></i>
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Background Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidenav;
