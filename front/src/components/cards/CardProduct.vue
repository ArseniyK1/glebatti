<template>
  <q-card class="bg-dark text-white">
    <q-img
      :src="
        localData?.product_photo.length
          ? `http://localhost:7000/uploads/${localData?.product_photo}`
          : '../../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg'
      "
      height="320px"
    >
    </q-img>

    <q-card-section>
      <q-btn
        fab
        :icon="
          hover && checkProductInCart
            ? mdiCartRemove
            : checkProductInCart
            ? mdiCartCheck
            : mdiCartPlus
        "
        padding="sm"
        class="absolute bg-secondary"
        :class="checkProductInCart ? 'bg-positive' : 'bg-secondary'"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="$emit('addToCart')"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <q-tooltip v-if="!checkProductInCart">{{
          "Добавить в корзину"
        }}</q-tooltip>
      </q-btn>
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ localData?.product_name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Производитель - "{{ localData.manufacture_name }}"
      </div>
      <div
        class="text-subtitle1 text-justify q-mt-sm"
        v-if="localData?.shops?.length <= 1"
      >
        В наличии в {{ localData?.shops[0].shop_name }}
      </div>
      <div
        class="text-subtitle1 text-justify q-mt-sm"
        v-else-if="localData?.shops?.length > 1"
      >
        В наличии в {{ localData?.shops?.length }} магазинах
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6" v-if="localData?.shops?.length <= 1"
          >{{ localData?.shops[0].cost_product }}₽</span
        >
        <span class="text-h6" v-else>Разные цены</span>
        <span class="text-h6 float-right">
          <q-btn
            label="Подробнее"
            rounded
            color="accent"
            @click="$emit('open')"
          />
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
const hover = ref(false);
</script>

<style scoped></style>
