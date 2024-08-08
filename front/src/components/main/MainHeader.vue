<template>
  <q-toolbar class="flex justify-between bg-dark text-white background">
    <div class="row items-center">
      <q-toolbar-title
        class="text-h6 montserrat-medium text-bold text-positive"
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        <q-icon :name="mdiMusic" color="positive"></q-icon>
        МузШоп
      </q-toolbar-title>
    </div>
    <div class="row items-center q-mr-lg">
      <q-btn
        v-for="({ title, route, icon }, index) in filteredMenu"
        :key="index"
        flat
        @click="$router.push(route)"
        :class="{
          'text-accent': isActiveRoute(route),
          'active-route': isActiveRoute(route),
        }"
      >
        <q-icon :name="icon" class="q-mr-sm"></q-icon>
        {{ title }}
      </q-btn>
    </div>
    <div class="row items-center">
      <q-icon
        :name="mdiCartOutline"
        class="cursor-pointer q-mr-md"
        :class="isActiveRouteCart"
        size="2rem"
        @click="$router.push('/cart')"
      >
        <q-badge color="red" floating rounded>{{ countProducts }}</q-badge>
      </q-icon>
      <q-btn class="q-mr-sm" flat round>
        <q-avatar class="avatar-button bg-accent">
          <q-icon name="person" color="dark"></q-icon>
          <q-menu
            :offset="[22, 6]"
            square
            style="border-radius: 0 0 0px 10px; box-shadow: none; z-index: 999"
            transition-duration="100"
            transition-hide="slide-up"
            transition-show="slide-down"
          >
            <q-list
              bordered
              separator
              class="text-white bg-dark"
              style="max-width: 318px"
            >
              <q-item @click="goToProfile" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="accent" name="user"></q-icon>
                </q-item-section>
                <q-item-section>Открыть профиль</q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item @click="logout" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon
                    color="secondary"
                    name="fal fa-right-from-bracket"
                  ></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Выйти</q-item-label>
                </q-item-section>
              </q-item>
              <!--              <q-item @click="toggleDarkMode" clickable v-ripple>-->
              <!--                <q-item-section>-->
              <!--                  <span>Сменить тему</span>-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->
            </q-list>
          </q-menu>
        </q-avatar>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script setup>
import { Dark, useQuasar } from "quasar";
import {
  mdiCartOutline,
  mdiMusic,
  mdiHome,
  mdiListBoxOutline,
  mdiStore,
  mdiHomeCity,
  mdiSecurity,
  mdiWarehouse,
} from "@mdi/js";
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth";
import { useCartStore } from "stores/cart";

const router = useRouter();
const quasar = useQuasar();
const authStore = useAuthStore();
const cartStore = useCartStore();

const filteredMenu = ref([]);
const menu = [
  { title: "Каталог", route: "/products", icon: mdiListBoxOutline, show: true },
  {
    title: "Магазины",
    route: "/shops",
    icon: mdiStore,
    show: true,
  },
  {
    title: "Склад",
    route: "/storage",
    icon: mdiWarehouse,
    show: authStore.isAdmin,
  },
  {
    title: "Админ",
    route: "/admin-panel",
    icon: mdiSecurity,
    show: authStore.isAdmin,
  },
];

const countProducts = computed(() => cartStore.getCountProducts);

const isActiveRoute = (route) => {
  return router.currentRoute.value.path === route;
};

const isActiveRouteCart = () => {
  console.log(router.currentRoute.value.path === "/cart");
  return router.currentRoute.value.path === "/cart"
    ? '"border-bottom: 2px solid #ff4081; padding-bottom: 2px"'
    : "";
};

const goToProfile = () => router.push("/profile");
const logout = () => {
  localStorage.clear();
  router.push("/auth");
};

const toggleDarkMode = () => {
  Dark.toggle();
};

onBeforeMount(() => {
  filteredMenu.value = menu.filter((el) => !!el.show);
});
onUnmounted(() => {
  filteredMenu.value = [];
});
</script>

<style>
.gradient-logo {
  background: linear-gradient(219deg, #fd7819 10%, #ff0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: table;
}
.avatar-button {
  transition: ease-in 0.1s;
}
.avatar-button:hover {
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4);
  transition: ease-out 0.1s;
}
.active-route {
  border-bottom: 2px solid #ff4081;
}

.body--light .background {
  background: white;
}
.body--dark .background {
  background: #020317;
}
</style>
