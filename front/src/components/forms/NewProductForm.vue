<template>
  <q-form @submit="onSubmit">
    <common-input dense label="Название товара " v-model="name" class="col-2" />
    <common-select
      dense
      label="Категория"
      v-model="category"
      class="col-2"
      :options="categoryList"
      :option-label="(item) => item.name"
    />
    <common-input dense label="Цена товара " v-model="name" class="col-2" />
    <common-select dense label="Модель" v-model="model" class="col-2" />
  </q-form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "stores/product";
import { useCategoryStore } from "stores/category";
import CommonInput from "components/common/CommonInput.vue";
import CommonSelect from "components/common/CommonSelect.vue";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const name = ref("");
const category = ref("");
const categoryList = computed(() => categoryStore.getCategories);
const priceRange = ref(null);
const model = ref("");
const data = ref([]);

const onSubmit = () => {
  // productStore.createProduct(
  //   name.value,
  //   priceRange.value,
  //   model.value,
  //   category.value,
  //   brand.value
  // );
};
</script>
