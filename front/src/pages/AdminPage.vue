<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <div class="row q-gutter-sm justify-center">
      <div class="col-5">
        <category-table @remove-product="removeCategory" />
      </div>
      <div class="col-6">
        <shop-table @remove-product="removeShop" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CategoryTable from "components/tables/CategoryTable.vue";
import ShopTable from "components/tables/ShopTable.vue";
import { useCategoryStore } from "stores/category";
import { useStorageStore } from "stores/storage";
import { useShopStore } from "stores/shop";

const categoryStore = useCategoryStore();
const shopStore = useShopStore();

const removeCategory = async (id) => {
  await categoryStore.removeCategory(id);
};

const removeShop = async (id) => {
  await shopStore.removeShop(id);
};
</script>

<style scoped></style>
