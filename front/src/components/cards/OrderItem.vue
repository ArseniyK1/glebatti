<template>
  <q-item class="bg-dark q-ma-sm text-white">
    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">Заказ №{{ data.order.id }}</q-item-label>
      <q-item-label class="q-mt-sm"
        >от
        {{
          data.order.created_at.split("T")[0].split("-").reverse().join(".")
        }}</q-item-label
      >
      <q-item-label class="q-mt-sm"
        >На сумму {{ data.order.order_sum }}Р</q-item-label
      >
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <!--        <span class="text-weight-bold text-primary">{{ data.product.name }} </span>-->
        <!--        - -->
        <!--        <span class="text-weight-medium"> {{ data.shop.address }}</span>-->
      </q-item-label>
      <q-separator />
      <br />
    </q-item-section>

    <q-item-section top side>
      <div class="q-gutter-xs q-mt-sm">
        <q-btn-dropdown
          size="12px"
          flat
          dense
          round
          icon-right="more_vert"
          auto-close
        >
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="delete"
            color="negative"
            v-if="
              authStore.isUser &&
              data.order.status !== 'CANCELED' &&
              data.order.status !== 'SUCCESS'
            "
          >
            <q-tooltip>Отменить заказ</q-tooltip>
          </q-btn>
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="done"
            color="positive"
            v-if="authStore.isSeller"
          >
            <q-tooltip>Завершить заказ</q-tooltip>
          </q-btn>
        </q-btn-dropdown>
      </div>
    </q-item-section>
  </q-item>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useAuthStore } from "stores/auth";

const authStore = useAuthStore();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>
