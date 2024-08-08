<template>
  <q-page class="q-pa-sm full-height" style="background: #303030">
    <q-btn label="Open Dialog" color="primary" @click="openDialog" />
    <left-dialog
      :visible="dialogVisible"
      title="Добавление товара"
      @close="handleClose"
    >
      <new-product-form />
    </left-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";
import LeftDialog from "components/common/LeftDialog.vue";
import NewProductForm from "components/forms/NewProductForm.vue";

export default {
  name: "ParentComponent",
  components: {
    NewProductForm,
    LeftDialog,
  },
  setup() {
    const dialogVisible = ref(false);

    const openDialog = () => {
      dialogVisible.value = true;
    };

    const handleClose = () => {
      console.log("Dialog closed");
      dialogVisible.value = false;
    };

    return {
      dialogVisible,
      openDialog,
      handleClose,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles for the parent component here */
</style>
