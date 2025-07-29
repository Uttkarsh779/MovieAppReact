import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removemovie } from "../store/reducers/movieSlice";
import Loading from "./Loading";
import HorizontalCards from "./Partials/HorizontalCards";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.Movie);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      className="w-full min-h-screen relative bg-cover bg-center h-[140vh]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      }}
    >
      <nav className="w-full text-zinc-400 text-2xl md:text-3xl flex gap-10 md:gap-20 p-5 md:p-[5%]">
        <Link onClick={() => navigate(-1)}>
          <i className="ri-arrow-left-line"></i>
        </Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 px-5 md:px-[5%]">
        <img
          className="w-full lg:w-[40vh] h-auto object-cover shadow-lg rounded"
          src={
            info.detail.backdrop_path || info.detail.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.backdrop_path || info.detail.profile_path
                }`
              : "/images/no_image.avif"
          }
          alt="img"
        />

        <div className="text-white lg:ml-[7vh]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {info.detail.title}
            <small className="text-xl ml-2 text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex flex-wrap gap-3 py-2 text-base md:text-lg text-zinc-300">
            <h1>
              <i className="mr-2 text-yellow-300 ri-megaphone-fill"></i>
              {info.detail.release_date}
            </h1>
            <h1>{info.detail.genres.map((c) => c.name).join(", ")}</h1>
          </div>

          <div className="text-sm md:text-base">
            <h1 className="text-xl md:text-2xl mb-1 text-zinc-300">
              {info.detail.tagline}
            </h1>
            <h2 className="font-semibold">Overview:</h2>
            <p>{info.detail.overview}</p>
          </div>

          <div className="mt-4">
            <Link to={`${pathname}/trailer`}>
              <button className="px-4 py-2 bg-[#6556cd] rounded text-zinc-200 text-base md:text-lg">
                Watch Trailer
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 mt-10">
        <h1 className="text-white text-2xl md:text-4xl pb-4 text-zinc-400">
          Recommendations
        </h1>
        <HorizontalCards
          data={
            info.recommendations.results.length > 0
              ? info.recommendations.results
              : info.similar.results
          }
        />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
