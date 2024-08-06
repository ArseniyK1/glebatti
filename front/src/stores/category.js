import { api } from "boot/axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    category_list: [],
  }),
  getters: {
    getCategories: (state) => state.category_list,
  },
  actions: {
    async list(query = "") {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/category/list", {
          params: { query },
        });
        this.category_list = data;

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка получения категорий",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async createCategory(name) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.post("api/category/create", {
          name,
        });
        await this.list("");
        Notify.create({
          message: "Категория создана",
          type: "positive",
          color: "positive",
        });
        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка создания категории",
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
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useCategoryStore().$id}" at ${new Date()}`);
}
