import { acceptHMRUpdate, defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "boot/axios";

export const useOrderStore = defineStore({
  id: "order",
  state: () => ({
    my_orders: [],
    orders_request: [],
  }),
  getters: {
    getMyOrders: (state) => state.my_orders,
    getOrdersRequest: (state) => state.orders_request,
  },
  actions: {
    async myOrderList() {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get("api/order/my-order");
        this.my_orders = data;

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка получения заказов",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async createOrder(positions) {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.post("api/order/create-order", {
          positions,
        });
        await this.myOrderList();

        return data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка создания заказа",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    getStatusOrder(orderStatus) {
      switch (orderStatus) {
        case "CREATED":
          return "Создан";
        case "SUCCESS":
          return "Завершен";
        case "CANCELED":
          return "Отменен";
        default:
          return "Неизвестный статус";
      }
    },
    async canceledOrder(id) {
      try {
        Loading.show({ message: "Загрузка..." });
        await api.patch(`api/order/canceled-order/${id}`);
        await this.myOrderList();
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message || e?.message || "Ошибка отмены заказа",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async orderSuccess(orderId) {
      try {
        Loading.show({ message: "Загрузка..." });
        await api.patch(`api/order/success-order/${orderId}`);
        await this.getOrders();
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка завершения заказа",
          type: "negative",
          color: "negative",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async getOrders() {
      try {
        Loading.show({ message: "Загрузка..." });
        const { data } = await api.get(`api/order/open-orders`);
        this.orders_request = data;
      } catch (e) {
        Notify.create({
          message:
            e?.response?.data?.message ||
            e?.message ||
            "Ошибка получения заказов",
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
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useOrderStore().$id}" at ${new Date()}`);
}
