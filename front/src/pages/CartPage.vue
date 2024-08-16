<template>
  <q-page padding class="cart-page" style="background: #303030; color: white">
    <div class="row justify-center full-width" style="height: 90vh">
      <div class="col-12 col-md-12">
        <q-card
          class="my-card q-pa-md"
          style="background: #424242; color: white; width: 100%; height: 100%"
        >
          <q-card-section class="text-center" v-if="products?.length">
            <h5>Корзина</h5>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md" v-if="products?.length">
              <div class="col-6">
                <q-list
                  bordered
                  separator
                  class="cart-list"
                  style="max-height: 650px; overflow-y: auto"
                >
                  <cart-product-card
                    v-for="item in products"
                    :key="item.id"
                    :product="item"
                    @quantity:increment="
                      () => cartStore.incrementQuantity(item.id)
                    "
                    @quantity:decrement="
                      () => cartStore.decrementQuantity(item.id)
                    "
                    @remove="() => cartStore.removeProduct(item.id)"
                  />
                </q-list>
              </div>
              <div class="col-6">
                <div class="total-price">
                  <h6>Итоговая стоимость:</h6>
                  <p class="text-h3">{{ totalSum }} ₽</p>
                </div>
              </div>
            </div>
            <div class="text-h4 text-center" v-else>
              В корзине пока ничего нет
            </div>
          </q-card-section>
          <q-btn
            color="primary"
            class="absolute-bottom-right q-ma-md"
            label="Оформить"
            @click="submitOrder"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useCartStore } from "stores/cart";
import { computed, onMounted, ref } from "vue";
import CartProductCard from "components/cards/CartProductCard.vue";

const cartStore = useCartStore();

const products = computed(() => cartStore.getProducts);
const totalSum = computed(() => cartStore.getTotalPrice);

const submitOrder = () => {
  // cartStore.clearCart();
  const payload = [];
  products.value.forEach((el) =>
    payload.push({
      productId: el.id,
      shopId: el.shops[0].shopId,
      quantity: el.quantity,
    })
  );
  console.log(payload);
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
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.cart-item {
  display: flex;
  align-items: center;
}

.cart-list {
  width: 100%;
  border: none;
}

.total-price {
  text-align: center;
  margin-bottom: 20px;
}
</style>
