

import axios from "axios";

const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = err => {
  throw err;
};

// const getMovies = () => {
//   return service
//     .get("/movies")
//     .then((res) => res.data)
//     .catch(errorHandler);
// };

const uploadImage = (file) => {
  return service
    .post("auth/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createUser = (newUser) => {
  return service
    .post("/profile", newUser)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
service,
//   getMovies,
  uploadImage,
 createUser
};
