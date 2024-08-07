import { api } from "boot/axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";

export const useManufactureStore = defineStore({
  id: "manufacture",
  state: () => ({
    manufacture_list: [],
  }),
  getters: {
    getManufactures: (state) => state.manufacture_list,
  },
  actions: {
    async list(query = "") {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/manufacture/list", {
          params: { query },
        });
        this.manufacture_list = data;

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка получения производителей",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async createManufacture(name) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.post("api/manufacture/create", {
          name,
        });
        await this.list("");
        Notify.create({
          message: "Производитель создан",
          type: "positive",
          color: "positive",
        });
        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка создания производителя",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useManufactureStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useManufactureStore().$id}" at ${new Date()}`);
}
