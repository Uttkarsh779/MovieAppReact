import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { loadperson, removeperson } from "../store/reducers/personSlice";
import Loading from "./Loading";
import HorizontalCards from "./Partials/HorizontalCards";

// ...imports remain unchanged

const PeopleDetails = () => {
  const Shorten = (overview, x) => {
    return overview.slice(0, x);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.People);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="h-[130%] text-white flex flex-col lg:flex-row w-full px-4 sm:px-8 md:px-[6vh] lg:px-[10vh] py-6 md:py-[5vh] min-h-screen bg-[#1F1E24]">
      <nav className="mb-4 lg:mb-0">
        <Link onClick={() => navigate(-1)}>
          <i className="text-3xl md:text-4xl ri-arrow-left-line"></i>
        </Link>
      </nav>

      <div className="w-full lg:w-[40vh] mt-4 lg:mt-10">
        <img
          className="h-[30vh] w-[25vh] object-cover shadow-lg rounded mx-auto lg:mx-0"
          src={
            info.detail.profile_path || info.detail.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.backdrop_path || info.detail.profile_path
                }`
              : "public/images/no_image.avif"
          }
          alt="img"
        />

        <nav className="mt-5 flex justify-center lg:justify-start gap-4 text-2xl text-zinc-400">
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
          >
            <i className="ri-facebook-circle-line"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
          >
            <i className="ri-instagram-line"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.twitter.com/${info.externalid.twitter_id}/`}
          >
            <i className="ri-twitter-x-line"></i>
          </a>
        </nav>

        <div className="flex flex-col mt-4 bg-[#1F1E24]">
          <h1 className="text-2xl m-3 text-zinc-500 font-semibold">
            Personal Info
          </h1>
          <div className="bg-[#1F1E24] flex-col gap-2 text-zinc-400 font-semibold mt-1">
            <h1 className="text-2xl">Known For</h1>
            <h1>{info.detail.known_for_department}</h1>
          </div>
          <div className="flex-col gap-2 text-zinc-400 font-semibold mt-3">
            <h1 className="text-2xl">Birthday</h1>
            <h1 className="text-m">{info.detail.birthday}</h1>
          </div>
          <div className="flex-col gap-2 text-zinc-400 font-semibold mt-3">
            <h1 className="text-2xl">Place Of Birth</h1>
            <h1 className="text-m">{info.detail.place_of_birth}</h1>
          </div>
          <div className="flex-col gap-2 text-zinc-400 font-semibold mt-3">
            <h1 className="text-2xl">Gender</h1>
            <h1 className="text-m">
              {info.detail.gender == "2" ? "Male" : "Female"}
            </h1>
          </div>
          <div className="bg-[#1F1E24] flex-col gap-2 text-zinc-400 font-semibold mt-3">
            <h1 className="text-2xl">Also Known as</h1>
            <h1 className="text-m">{info.detail.also_known_as.join(", ")}</h1>
          </div>
        </div>
      </div>

      <div className="bg-[#1F1E24] w-full lg:w-[80%] mt-6 lg:mt-0 lg:pl-8">
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-400">
          {info.detail.name}
        </h1>
        <h1 className="my-3 text-zinc-300 font-semibold text-lg">Biography</h1>
        <span className="text-sm sm:text-base">
          {Shorten(info.detail.biography, 600)}
        </span>

        <div className="bg-[#1F1E24] mt-4">
          <h1 className="my-5 font-semibold text-lg text-zinc-400">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;
