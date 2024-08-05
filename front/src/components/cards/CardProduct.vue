<template>
  <q-card class="no-shadow" bordered>
    <q-img :src="localData.img" height="220px">
      <q-chip
        v-if="localData.chip"
        :class="localData.chip_class"
        :color="localData.chip_color"
        :label="localData.chip"
      ></q-chip>
    </q-img>

    <q-card-section>
      <q-btn
        fab
        color="teal-7"
        :icon="mdiCartPlus"
        padding="sm"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ localData.title }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ localData.caption }}
      </div>
      <div>
        <q-rating
          v-model="localData.rating"
          max="5"
          size="1.5em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          readonly
          no-dimming
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ localData.amount }}</span>
        <span class="text-h6 float-right">
          <q-btn label="See Details" rounded color="secondary" outline></q-btn>
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
