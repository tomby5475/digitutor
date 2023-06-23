import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000/api"
});

const errorHandler = err => {
  throw err;
};

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
  uploadImage,
  createUser
};
