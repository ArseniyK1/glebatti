<template>
  <q-page class="q-pa-sm full-height" style="background: #303030">
    <div class="scroll-container q-mt-md">
      <div class="full-width">
        <div v-if="orders.length > 0" class="row q-col-gutter-sm full-width">
          <div
            class="col-md-3 col-lg-3 col-sm-12 col-xs-12 q-gutter-lg-lg q-gutter-md-md q-gutter-sm-sm q-pa-sm"
            v-for="item in orders"
            :key="item.order.id"
          >
            <order-item
              :data="item"
              @open="() => openProductInfo(item)"
              @canceled="canceledOrderHandler"
              @complete="successOrderHandler"
            />
          </div>
        </div>
        <div
          v-else-if="authStore.isUser"
          class="text-white text-h3 flex-center"
        >
          Нет заказов
        </div>
        <div
          v-else-if="authStore.isSeller || authStore.isAdmin"
          class="text-white text-h3 flex-center"
        >
          Нет заявок
        </div>
      </div>
    </div>
    <left-dialog
      :visible="dialog"
      title="Информация о заказе"
      @close="dialog = false"
    >
      <order-info :data="oneOrderData" class="full-height" />
    </left-dialog>
  </q-page>
</template>

<script setup>
import OrderItem from "components/cards/OrderItem.vue";
import ProductFilters from "components/forms/ProductFilters.vue";
import { computed, onMounted, ref } from "vue";
import { useOrderStore } from "stores/order";
import LeftDialog from "components/common/LeftDialog.vue";
import OrderInfo from "components/cards/OrderInfo.vue";
import { useAuthStore } from "stores/auth";

const orderStore = useOrderStore();
const authStore = useAuthStore();

const dialog = ref(false);
const oneOrderData = ref({});
const orders = computed(() => orderStore.getOrdersRequest);

const openProductInfo = (e) => {
  oneOrderData.value = e;
  dialog.value = true;
};

const canceledOrderHandler = async (id) => {
  await orderStore.canceledOrder(id);
};

const successOrderHandler = async (id) => {
  await orderStore.orderSuccess(id);
};

onMounted(async () => {
  await orderStore.getOrders();
});
</script>

<style scoped>
.scroll-container {
  max-height: calc(100vh - 140px); /* Устанавливаем высоту контейнера */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
}
</style>
