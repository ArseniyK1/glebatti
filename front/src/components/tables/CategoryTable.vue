<template>
  <common-table
    :columns="categoriesColumn"
    :rows="categories"
    title="Категории"
  >
    <template v-slot:top-right>
      <common-drop-dawn label="Добавить" color="positive">
        <div class="row" style="max-width: 400px">
          <div class="col-12">
            <common-input label="Название" v-model="categoryName" dense />
          </div>
          <div class="col-12 flex items-center q-ml-sm q-mt-sm justify-end">
            <q-btn
              label="Добавить"
              color="primary"
              @click="createCategory"
              dense
              size="sm"
              class="q-pa-xs"
            />
          </div>
        </div>
      </common-drop-dawn>
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
import CommonInput from "components/common/CommonInput.vue";
import { useCategoryStore } from "stores/category";
import { computed, onMounted, ref } from "vue";
import { mdiPlusBox, mdiMinusBox } from "@mdi/js";
const emit = defineEmits(["remove-product"]);
const categoryStore = useCategoryStore();

const categoriesColumn = [
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
    name: "remove",
    label: "Удалить",
    field: "remove",
    align: "left",
  },
];

const loading = ref(false);
const categoryName = ref("");

const categories = computed(() => categoryStore.getCategories);

const createCategory = async () => {
  await categoryStore.createCategory(categoryName.value);
};

onMounted(async () => {
  loading.value = true;
  await categoryStore.list();
  loading.value = false;
});
</script>
