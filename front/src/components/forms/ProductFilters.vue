<template>
  <div class="row q-ma-sm q-gutter-sm">
    <common-input dense label="Название товара " v-model="name" class="col-2" />
    <common-select
      dense
      label="Категория"
      v-model="category"
      class="col-2"
      :options="categoriesList"
      :option-label="(el) => el.name"
    />
    <common-select
      dense
      label="Магазин"
      v-model="shop"
      class="col-2"
      :options="shopsList"
      :option-label="(el) => el.name"
    />
    <common-select
      dense
      label="Производитель"
      v-model="manufacture"
      class="col-2"
      :options="manufactureList"
      :option-label="(el) => el.name"
    />
  </div>
</template>
<script setup>
import CommonSelect from "components/common/CommonSelect.vue";
import CommonInput from "components/common/CommonInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useCategoryStore } from "stores/category";
import { useManufactureStore } from "stores/manufacture";
import { useProductStore } from "stores/product";
import { mdiShapePlusOutline } from "@mdi/js";

const categoryStore = useCategoryStore();
const manufactureStore = useManufactureStore();
const productStore = useProductStore();

const shop = ref("");
const name = ref("");
const category = ref("");
const manufacture = ref("");

const categoriesList = computed(() => categoryStore.getCategories);
const manufactureList = computed(() => manufactureStore.getManufactures);
const shopsList = [
  { id: 1, name: "Соната" },
  { id: 2, name: "Магнит" },
  { id: 3, name: "Музыка" },
];

watch(
  () => [name.value, shop.value, category.value, manufacture.value],
  async () => {
    await productStore.list(
      name.value,
      category.value ? String(category.value?.id) : "",
      manufacture.value ? String(manufacture.value?.id) : "",
      shop.value ? String(shop.value?.id) : ""
    );
  }
);

onMounted(async () => {
  await categoryStore.list();
  await manufactureStore.list();
});
</script>
