<template>
  <q-page class="q-pa-sm full-height" style="background: #303030">
    <product-filters />
    <div class="scroll-container q-mt-md">
      <div v-if="data.length > 0" class="row q-col-gutter-sm full-width">
        <div
          class="col-md-3 col-lg-3 col-sm-12 col-xs-12 q-gutter-lg-lg q-gutter-md-md q-gutter-sm-sm q-pa-sm"
          v-for="item in data"
          :key="item.id"
        >
          <card-product
            :data="item"
            @open="() => openProductInfo(item)"
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
    title="Информация о товаре"
    @close="dialog = false"
  >
    <product-info-card :data="oneProductData" />
  </left-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import CardProduct from "components/cards/CardProduct.vue";
import { useCartStore } from "stores/cart";
import ProductFilters from "components/forms/ProductFilters.vue";
import LeftDialog from "components/common/LeftDialog.vue";
import ProductInfoCard from "components/cards/ProductInfoCard.vue";
import { useStorageStore } from "stores/storage";

const $q = useQuasar();
const cartStore = useCartStore();
const storageStore = useStorageStore();

const dialog = ref(false);
const data = ref([]);
const oneProductData = ref({});

const addToCartHandler = (product) => {
  cartStore.addToCart(product);
  $q.notify({
    message: "Товар добавлен в корзину",
    type: "positive",
  });
};

const openProductInfo = (product) => {
  dialog.value = true;
  console.log(product);
  oneProductData.value = product;
};

watch(
  () => storageStore.catalogue_list,
  () => (data.value = storageStore.getCatalogueList),
  { deep: true }
);

onMounted(async () => {
  // await dictProductStore.list();
  // data.value = dictProductStore.getProducts;
  await storageStore.catalogueList({
    categoryId: "",
    productName: "",
    manufactureId: "",
    shopId: "",
  });
  data.value = storageStore.getCatalogueList;
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
