<template>
  <common-table
    :columns="shopStorageColumn"
    :rows="shopProducts"
    title="Товары в магазине"
    height="100%"
  >
    <template v-slot:top-right>
      <q-btn
        color="positive"
        @click="$emit('add-product')"
        label="Добавить"
        :icon="mdiPlusBox"
        dense
      />
    </template>
    <template v-slot:body-cell-remove="{ row }">
      <q-td auto-width>
        <q-btn
          color="negative"
          :icon="mdiMinusBox"
          dense
          @click.stop="$emit('remove-product', row.id)"
        />
      </q-td>
    </template>
  </common-table>
</template>
<script setup>
import CommonTable from "components/common/CommonTable.vue";
import CommonDropDawn from "components/common/CommonDropDawn.vue";
import { computed, onMounted, ref, defineEmits } from "vue";
import { useStorageStore } from "stores/storage";
import { mdiPlusBox, mdiMinusBox } from "@mdi/js";

const emit = defineEmits(["add-product", "remove-product"]);

const shopStorageStore = useStorageStore();

const shopStorageColumn = [
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
    field: (el) => el.product?.name,
    align: "left",
    sortable: true,
  },
  {
    name: "model",
    label: "Модель",
    field: (el) => el.product?.model,
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
    name: "cost_product",
    label: "Цена",
    field: "cost_product",
    align: "left",
    sortable: true,
  },
  {
    name: "manufacture",
    label: "Производитель",
    field: (el) => el.product?.manufacture?.name || "",
    align: "left",
    sortable: true,
  },
  {
    name: "category",
    label: "Категория",
    field: (el) => el.product?.category?.name || "",
    align: "left",
    sortable: true,
  },
  {
    name: "remove",
    label: "Удалить",
    field: "remove",
    align: "left",
  },
];

const loading = ref(false);

const shopProducts = computed(() => shopStorageStore.getAllProducts);

onMounted(async () => {
  loading.value = true;
  await shopStorageStore.myProductList();
  loading.value = false;
});
</script>
