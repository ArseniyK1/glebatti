<template>
  <div class="text-white scroll full-height">
    <div class="full-width">
      <div class="q-pt-xs q-ml-md">
        <div class="text-h5 q-mt-sm q-mb-xs">
          Заказ №{{ data.order.id }} -
          {{ orderStore.getStatusOrder(data.order.status) }}
        </div>
        <div class="text-h6 text-grey">
          от
          {{
            data.order.created_at.split("T")[0].split("-").reverse().join(".")
          }}
        </div>
        <div class="q-mt-sm text-h6">На сумму {{ data.order.order_sum }}Р</div>
        <div
          class="flex column"
          v-if="authStore.isUser && data.order.seller?.id"
        >
          <div class="text-h6">
            Продавец: {{ data.order.seller.last_name }}
            {{ data.order.seller.first_name }}
            {{ data.order.seller.middle_name }}
          </div>
        </div>
        <div class="flex column col-2" v-if="authStore.isSeller">
          <div class="text-h6">
            Покупатель: {{ data.order.buyer.last_name }}
            {{ data.order.buyer.first_name }}
            {{ data.order.buyer.middle_name }}
          </div>
        </div>
      </div>

      <div class="flex flex-center full-height">
        <div
          class="row full-height full-width q-ml-md"
          v-for="el in data.products"
          :key="el.id"
        >
          <div
            class="col-12 full-width flex justify-around items-center q-mb-md row q-gutter-sm"
            style="max-height: 300px"
          >
            <q-img
              :src="`http://localhost:7000/uploads/${el.product.photo}`"
              class="item-img col-5"
            />
            <div class="flex column col-3">
              <div class="text-h6">
                Название:
                <span class="text-uppercase text-bold">{{
                  el.product.name
                }}</span>
              </div>
              <div class="text-h6">
                Цена:
                <span class="text-uppercase text-bold"
                  >{{ el.cost_product }}₽</span
                >
              </div>
              <div class="text-h6">
                Количество:
                <span class="text-uppercase text-bold">{{ el.quantity }}</span>
              </div>
              <div class="text-h6">
                Магазин:
                <span class="text-uppercase text-bold">{{ el.shop.name }}</span>
              </div>
              <div class="text-h6">
                Адрес магазина:
                <span class="text-uppercase text-bold">{{
                  el.shop.address
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { mdiDelete, mdiCheck } from "@mdi/js";
import { useOrderStore } from "stores/order";
import { useAuthStore } from "stores/auth";

const orderStore = useOrderStore();
const authStore = useAuthStore();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped>
.item-img {
  width: 50%;
  object-fit: cover;
  border-radius: 5px;
}
</style>
