<template>
  <div
    class="fullscreen text-white text-center q-pa-md flex flex-center"
    style="background: #303030"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Упс. Тут ничего нет...</div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        text-color="white"
        to="/"
        label="На главную"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
