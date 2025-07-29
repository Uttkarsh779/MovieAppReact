// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://api.themoviedb.org/3/",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzIxNmRmYmQ3YjA4M2RlMGVjZTcwZjRkMDAyZTA3OCIsIm5iZiI6MTc1MTE4ODgxMy4zNjIsInN1YiI6IjY4NjEwNTRkMzQ5MzQwOGEyYTdlZDYxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JMQ3XCPrpiFRmgW3oGaMD7sTFCDZxaJlcK4kSa2oxyw",
//   },
// });

// export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/tmdb", // 👈 now pointing to your own backend
});

export default instance;
