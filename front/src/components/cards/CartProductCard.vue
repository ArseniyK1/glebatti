<template>
  <q-item class="cart-item q-pa-md bg-info q-ma-sm" style="border-radius: 1rem">
    <q-item-section avatar>
      <q-img
        :src="`http://localhost:7000/uploads/${product.photo}`"
        class="item-img"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-h5 text-white">{{ product.name }}</q-item-label>
      <q-item-label class="text-white text-h6"
        >{{ product.price }} ₽</q-item-label
      >
      <q-item-label class="text-white text-h6" v-if="product.manufacture?.id"
        >Производитель: {{ product.manufacture?.name }}</q-item-label
      >
    </q-item-section>
    <q-item-section side class="row items-center">
      <div class="quantity-input">
        <q-btn
          dense
          flat
          icon="remove"
          size="xs"
          @click="$emit('quantity:decrement')"
          rounded
          class="q-mr-xs"
          color="white"
        />
        <div class="text-white">{{ product.quantity }}</div>
        <q-btn
          dense
          flat
          icon="add"
          size="xs"
          @click="$emit('quantity:increment')"
          rounded
          class="q-ml-xs"
          color="white"
        />
      </div>
      <q-btn
        dense
        flat
        color="negative"
        class="absolute-top-right q-mr-xs q-mt-xs"
        icon="delete"
        @click="$emit('remove')"
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits([
  "remove",
  "quantity:decrement",
  "quantity:increment",
]);
</script>

<style scoped>
.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.cart-item {
  display: flex;
  align-items: center;
}

.quantity-input {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.quantity-input input {
  width: 30px;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  margin: 0 5px;
}
</style>
