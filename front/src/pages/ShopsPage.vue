<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <div
      class="row q-col-gutter-xs full-width scroll"
      style="width: 90vw !important; height: 90vh !important"
    >
      <div
        class="col-md-6 col-lg-6 col-sm-12 col-xs-12 q-gutter-lg-lg q-gutter-md-md q-gutter-sm-sm q-pa-sm"
        v-for="store in shops_list"
        :key="store.id"
      >
        <shop-card :shop-data="store" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useShopStore } from "stores/shop";
import ShopCard from "components/cards/ShopCard.vue";

const shopStore = useShopStore();

const shops_list = computed(() => shopStore.getShops);

onMounted(async () => {
  await shopStore.list();
});
</script>

<style scoped>
.stores-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}
</style>
