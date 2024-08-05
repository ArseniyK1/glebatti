<template>
  <q-page class="flex flex-center">
    <q-btn to="/auth">Auth</q-btn>
    <q-btn to="/products">Products</q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
