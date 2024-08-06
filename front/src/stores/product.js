import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { normaliseDate } from "src/helpers/format";
import { rolesValue } from "src/constants";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    product_list: [],
    one_product: {},
  }),
  getters: {
    getProducts: (state) => state.product_list,
    getOneProduct: (state) => state.one_product,
  },
  actions: {
    async list(query = "") {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/product/list", {
          params: { query },
        });
        this.product_list = data;

        return data;
      } catch (e) {
        Notify.create({
          message: e?.message || "Ошибка получения товаров",
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
