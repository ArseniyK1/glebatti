<template>
  <q-page class="q-pa-sm full-height" style="background: #303030">
    <product-filters />
    <div class="scroll-container q-mt-md">
      <div class="full-width">
        <q-list v-for="item in orders" :key="item.order.id">
          <order-item :data="item" />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import OrderItem from "components/cards/OrderItem.vue";
import ProductFilters from "components/forms/ProductFilters.vue";
import { computed, onMounted } from "vue";
import { useOrderStore } from "stores/order";

const orderStore = useOrderStore();

const orders = computed(() => orderStore.getMyOrders);

onMounted(async () => {
  await orderStore.myOrderList();
});
</script>

<style scoped>
.scroll-container {
  max-height: calc(100vh - 140px); /* Устанавливаем высоту контейнера */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
}
</style>
