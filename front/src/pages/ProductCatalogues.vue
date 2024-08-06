<template>
  <q-page class="q-pa-sm full-height" style="background: #303030">
    <div class="row q-ma-sm q-gutter-sm">
      <common-input
        dense
        label="Название товара "
        v-model="name"
        class="col-2"
      />
      <common-select
        dense
        label="Категория"
        v-model="category"
        class="col-2"
        :options="categories"
      />
      <common-select
        dense
        label="Магазин"
        v-model="brand"
        class="col-2"
        :options="brands"
      />
    </div>
    <div class="scroll-container q-mt-md">
      <div class="row q-col-gutter-sm full-width">
        <q-btn
          v-if="authStore.isAdmin"
          class="absolute-bottom-right z-max q-pa-md q-ma-md"
          size="md"
          :icon="mdiPlus"
          label="Добавить товар"
          rounded
          dense
          color="primary"
          @click="dialog = !dialog"
        />
        <div
          class="col-md-4 col-lg-4 col-sm-12 col-xs-12 q-gutter-lg-lg q-gutter-md-md q-gutter-sm-sm q-pa-sm"
          v-for="item in data"
          v-bind:key="item.id"
        >
          <card-product :data="item"></card-product>
        </div>
      </div>
    </div>
  </q-page>
  <common-dialog
    v-model="dialog"
    title="Добавление товара"
    caption="Заполните поля и добавьте товар"
    width="50vw"
  >
    <new-product-form />
  </common-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import CardProduct from "components/cards/CardProduct.vue";
import { useProductStore } from "stores/product";
import CommonScrollArea from "components/common/CommonScrollArea.vue";
import CommonSelect from "components/common/CommonSelect.vue";
import CommonInput from "components/common/CommonInput.vue";
import { mdiPlus } from "@mdi/js";
import { useAuthStore } from "stores/auth";
import CommonDialog from "components/common/CommonDialog.vue";
import NewProductForm from "components/forms/NewProductForm.vue";

const $q = useQuasar();
const productStore = useProductStore();
const authStore = useAuthStore();
const dialog = ref(false);
const search = ref("");
const name = ref("");
const category = ref(null);
const model = ref("");
const priceRange = ref(null);
const brand = ref(null);
const data = ref([]);
const categories = ["Гитара", "Барабаны", "Клавиши", "Духовые", "Скрипка"];
const brands = ["Yamaha", "Fender", "Gibson", "Roland", "Korg"];

const isMobile = computed(() => $q.screen.width <= 600);
const isTabletOrMobile = computed(() => $q.screen.width <= 1024);

onMounted(async () => {
  await productStore.list();
  data.value = productStore.getProducts;
});
</script>

<style scoped>
.scroll-container {
  max-height: calc(100vh - 140px); /* Устанавливаем высоту контейнера */
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
}
.fixed-bottom-right {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.filters {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.filters .q-item-section {
  margin-bottom: 12px;
}
</style>
