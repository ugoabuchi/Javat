import axios, { AxiosInstance, AxiosResponse } from "axios";
import { userLogoutAction } from "../store/Actions";
import { store } from "../store/ConfigStore";

let env = process.env.NODE_ENV || "local";
let config = require(`../../config.${env}.json`);

let http: AxiosInstance;
// config.apiUrl = "https://api.dev.javat365.apekgroup.com/";
config.apiUrl = "http://localhost:3010/";


class APIProvider {
  constructor() {
    http = axios.create({
      baseURL: config.apiUrl,
    });

    console.log(config.apiUrl);

    http.defaults.headers.common["Content-Type"] =
      "application/json;charset=UTF-8";

    const token = localStorage.getItem("token");

    if (token) {
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const authInterceptor = (response: AxiosResponse) => {
      console.log("Axios INTERCEPT", response.config.url);
      const token = localStorage.getItem("token");
      if (token) {
        response.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("NO TOKEN FOUND");
      }
      return response;
    };

    // Add a response interceptor
    axios.interceptors.response.use(authInterceptor, function (error) {
      return Promise.reject(error);
    });

    http.interceptors.response.use(authInterceptor, async function (error) {
      if (
        error.response.config.url === "users/me" &&
        error.response.status === 403
      ) {
        console.log("dispatch logout", error.response.status);

        store.dispatch(userLogoutAction());
      }
      return Promise.reject(error);
    });
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  removeToken() {
    http.defaults.headers.common["Authorization"] = "";
  }

  tokenLogin(data: any) {
    return http.post("auth/token/login", data);
  }

  logout() {
    localStorage.removeItem("token");
  }

  // REST Methods
  find(payload: { resource: string; query?: any }) {
    return http.get(payload.resource, {
      params: payload.query,
    });
  }

  photo(url: string, token: string) {
    return axios.get(url, {
      headers: {
        'Authorization': token
      },
      responseType: "arraybuffer"
    });
  }

  get(payload: { resource: string; id?: string; query?: any }) {
    return http.get(`${payload.resource}/${payload.id}`, {
      params: payload.query,
    });
  }

  create(payload: { resource: string; data: any; query?: any }) {
    return http.post(payload.resource, payload.data, {
      params: payload.query,
    });
  }

  update(payload: { resource: string; id: string; data: any; query?: any }) {
    return http.put(`${payload.resource}/${payload.id}`, payload.data, {
      params: payload.query,
    });
  }

  updateSub(payload: {
    resource: string;
    id: string;
    subresource: string;
    data: any;
    query?: any;
  }) {
    return http.put(
      `${payload.resource}/${payload.id}/${payload.subresource}`,
      payload.data,
      {
        params: payload.query,
      }
    );
  }

  destroy(payload: { resource: string; id: string }) {
    return http.delete(`${payload.resource}/${payload.id}`);
  }

  findSub(payload: {
    resource: string;
    id: string;
    subresource: string;
    query?: any;
  }) {
    return http.get(
      `${payload.resource}/${payload.id}/${payload.subresource}`,
      {
        params: payload.query,
      }
    );
  }

  getSub(payload: {
    resource: string;
    id: string;
    subresource: string;
    query?: any;
  }) {
    return http.get(
      `${payload.resource}/${payload.id}/${payload.subresource}/${payload.id}`,
      {
        params: payload.query,
      }
    );
  }

  createSub(payload: {
    resource: string;
    id: string;
    subresource: string;
    data: any;
    query?: any;
  }) {
    return http.post(
      `${payload.resource}/${payload.id}/${payload.subresource}`,
      payload.data,
      {
        params: payload.query,
      }
    );
  }

  signUrl(url: string) {
    return http.post("api/signurl", { url });
  }
}

export default new APIProvider();
