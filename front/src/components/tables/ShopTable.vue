<template>
  <common-table :columns="shopColumn" :rows="shops" title="Магазины">
    <template v-slot:top-right>
      <common-drop-dawn label="Добавить" color="positive">
        <div class="row q-gutter-sm" style="max-width: 400px">
          <div class="col-12">
            <common-input label="Название" v-model="shopForm.name" dense />
          </div>
          <div class="col-12">
            <common-input label="Адрес" v-model="shopForm.address" dense />
          </div>
          <div class="col-12">
            <common-input
              label="Телефон"
              v-model="shopForm.phonenumber"
              dense
            />
          </div>
          <div class="col-12 flex items-center q-ml-sm q-mt-sm justify-end">
            <q-btn
              label="Добавить"
              color="primary"
              dense
              @click="createShop"
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
import { computed, onMounted, ref } from "vue";
import { useShopStore } from "stores/shop";
import CommonTable from "components/common/CommonTable.vue";
import CommonDropDawn from "components/common/CommonDropDawn.vue";
import CommonInput from "components/common/CommonInput.vue";
import { mdiMinusBox } from "@mdi/js";
const emit = defineEmits(["remove-product"]);
const shopStore = useShopStore();

const shopColumn = [
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
    name: "address",
    label: "Адрес",
    field: "address",
    align: "left",
    sortable: true,
  },
  {
    name: "phonenumber",
    label: "Телефон",
    field: "phonenumber",
    align: "left",
  },
  {
    name: "remove",
    label: "Удалить",
    field: "remove",
    align: "left",
  },
];

const loading = ref(false);
const shopForm = ref({
  name: "",
  address: "",
  phonenumber: "",
});

const shops = computed(() => shopStore.getShops);

const createShop = async () => {
  await shopStore.createShop(
    shopForm.value.name,
    shopForm.value.address,
    shopForm.value.phonenumber
  );
};

onMounted(async () => {
  loading.value = true;
  await shopStore.list();
  loading.value = false;
});
</script>

<style scoped></style>
