<template>
  <q-card class="bg-dark text-white">
    <q-img
      src="../../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg"
      height="220px"
    >
      <!--      <q-chip-->
      <!--        v-if="localData.chip"-->
      <!--        :class="localData.chip_class"-->
      <!--        :color="localData.chip_color"-->
      <!--        :label="localData.chip"-->
      <!--      ></q-chip>-->
    </q-img>

    <q-card-section>
      <q-btn
        fab
        :icon="mdiCartPlus"
        padding="sm"
        class="absolute bg-secondary"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <q-tooltip>Добавить в корзину</q-tooltip>
      </q-btn>
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ localData.name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        Производитель - "{{ localData.manufacture?.name }}"
      </div>
      <div>
        <!--        <q-rating-->
        <!--          v-model="localData.rating"-->
        <!--          max="5"-->
        <!--          size="1.5em"-->
        <!--          color="yellow"-->
        <!--          icon="star_border"-->
        <!--          icon-selected="star"-->
        <!--          icon-half="star_half"-->
        <!--          readonly-->
        <!--          no-dimming-->
        <!--        />-->
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ localData.price }}₽</span>
        <span class="text-h6 float-right">
          <q-btn label="Подробнее" rounded color="accent" />
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { mdiCartPlus } from "@mdi/js";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const localData = ref({ ...props.data });
</script>

<style scoped></style>
