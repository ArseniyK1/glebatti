<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(async () => {
  try {
    if (localStorage.getItem("user-token")) {
      const testToken = await authStore.loadProfile();
      !testToken && (await router.push("/auth"));
    } else {
      await authStore.logout();
      await router.push("/auth");
    }
  } catch (e) {
    await authStore.logout();
    await router.push("/auth");
  }
});
</script>

<style></style>
