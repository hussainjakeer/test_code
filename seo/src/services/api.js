import axios from "axios";
import LocalStorage from "./localStorage";

// const API_URL = `${conf.APIUrl}`;
const API_URL = "http://127.0.0.1:5000/";

class Axios {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });

    this.axios.interceptors.request.use(this.#requestMiddleware);

    this.axios.interceptors.response.use(
      this.#responseMiddleware,
      this.#responseErr
    );
  }

  #requestMiddleware = (req) => {
    const token = LocalStorage.get("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  };

  #responseMiddleware = (response) => {
    return response;
  };

  #responseErr = (error) => {
    return Promise.reject(error);
  };
}

const axiosSEO = new Axios(API_URL).axios;

export { axiosSEO };
