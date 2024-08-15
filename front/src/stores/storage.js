import { api } from "boot/axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";

export const useStorageStore = defineStore({
  id: "storage",
  state: () => ({
    products_in_storage: [],
    catalogue_list: [],
  }),
  getters: {
    getAllProducts: (state) => state.products_in_storage,
    getCatalogueList: (state) => state.catalogue_list,
  },
  actions: {
    async myProductList(query = "") {
      try {
        const { data } = await api.get("api/shop-storage/productList");
        this.products_in_storage = data;

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
    async addProduct(productId, cost_product, quantity) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.post("api/shop-storage/add_product", {
          productId,
          cost_product,
          quantity,
        });
        await this.myProductList();
        Notify.create({
          message: "Товар добавлен на склад магазина",
          type: "positive",
          color: "positive",
        });
        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка добавления товара на склад",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async removePosition(productId) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.delete("api/shop-storage/remove", {
          params: { productId },
        });
        await this.myProductList();
        Notify.create({
          message: "Товар удален",
          type: "positive",
          color: "positive",
        });
        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка удаления товара",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async catalogueList({
      categoryId = "",
      productName = "",
      manufactureId = "",
      shopId = "",
    }) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/shop-storage/catalogueList", {
          params: { categoryId, productName, manufactureId, shopId },
        });
        this.catalogue_list = data;
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStorageStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useStorageStore().$id}" at ${new Date()}`);
}
