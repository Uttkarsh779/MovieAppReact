import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-[#1F1E24] text-zinc-400 text-center py-6  mt-5 border- border-zinc-700 flex items-center justify-center">
      <div className="text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-3">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <Link
              to="/about"
              className="hover:text-white transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-white transition duration-300"
            >
              Contact
            </Link>
            <a
              href="https://github.com/uttkarsh779"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/uttkarsh-tiwari-60922a285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              LinkedIn
            </a>
          </div>

          {/* Developer Credit */}
        </div>
        <div className="mt-3">
          <p className="text-xs md:text-sm">
            © {new Date().getFullYear()} UTFlex. Developed with ❤️ by{" "}
            <span className="text-[#6556cd] font-semibold">
              Uttkarsh Tiwari
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
