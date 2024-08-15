<template>
  <q-card class="bg-dark text-white">
    <q-img
      :src="
        localData?.product?.photo?.length
          ? `http://localhost:7000/uploads/${localData?.product?.photo}`
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
        <q-tooltip>{{
          checkProductInCart ? "Удалить из корзины" : "Добавить в корзину"
        }}</q-tooltip>
      </q-btn>
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ localData?.product?.name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Производитель - "{{ localData.product?.manufacture?.name }}"
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Магазин - "{{ localData.shop?.name }}"
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ localData.cost_product }}₽</span>
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
