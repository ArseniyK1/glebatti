import { api } from "boot/axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { normaliseDate } from "src/helpers/format";
import { rolesValue } from "src/constants";
import { useAuthStore } from "stores/auth";

export const useDictProduct = defineStore({
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
    async list(name = "", categoryId = "", manufactureId = "", shopId = "") {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/dict_product/list", {
          params: { name, categoryId, manufactureId, shopId },
        });
        this.product_list = data;

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка получения товаров",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async createProduct(formData) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api({
          url: "api/dict_product/create",
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        await this.list("");
        Notify.create({
          message: "Товар создан",
          type: "positive",
          color: "positive",
        });
        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка создания товара",
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
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useProductStore().$id}" at ${new Date()}`);
}
