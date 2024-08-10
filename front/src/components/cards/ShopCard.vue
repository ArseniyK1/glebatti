<template>
  <q-card bordered class="bg-dark text-white" style="border: 1px solid #e6e6fa">
    <q-card-section horizontal style="width: 300px; height: 120px">
      <q-card-section class="q-pt-xs">
        <div class="text-overline text-white">Магазин</div>
        <div class="text-h5 q-mt-sm q-mb-xs text-white">
          {{ shopData.name }}
        </div>
        <div class="text-grey">
          {{ shopData.address }}
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        color="primary"
        :label="showNumber ? shopData.phonenumber : 'Показать номер'"
        @click="showNumber = !showNumber"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  shopData: {
    type: Object,
    required: () => {},
  },
});
const showNumber = ref(false);
</script>
