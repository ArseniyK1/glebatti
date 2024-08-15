<template>
  <div class="row q-ma-sm q-gutter-sm">
    <common-input
      dense
      label="Название товара "
      v-model="name"
      :class="!isMobile ? 'col-2' : 'col-5'"
      :debounce="500"
    />
    <common-select
      dense
      label="Категория"
      v-model="category"
      :class="!isMobile ? 'col-2' : 'col-5'"
      :options="categoriesList"
      :option-label="(el) => el.name"
    />
    <common-select
      dense
      label="Магазин"
      v-model="shop"
      :class="!isMobile ? 'col-2' : 'col-5'"
      :options="shopsList"
      :option-label="(el) => el.name"
    />
    <common-select
      dense
      label="Производитель"
      v-model="manufacture"
      :class="!isMobile ? 'col-2' : 'col-5'"
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
import { useQuasar } from "quasar";
import { useStorageStore } from "stores/storage";
import { useShopStore } from "stores/shop";

const categoryStore = useCategoryStore();
const manufactureStore = useManufactureStore();
const storageStore = useStorageStore();
const shopStore = useShopStore();
const quasar = useQuasar();

const shop = ref("");
const name = ref("");
const category = ref("");
const manufacture = ref("");

const categoriesList = computed(() => categoryStore.getCategories);
const manufactureList = computed(() => manufactureStore.getManufactures);
const isMobile = computed(() => quasar.screen.lt.md);
const shopsList = computed(() => shopStore.getShops);

watch(
  () => [name.value, shop.value, category.value, manufacture.value],
  async () => {
    await storageStore.catalogueList({
      categoryId: category.value ? String(category.value?.id) : "",
      productName: name.value,
      manufactureId: manufacture.value ? String(manufacture.value?.id) : "",
      shopId: shop.value ? String(shop.value?.id) : "",
    });
  }
);

onMounted(async () => {
  await categoryStore.list();
  await manufactureStore.list();
  await shopStore.list();
});
</script>
