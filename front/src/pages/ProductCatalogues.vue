<template>
  <q-page class="q-pa-sm">
    <div class="row q-ma-sm q-gutter-sm">
      <q-input
        rounded
        v-model="search"
        outlined
        class="col-2"
        placeholder="Название товара"
        dense
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="search"
            name="clear"
            class="cursor-pointer"
            @click="search = ''"
          />
        </template>
      </q-input>

      <q-select
        rounded
        v-model="category"
        outlined
        class="col-2"
        :options="options"
        label="Категория"
        dense
      />

      <common-select
        dense
        label="Бренд"
        v-model="brand"
        class="col-2"
        :options="brands"
      />
    </div>
    <div class="scroll-container">
      <div class="row q-col-gutter-sm full-width">
        <div
          class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
          v-for="item in data"
          v-bind:key="item.id"
        >
          <card-product :data="item"></card-product>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import CardProduct from "components/cards/CardProduct.vue";
import { useProductStore } from "stores/product";
import CommonScrollArea from "components/common/CommonScrollArea.vue";
import CommonSelect from "components/common/CommonSelect.vue";

const $q = useQuasar();
const productStore = useProductStore();
const dialog = ref(false);
const search = ref("");
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
  console.log(productStore.getProducts);
  data.value = productStore.getProducts;
});
</script>

<style scoped>
.scroll-container {
  max-height: calc(100vh - 130px); /* Устанавливаем высоту контейнера */
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
