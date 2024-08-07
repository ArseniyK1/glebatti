<template>
  <q-form @submit="onSubmit" class="row q-gutter-md justify-center">
    <common-input dense label="Название товара " v-model="name" class="col-6" />
    <common-input dense label="Цена товара " v-model="name" class="col-5" />
    <common-select
      dense
      label="Категория"
      v-model="category"
      class="col-6"
      :options="categoryList"
      :option-label="(item) => item.name"
    />
    <common-select dense label="Модель" v-model="model" class="col-5" />
    <div class="row justify-between" style="border: 1px solid red">
      <q-file
        v-model="productPhoto"
        label="Загрузите фото"
        outlined
        bg-color="white"
        rounded
        dense
        label-color="dark"
        class="col-6 q-ml-lg"
        style="max-width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn
        label="Создать"
        type="submit"
        class="col-2"
        rounded
        color="primary"
      ></q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "stores/product";
import { useCategoryStore } from "stores/category";
import CommonInput from "components/common/CommonInput.vue";
import CommonSelect from "components/common/CommonSelect.vue";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const name = ref("");
const category = ref("");
const categoryList = computed(() => categoryStore.getCategories);
const priceRange = ref(null);
const model = ref("");
const data = ref([]);
const productPhoto = ref(null);

const onSubmit = () => {
  console.log(productPhoto.value);
};
const counterLabelFn = ({ totalSize, filesNumber, maxFiles }) => {
  return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
};
</script>
