<template>
  <q-page class="q-pa-sm full-height" style="background: #303030">
    <product-filters />
    <div class="scroll-container q-mt-md">
      <q-btn
        v-if="authStore.isAdmin"
        class="absolute-bottom-right q-pa-md q-ma-md"
        style="z-index: 2"
        size="md"
        :icon="mdiPlus"
        label="Добавить товар"
        rounded
        dense
        color="primary"
        @click="dialog = !dialog"
      />
      <div v-if="data.length > 0" class="row q-col-gutter-sm full-width">
        <div
          class="col-md-3 col-lg-3 col-sm-12 col-xs-12 q-gutter-lg-lg q-gutter-md-md q-gutter-sm-sm q-pa-sm"
          v-for="item in data"
          :key="item.id"
        >
          <card-product
            :data="item"
            @add-to-cart="() => addToCartHandler(item)"
            :check-product-in-cart="cartStore.checkProductInCart(item.id)"
          />
        </div>
      </div>
      <div v-else class="text-white">Нет товаров(</div>
    </div>
  </q-page>
  <left-dialog
    :visible="dialog"
    title="Добавление товара"
    @close="dialog = false"
  >
    <new-product-form />
  </left-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import CardProduct from "components/cards/CardProduct.vue";
import { useProductStore } from "stores/product";
import { mdiPlus } from "@mdi/js";
import { useAuthStore } from "stores/auth";
import CommonDialog from "components/common/CommonDialog.vue";
import NewProductForm from "components/forms/NewProductForm.vue";
import { useCartStore } from "stores/cart";
import ProductFilters from "components/forms/ProductFilters.vue";
import LeftDialog from "components/common/LeftDialog.vue";

const $q = useQuasar();
const productStore = useProductStore();
const authStore = useAuthStore();
const cartStore = useCartStore();

const dialog = ref(false);
const data = ref([]);

const addToCartHandler = (product) => {
  cartStore.addToCart(product);
  $q.notify({
    message: "Товар добавлен в корзину",
    type: "positive",
  });
};

watch(
  () => productStore.product_list,
  () => (data.value = productStore.getProducts),
  { deep: true }
);

onMounted(async () => {
  await productStore.list();
  data.value = productStore.getProducts;
});
</script>

<style scoped>
.scroll-container {
  max-height: calc(100vh - 140px); /* Устанавливаем высоту контейнера */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
}
.fixed-bottom-right {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.filters {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.filters .q-item-section {
  margin-bottom: 12px;
}
</style>
