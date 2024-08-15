<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <div class="row q-gutter-sm justify-center">
      <div class="col-12">
        <shop-storage-table
          @add-product="dialog = true"
          @remove-product="removeProduct"
        />
      </div>
    </div>
    <left-dialog
      :visible="dialog"
      title="Выберите товар, который необходимо добавить в магазин"
      caption="asdads"
      @close="dialog = false"
    >
      <dict-product-table @row-click="addSelectProduct" />
    </left-dialog>
    <common-dialog
      title="Информация о выбранном товаре"
      caption="Введите цену и количество товара, чтобы добавить его в магазин"
      v-model="addProductDialog"
      width="50vw"
    >
      <q-form @submit="addProductStorage" class="row q-gutter-sm">
        <div class="col-4">
          <common-input
            readonly
            :model-value="selectProduct.name"
            dense
            label="Название"
          />
        </div>
        <div class="col-2">
          <common-input
            readonly
            :model-value="selectProduct.model"
            dense
            label="Модель"
          />
        </div>
        <div class="col-2">
          <common-input
            readonly
            :model-value="selectProduct.quantity"
            dense
            label="Количество на складе"
          />
        </div>
        <div class="col-3">
          <common-input
            readonly
            :model-value="selectProduct.manufacture?.name"
            dense
            label="Производитель"
          />
        </div>
        <div class="col-5 bg-dark">
          <common-input
            type="number"
            v-model="price"
            dense
            label="Цена товара"
          />
        </div>
        <div class="col-5">
          <common-input
            type="number"
            v-model="quantity"
            dense
            label="Количество товара"
          />
        </div>
        <div class="col-12 flex justify-end q-mt-md">
          <q-btn label="Добавить" type="submit" dense color="accent" />
        </div>
      </q-form>
    </common-dialog>
  </q-page>
</template>

<script setup>
import ShopStorageTable from "components/tables/ShopStorageTable.vue";
import ProductInfoCard from "components/cards/ProductInfoCard.vue";
import LeftDialog from "components/common/LeftDialog.vue";
import { ref } from "vue";
import DictProductTable from "components/tables/DictProductTable.vue";
import { confirmDialog } from "boot/dialog";
import { useStorageStore } from "stores/storage";
import CommonDialog from "components/common/CommonDialog.vue";
import CommonInput from "components/common/CommonInput.vue";
import { Notify } from "quasar";

const storageStore = useStorageStore();

const dialog = ref(false);
const addProductDialog = ref(false);
const price = ref(null);
const quantity = ref(null);
const selectProduct = ref({});

const addSelectProduct = async (e) => {
  selectProduct.value = e;
  addProductDialog.value = true;
  // await storageStore.addProduct(e.id, 0, 1);
};

const addProductStorage = async () => {
  if (!price.value || !quantity.value) {
    Notify.create({
      message: "Заполните все поля",
      type: "negative",
      color: "negative",
    });
    return;
  }
  if (+price.value <= 0 || +quantity.value <= 0) {
    Notify.create({
      message: "Цена и/или количество должны быть больше нуля",
      type: "negative",
      color: "negative",
    });
    return;
  }
  if (+quantity.value > selectProduct.value.quantity) {
    Notify.create({
      message: "Количество больше, чем есть на складе",
      type: "negative",
      color: "negative",
    });
    return;
  }
  await storageStore
    .addProduct(selectProduct.value.id, +price.value, +quantity.value)
    .then(() => {
      addProductDialog.value = false;
      price.value = null;
      quantity.value = null;
      selectProduct.value = {};
    });
};

const removeProduct = async (id) => {
  await storageStore.removePosition(id);
};
</script>

<style scoped></style>
