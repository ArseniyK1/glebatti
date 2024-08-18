<template>
  <common-table
    :columns="productsColumn"
    :rows="products"
    title="Справочник товаров"
    height="100%"
    @open="$emit('rowClick', $event)"
  >
    <template v-slot:top-right>
      <common-drop-dawn
        label="Добавить"
        color="positive"
        v-if="authStore.isAdmin"
      >
        <new-product-form />
      </common-drop-dawn>
    </template>
  </common-table>
</template>
<script setup>
import CommonTable from "components/common/CommonTable.vue";
import CommonDropDawn from "components/common/CommonDropDawn.vue";
import CommonInput from "components/common/CommonInput.vue";
import { computed, onMounted, ref, defineEmits } from "vue";
import NewProductForm from "components/forms/NewProductForm.vue";
import { useDictProduct } from "stores/dict_product";
import { useAuthStore } from "stores/auth";

const dictProductStore = useDictProduct();
const authStore = useAuthStore();

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
    name: "quantity",
    label: "Количество",
    field: "quantity",
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

const emit = defineEmits(["rowClick"]);

const loading = ref(false);
const productForm = ref({
  name: "",
  model: "",
  price: "",
  manufacture: "",
  category: "",
});

const products = computed(() => dictProductStore.getProducts);

const createProduct = async () => {};

onMounted(async () => {
  loading.value = true;
  await dictProductStore.list();
  loading.value = false;
});
</script>
