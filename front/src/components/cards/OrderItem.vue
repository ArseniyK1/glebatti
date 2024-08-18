<template>
  <q-item class="bg-dark q-ma-sm text-white" style="background: #303030">
    <q-card class="bg-dark q-ma-sm text-white full-width" flat>
      <q-card-section horizontal class="full-width">
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs flex items-center">
            <q-icon :name="iconComputed" class="q-mr-sm" />
            Заказ №{{ data.order.id }}
          </div>
          <q-item-label class="text-h6 text-grey">
            от
            {{
              data.order.created_at.split("T")[0].split("-").reverse().join(".")
            }}
          </q-item-label>
          <q-item-label class="q-mt-sm"
            >На сумму {{ data.order.order_sum }}Р</q-item-label
          >
        </q-card-section>

        <q-card-section class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </q-card-section>
      </q-card-section>

      <q-separator color="white" />

      <q-card-actions>
        <q-btn
          round
          color="red"
          :icon="mdiDelete"
          dense
          v-if="
            authStore.isUser &&
            data.order.status !== 'CANCELED' &&
            data.order.status !== 'SUCCESS'
          "
          @click="emit('canceled', data.order.id)"
        >
          <q-tooltip>Отменить заказ</q-tooltip>
        </q-btn>
        <q-btn
          round
          color="green"
          :icon="mdiCheck"
          dense
          v-if="
            authStore.isSeller &&
            data.order.status !== 'CANCELED' &&
            data.order.status !== 'SUCCESS'
          "
          @click="emit('complete', data.order.id)"
        >
          <q-tooltip>Завершить заказ</q-tooltip>
        </q-btn>
        <q-btn color="primary" dense @click="emit('open', data)">
          Подробнее
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-item>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { useAuthStore } from "stores/auth";
import {
  mdiDelete,
  mdiCheck,
  mdiCheckDecagram,
  mdiProgressClock,
  mdiCancel,
} from "@mdi/js";

const authStore = useAuthStore();

const emit = defineEmits(["canceled", "complete", "open"]);
const iconComputed = computed(() => {
  switch (props.data.order.status) {
    case "SUCCESS":
      return mdiCheckDecagram;
    case "CANCELED":
      return mdiCancel;
    default:
      return mdiProgressClock;
  }
});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>
