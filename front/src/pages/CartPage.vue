<!-- CartPage.vue -->
<template>
  <q-page padding class="cart-page" style="background: #303030; color: white">
    <q-card class="my-card no-shadow" style="background: #424242; color: white">
      <q-card-section class="text-center">
        <h1>Корзина</h1>
        <q-list bordered class="cart-list">
          <q-item v-for="item in cartItems" :key="item.id" class="cart-item">
            <q-item-section avatar>
              <q-img :src="item.image" class="item-img" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>{{ item.price }} ₽</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                dense
                flat
                color="negative"
                @click="removeFromCart(item.id)"
                >Удалить</q-btn
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card no-shadow"
      style="background: #424242; color: white; margin-top: 20px"
    >
      <q-card-section class="text-center">
        <h1>Товары</h1>
        <q-list bordered class="products-list">
          <q-item
            v-for="product in products"
            :key="product.id"
            class="product-item"
          >
            <q-item-section avatar>
              <q-img :src="product.image" class="item-img" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ product.name }}</q-item-label>
              <q-item-label caption>{{ product.price }} ₽</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn dense flat color="primary" @click="addToCart(product)"
                >Добавить в корзину</q-btn
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [],
      products: [
        {
          id: 1,
          name: "Электрогитара Fender Stratocaster",
          price: 60000,
          image: "https://example.com/stratocaster.jpg",
        },
        {
          id: 2,
          name: "Аккустическая гитара Yamaha F310",
          price: 15000,
          image: "https://example.com/yamaha-f310.jpg",
        },
        {
          id: 3,
          name: "Электронное пианино Casio PX-160",
          price: 45000,
          image: "https://example.com/casio-px160.jpg",
        },
      ],
    };
  },
  methods: {
    addToCart(product) {
      this.cartItems.push(product);
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    },
  },
};
</script>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.my-card {
  max-width: 800px;
  margin: 10px 0;
}

.item-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.cart-item,
.product-item {
  display: flex;
  align-items: center;
}

.cart-list,
.products-list {
  width: 100%;
}
</style>
