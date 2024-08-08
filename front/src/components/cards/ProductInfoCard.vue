<template></template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  product: {
    type: Object,
    default: () => {},
  },
});
</script>
