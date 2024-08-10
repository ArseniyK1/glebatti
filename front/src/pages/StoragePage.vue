<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <div class="row q-gutter-sm justify-center">
      <div class="col-12">
        <product-table @row-click="openProduct" />
      </div>
    </div>
    <left-dialog
      :visible="dialog"
      title="Информация о товаре"
      @close="dialog = false"
    >
      <product-info-card :data="oneProductData" />
    </left-dialog>
  </q-page>
</template>

<script setup>
import ProductTable from "components/tables/ProductTable.vue";
import { ref } from "vue";
import LeftDialog from "components/common/LeftDialog.vue";
import ProductInfoCard from "components/cards/ProductInfoCard.vue";
const dialog = ref(false);
const oneProductData = ref({});

const openProduct = (e) => {
  oneProductData.value = e;
  dialog.value = true;
};
</script>

<style scoped></style>
