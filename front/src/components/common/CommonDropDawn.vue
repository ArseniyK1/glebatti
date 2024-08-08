<template>
  <q-btn-dropdown :color="color" :label="label" :icon="mdiPlusBox" dense>
    <div class="row no-wrap q-pa-md">
      <slot />
    </div>
  </q-btn-dropdown>
</template>

<script setup>
import { mdiPlusBox } from "@mdi/js";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "accent",
  },
});
</script>
