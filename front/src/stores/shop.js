import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "boot/axios";

export const useShopStore = defineStore({
  id: "shop",
  state: () => ({
    shops: [],
  }),
  getters: {
    getShops: (state) => state.shops,
  },
  actions: {
    async list() {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/shop/list");
        this.shops = data;

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка получения магазинов",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async createShop(name, address, phonenumber) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.post("api/shop/create", {
          name,
          address,
          phonenumber,
        });
        await this.list();

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка создания магазина",
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
  import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useShopStore().$id}" at ${new Date()}`);
}
