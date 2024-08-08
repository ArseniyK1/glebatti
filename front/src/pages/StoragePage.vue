<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <div class="row q-gutter-sm justify-center">
      <div class="col-12">
        <product-table />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ProductTable from "components/tables/ProductTable.vue";
</script>

<style scoped></style>
