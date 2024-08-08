<template>
  <q-card class="bg-dark text-white full-height">
    <q-img
      :src="
        data.photo?.length
          ? `http://localhost:7000/uploads/${data.photo}`
          : '../../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg'
      "
      height="520px"
    >
    </q-img>

    <q-card-section>
      <div class="text-h6">
        {{ localData.name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Производитель - "{{ localData.manufacture?.name }}"
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-justify">В наличии в магазинах: Какие то магазины</div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ localData.price }}₽</span>
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
