// import React, { useEffect } from "react";
// import Sidenav from "./Partials/Sidenav";
// import Topnav from "./Partials/Topnav";
// import Header from "./Partials/Header";
// import { useState } from "react";
// // import axios from "../../utils/axios";
// import axios from "../utils/axios";
// import HorizontalCards from "./Partials/HorizontalCards";
// import Dropdown from "./Partials/Dropdown";
// import Loading from "./Loading";

// document.title = "UTFlex | Homepage";

// const Home = () => {
//   const [Wallpaper, setWallpaper] = useState("");
//   const [Trending, setTrending] = useState("");
//   const [Category, setCategory] = useState("all");
//   const GetWallpaper = async () => {
//     try {
//       const data = await axios.get("trending/all/day?language=en-US");
//       setWallpaper(
//         data.data.results[(Math.random() * data.data.results.length).toFixed()]
//       );
//     } catch (error) {
//       console.log("error: ", error);
//     }
//   };

//   const GetTrending = async () => {
//     try {
//       const data = await axios.get(`trending/${Category}/day?language=en-US`);
//       // setWallpaper(data.data.results);

//       // console.log(data.data.results);
//       setTrending(data.data.results);
//       // console.log(data.data.results.length);

//       // setTrending(
//       //   data.data.results[(Math.random() * data.data.results.length).toFixed()]
//       // );
//     } catch (error) {
//       console.log("error: ", error);
//     }
//   };

//   useEffect(() => {
//     GetTrending(), !Wallpaper && GetWallpaper();
//   }, [Category]);
//   return Wallpaper || Trending ? (
//     <>
//       <div className="w-[25vw] p-2">
//         <Sidenav />
//       </div>

//       <div className="w-screen h-full overflow-hidden overflow-y-auto mx-[1%]">
//         <Topnav />
//         <Header data={Wallpaper} />
//         <div className="flex justify-between mx-[1%] ">
//           {" "}
//           <div className="">
//             <h1 className="py-5 text-zinc-400 font-semibold text-3xl">
//               Trending
//             </h1>
//           </div>
//           <div className="text-white py-5">
//             <Dropdown
//               title="filter"
//               options={["tv", "movie", "all"]}
//               func={(e) => setCategory(e.target.value)}
//             />
//           </div>
//         </div>
//         <HorizontalCards data={Trending} />
//       </div>
//     </>
//   ) : (
//     <Loading />

//     // <h1 className="text-white text-4xl center">Loading</h1>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import Sidenav from "./Partials/Sidenav";
import Topnav from "./Partials/Topnav";
import Header from "./Partials/Header";
import HorizontalCards from "./Partials/HorizontalCards";
import Dropdown from "./Partials/Dropdown";
import Loading from "./Loading";
import axios from "../utils/axios";

document.title = "UTFlex | Homepage";

const Home = () => {
  const [Wallpaper, setWallpaper] = useState(null);
  const [Trending, setTrending] = useState([]);
  const [Category, setCategory] = useState("all");

  const GetWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);
      const randomItem =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomItem);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    GetWallpaper();
  }, [Category]);

  if (!Wallpaper || Trending.length === 0) return <Loading />;

  return (
    <>
      <div className="w-[25vw] p-2">
        <Sidenav />
      </div>

      <div className="w-screen h-full overflow-hidden overflow-y-auto mx-[1%]">
        <Topnav />
        <Header data={Wallpaper} />

        <div className="flex justify-between mx-[1%]">
          <h1 className="py-5 text-zinc-400 font-semibold text-3xl">
            Trending
          </h1>
          <div className="text-white py-5">
            <Dropdown
              title="filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <HorizontalCards data={Trending} />
      </div>
    </>
  );
};

export default Home;
