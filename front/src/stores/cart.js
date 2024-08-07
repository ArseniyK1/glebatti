import { acceptHMRUpdate, defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    products: [],
  }),
  getters: {
    getProducts: (state) => state.products,
    getCountProducts: (state) => state.products?.length,
  },
  actions: {
    addToCart(items) {
      !this.products.find((el) => el.id === items.id)?.id &&
        this.products.push(items);
      console.log(this.products);
    },
    removeProduct(id) {
      this.products = this.products.filter((el) => el.id !== id);
    },
    checkProductInCart(id) {
      return !!this.products?.find((el) => el.id === id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useCartStore().$id}" at ${new Date()}`);
}
