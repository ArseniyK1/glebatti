<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-dark text-white">
      <main-header />
    </q-header>

    <q-page-container>
      <div class="container">
        <router-view v-slot="{ Component }">
          <component :is="Component" class="bgDarkPage"></component>
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Notify, useQuasar } from "quasar";
// import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
import MainHeader from "components/main/MainHeader.vue";

// INJECTABLE
const quasar = useQuasar();
// const authStore = useAuthStore();
const router = useRouter();
// INJECTABLE

// REFS
const fullWidthMenu = ref(false);
const showMenu = ref(true);
// REFS

const isMobile = computed(() => quasar.screen.lt.md);

onMounted(async () => {
  if (isMobile.value) {
    showMenu.value = false;
    fullWidthMenu.value = true;
  }
  // try {
  //   const testToken = await authStore.loadProfile();
  //   !testToken && (await router.push("/login"));
  // } catch (e) {
  //   await router.push("/login");
  // }
});
</script>

<style lang="scss">
*::-webkit-scrollbar {
  width: 6px; /* ширина scrollbar */
}
*::-webkit-scrollbar-track {
  background-color: #9a9a9a;
  width: 3px;
  opacity: 0.75;
  right: 3px;
}
*::-webkit-scrollbar-thumb {
  background-color: #555555;
  border-radius: 20px; /* закругления плашки */
}
</style>
