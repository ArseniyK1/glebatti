import { boot } from "quasar/wrappers";
import axios from "axios";
const token = localStorage.getItem("user-token");

const api = axios.create({ baseURL: "http://localhost:7000/" });
api.defaults.headers.common["Accept"] = "application/json";
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default boot(({ app, router }) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        router.push("/auth"); // Используем переданный router
      }
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, axios };
