<template>
  <q-card class="text-white full-height" style="background: #303030">
    <q-img :src="imgUrl" height="520px"> </q-img>

    <q-card-section>
      <div class="text-h6">
        {{ localData?.product_name || localData?.name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Производитель - "{{
          localData?.manufacture_name || localData?.manufacture.name
        }}"
      </div>
    </q-card-section>
    <q-card-section v-if="localData?.shops">
      В наличии в магазинах:
      <div class="text-justify" v-for="shop in localData?.shops" :key="shop.id">
        {{ shop?.shop_name }} - {{ shop?.cost_product }}р
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
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
const imgUrl = computed(() => {
  if (localData.value.hasOwnProperty("photo")) {
    return localData.value.photo.includes("http")
      ? localData.value.photo
      : `http://localhost:7000/uploads/${localData.value.photo}`;
  } else if (localData.value.hasOwnProperty("product_photo")) {
    return `http://localhost:7000/uploads/${localData.value.product_photo}`;
  }
  return "";
});
</script>

<style scoped></style>
