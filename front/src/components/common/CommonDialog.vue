<template>
  <q-dialog :persistent="persistent" v-model="computedIsVisible">
    <q-card v-bind:style="{ minWidth: width }">
      <q-card-section
        class="q-px-md q-pb-xs q-pt-sm cyan-animate-gradient-bg relative-position"
      >
        <div class="row items-center">
          <div class="q-pr-md col-7">
            <div
              class="montserrat-semi-bold text-white ellipsis"
              style="line-height: 1em"
            >
              {{ title }}
              <q-tooltip v-if="showTitleTooltip">{{ title }}</q-tooltip>
            </div>
            <div class="text-caption text-white ellipsis">{{ caption }}</div>
          </div>
          <q-space></q-space>
          <slot name="header-right" class="bg-dark"></slot>
          <q-btn
            @click="computedIsVisible = false"
            color="white"
            flat
            :icon="mdiClose"
            round
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pb-xs bg-dark">
        <slot></slot>
      </q-card-section>
      <q-card-actions align="right" class="bg-dark">
        <slot name="action"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup="props, emit">
import { computed } from "vue";
import { mdiClose } from "@mdi/js";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
  showTitleTooltip: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:isVisible"]);

const computedIsVisible = computed({
  get: () => props.isVisible,
  set: (v) => emit("update:isVisible", v),
});
</script>

<style scoped></style>
