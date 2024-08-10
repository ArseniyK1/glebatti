import { api } from "boot/axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { normaliseDate } from "src/helpers/format";
import { rolesValue } from "src/constants";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("user-token") || "",
    type: localStorage.getItem("user-login") || "",
    userName: localStorage.getItem("user-name") || "",
    profile: localStorage.getItem("user-profile") || "",
    roles: localStorage.getItem("user-role") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getProfile: (state) => state.profile,
    getRole: (state) => state.roles,
    isSeller: (state) => state.roles === rolesValue.seller,
    isUser: (state) => state.roles === rolesValue.user,
    isAdmin: (state) => state.roles === rolesValue.admin,
    getIdUser: (state) => +JSON.parse(state.profile)?.id,
    getParseProfile: (state) => JSON.parse(state.profile),
  },
  actions: {
    async login(login, password) {
      try {
        Loading.show({ message: "Загрузка..." });
        delete api.defaults.headers.common["Authorization"];
        const { data } = await api.post("api/auth/login", {
          username: login,
          password,
        });

        if (!data?.access_token) throw new Error("Ошибка авторизации");
        const { access_token } = data;

        localStorage.setItem("user-token", access_token);

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        this.token = access_token;

        await this.loadProfile();
        !!!JSON.parse(localStorage.getItem("user-profile"))?.id &&
          Notify.create({
            message: "Вы авторизованы",
            type: "positive",
          });
        this.router.push("/");
        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message || e?.message || "Ошибка авторизации",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async loadProfile() {
      try {
        const { data } = await api.get("api/auth/profile");
        const _data = { ...data };
        localStorage.setItem("user-role", _data.roleId.value);
        localStorage.setItem("user-profile", JSON.stringify(_data));
        this.profile = JSON.stringify(_data);
        this.roles = _data.roleId.value;
        return _data;
      } catch (e) {
        // Notify.create({
        //   type: "negative",
        //   color: "negative",
        //   message:
        //     e?.response?.data?.message ||
        //     e?.message ||
        //     "Ошибка загрузки профиля",
        // });
        console.log(e);
      }
    },
    async logout() {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-name");
      localStorage.removeItem("user-login");
      localStorage.removeItem("user-role");
      localStorage.removeItem("user-profile");
      localStorage.clear();
      delete api.defaults.headers.common["Authorization"];
      this.token = "";
      this.roles = "";
      this.profile = "";
      this.type = "";
      this.router.push("/auth");
    },
    async signUp(
      first_name,
      last_name,
      middle_name,
      login,
      password,
      isSeller,
      email
    ) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.post("api/user", {
          login,
          first_name,
          last_name,
          middle_name,
          password,
          isSeller,
          email,
        });
        localStorage.setItem("user-login", data?.login);
        localStorage.setItem("user-email", data?.email);
        localStorage.setItem("user-pass", password);
      } catch (e) {
        console.log("catch", e);
        Notify.create({
          type: "negative",
          color: "negative",
          message:
            e?.response?.data?.message || e?.message || "Ошибка регистрации",
        });
        console.log(e);
      } finally {
        Loading.hide();
      }
    },

    async verifyCode(code) {
      const { data } = await axios.post(
        "http://localhost:7000/api/mail/verificationCode",
        {
          login: localStorage.getItem("user-login"),
          email: localStorage.getItem("user-email"),
          code: +code,
        }
      );
      if (!!data?.verify) {
        const login_data = await this.login(
          localStorage.getItem("user-login"),
          localStorage.getItem("user-pass")
        );
        this.token = login_data?.access_token;
        localStorage.removeItem("user-pass");
        this.router.push("/products");
      } else {
        Notify.create({
          type: "negative",
          color: "negative",
          message: "Неверный код верификации",
        });
      }
      return !!data.verify;
    },
  },
});
