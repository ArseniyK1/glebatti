<template>
  <common-table :columns="shopColumn" :rows="shops" title="Магазины">
    <template v-slot:top-right>
      <common-drop-dawn label="Добавить" color="primary">
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
  </common-table>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useShopStore } from "stores/shop";
import CommonTable from "components/common/CommonTable.vue";
import CommonDropDawn from "components/common/CommonDropDawn.vue";
import CommonInput from "components/common/CommonInput.vue";

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
