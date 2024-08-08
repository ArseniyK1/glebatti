<template>
  <common-table
    :columns="productsColumn"
    :rows="products"
    title="Товары"
    height="100%"
  >
    <template v-slot:top-right>
      <common-drop-dawn label="Добавить" color="primary">
        <new-product-form />
      </common-drop-dawn>
    </template>
  </common-table>
</template>
<script setup>
import CommonTable from "components/common/CommonTable.vue";
import CommonDropDawn from "components/common/CommonDropDawn.vue";
import CommonInput from "components/common/CommonInput.vue";
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "stores/product";
import NewProductForm from "components/forms/NewProductForm.vue";

const productStore = useProductStore();

const productsColumn = [
  {
    name: "id",
    label: "ID",
    field: "id",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "Название",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "model",
    label: "Модель",
    field: "model",
    align: "left",
    sortable: true,
  },
  {
    name: "price",
    label: "Цена",
    field: "price",
    align: "left",
    sortable: true,
  },
  {
    name: "manufacture",
    label: "Производитель",
    field: (el) => el.manufacture?.name,
    align: "left",
    sortable: true,
  },
  {
    name: "category",
    label: "Категория",
    field: (el) => el.category?.name,
    align: "left",
    sortable: true,
  },
];

const loading = ref(false);
const productForm = ref({
  name: "",
  model: "",
  price: "",
  manufacture: "",
  category: "",
});

const products = computed(() => productStore.getProducts);

const createProduct = async () => {};

onMounted(async () => {
  loading.value = true;
  await productStore.list();
  loading.value = false;
});
</script>
