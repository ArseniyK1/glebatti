import { acceptHMRUpdate, defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    products: [],
    totalPrice: 0,
  }),
  getters: {
    getProducts: (state) => state.products,
    getCountProducts: (state) => state.products?.length,
    getTotalPrice: (state) => state.totalPrice,
  },
  actions: {
    addToCart(items) {
      !this.products.find((el) => el.id === items.id)?.id &&
        this.products.push({ ...items, quantity: 1 });

      this.totalPrice += items.price;
    },
    removeProduct(id) {
      this.totalPrice -=
        this.products.find((el) => el.id === id).price *
        this.products.find((el) => el.id === id).quantity;
      this.products = this.products.filter((el) => el.id !== id);
    },
    checkProductInCart(id) {
      return !!this.products?.find((el) => el.id === id);
    },
    incrementQuantity(id) {
      this.products = this.products.map((el) => {
        if (el.id === id) {
          this.totalPrice += el.price;
          return { ...el, quantity: el.quantity + 1 };
        }
        return el;
      });
    },
    decrementQuantity(id) {
      this.products = this.products.map((el) => {
        if (el.id === id && el.quantity > 1) {
          this.totalPrice -= el.price;
          return { ...el, quantity: el.quantity - 1 };
        }
        return el;
      });
    },
    clearCart() {
      this.products = [];
      this.totalPrice = 0;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
  console.info(`🍍 HMR Update "${useCartStore().$id}" at ${new Date()}`);
}
