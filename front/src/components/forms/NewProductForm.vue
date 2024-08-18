<template>
  <q-form @submit="onSubmit" class="row q-gutter-md justify-center">
    <common-input dense label="Название товара " v-model="name" class="col-5" />
    <common-select
      dense
      label="Категория"
      v-model="category"
      class="col-6"
      :options="categoryList"
      :option-label="(item) => item.name"
    />
    <common-input dense label="Модель" v-model="model" class="col-5" />
    <common-input dense label="Количество" v-model="quantity" class="col-6" />
    <common-select
      dense
      label="Производитель"
      v-model="manufacture"
      class="col-5"
      :options="manufactureList"
      :option-label="(item) => item.name"
    />
    <q-file
      v-model="productPhoto"
      label="Загрузите фото"
      outlined
      style="background-color: #e6e6fa; border-radius: 1.3rem"
      rounded
      dense
      label-color="dark"
      class="col-6"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <div class="row full-width justify-end">
      <q-btn
        align="center"
        label="Создать"
        type="submit"
        class="col-1 q-pa-sm q-mr-lg"
        rounded
        color="primary"
      />
    </div>
  </q-form>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useCategoryStore } from "stores/category";
import CommonInput from "components/common/CommonInput.vue";
import CommonSelect from "components/common/CommonSelect.vue";
import { useManufactureStore } from "stores/manufacture";
import { Notify } from "quasar";
import { useDictProduct } from "stores/dict_product";

const dictProductStore = useDictProduct();
const categoryStore = useCategoryStore();
const manufactureStore = useManufactureStore();

const name = ref("");
const category = ref("");
const manufacture = ref("");
const quantity = ref("");
const model = ref("");
const productPhoto = ref(null);

const manufactureList = computed(() => manufactureStore.getManufactures);
const categoryList = computed(() => categoryStore.getCategories);

const onSubmit = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("model", model.value);
  formData.append("quantity", +quantity.value);
  formData.append("categoryId", +category.value?.id);
  formData.append("manufactureId", +manufacture.value?.id);
  formData.append("photo", productPhoto.value);

  try {
    const changeData = await dictProductStore.createProduct(formData);
    if (changeData) {
      Notify.create("Чтобы изменения вступили в силу обновите страницу!");
    }
  } catch (error) {
    Notify.create("Произошла ошибка при создании нового продукта");
  }
};
onMounted(async () => {
  await categoryStore.list();
  await manufactureStore.list();
});
</script>
