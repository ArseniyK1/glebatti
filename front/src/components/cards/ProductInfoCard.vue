<template>
  <q-card class="bg-dark text-white full-height">
    <q-img
      :src="
        localData?.product_photo?.length
          ? `http://localhost:7000/uploads/${localData?.product_photo}`
          : '../../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg'
      "
      height="520px"
    >
    </q-img>

    <q-card-section>
      <div class="text-h6">
        {{ localData?.product_name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Производитель - "{{ localData?.manufacture_name }}"
      </div>
    </q-card-section>
    <q-card-section>
      В наличии в магазинах:
      <div class="text-justify" v-for="shop in localData?.shops" :key="shop.id">
        {{ shop?.shop_name }} - {{ shop?.cost_product }}р
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { mdiCartPlus, mdiCartCheck, mdiCartRemove } from "@mdi/js";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  checkProductInCart: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["addToCart", "open"]);
const localData = ref({ ...props.data });
</script>

<style scoped></style>
