import React from "react";
import Footer from "./Partials/Footer";

const About = () => {
  return (
    <div className="w-full min-h-[150vh] px-6 sm:px-10 md:px-20 mt-10 bg-[#1F1E24] text-zinc-200">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#6556cd] mb-6">
        About UTFlex
      </h1>

      <p className="text-lg leading-relaxed mb-6">
        <strong>UTFlex</strong> is your one-stop platform for discovering
        movies, TV shows, and personalities in the entertainment world. Whether
        you're looking for trending content, popular releases, or exploring
        detailed information about your favorite actors or shows, UTFlex brings
        you a rich and immersive experience.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        Our platform fetches data in real-time using TMDB's powerful API and
        presents it with a clean, responsive interface. You can:
      </p>

      <ul className="list-disc list-inside text-lg mb-6 space-y-2">
        <li>Browse trending movies and TV shows daily.</li>
        <li>Search across multiple categories using advanced filters.</li>
        <li>View detailed information, trailers, and recommendations.</li>
        <li>Explore actors, directors, and people in the film industry.</li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-semibold mt-10 mb-4 text-[#6556cd]">
        Our Mission
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        We aim to make entertainment discovery more seamless and exciting by
        combining dynamic content, modern design, and a user-friendly interface.
        UTFlex is built with ❤️ by developers passionate about movies and
        cutting-edge web technologies.
      </p>

      <h2 className="text-2xl sm:text-3xl font-semibold mt-10 mb-4 text-[#6556cd]">
        Technologies Used
      </h2>
      <ul className="bg-[#1F1E24] list-disc list-inside text-lg mb-10 space-y-2">
        <li>ReactJS + Redux Toolkit</li>
        <li>Tailwind CSS for styling</li>
        <li>Render for backend hosting</li>
        <li>Node.js + Express + TMDB API</li>
      </ul>

      <p className="bg-[#1F1E24] text-center text-zinc-400 mt-12">
        © {new Date().getFullYear()} UTFlex. All rights reserved.
      </p>
      <div className="w-[100%]">
        <Footer />
      </div>
    </div>
  );
};

export default About;
