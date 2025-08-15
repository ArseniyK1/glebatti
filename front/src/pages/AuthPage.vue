<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.md ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                {{ isRegister ? "Регистрация" : "Авторизация" }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <common-input
                v-model="first_name"
                :label="`Имя ${isDev ? 'тест' : ''}`"
                dense
                v-if="isRegister"
              />
              <common-input
                v-model="last_name"
                :label="`Фамилия ${isDev ? 'тест' : ''}`"
                dense
                v-if="isRegister"
              />
              <common-input
                v-model="middle_name"
                dense
                :label="`Отчество ${isDev ? 'тест' : ''}`"
                v-if="isRegister"
              />
              <common-input
                v-model="email"
                v-if="isRegister"
                :label="`Почта ${isDev ? 'тест' : ''}`"
                dense
                lazy-rules
              />
              <common-input v-model="username" label="Логин" lazy-rules dense />
              <common-input
                type="password"
                dense
                rounded
                v-model="password"
                label="Пароль"
                lazy-rules
              />
              <common-select
                v-model="shop"
                dense
                rounded
                label="Выберите магазин"
                v-if="isRegister && isSeller"
                :options="shops_list"
                :option-label="(item) => item.name"
              />
              <common-input
                rounded
                dense
                v-model="verifyCode"
                label="Введите код"
                lazy-rules
                v-if="verifyCodeVisible"
              />

              <!--              <q-checkbox-->
              <!--                v-model="isSeller"-->
              <!--                label="Зарегистрироваться как продавец"-->
              <!--                v-if="isRegister"-->
              <!--              />-->
              <div class="flex justify-between items-center">
                <q-btn
                  :label="isRegister ? 'Зарегистрироваться' : 'Войти'"
                  v-if="!verifyCodeVisible"
                  @click="handleSign"
                  type="button"
                  color="accent"
                />
                <q-btn
                  label="Проверить код"
                  @click="handleVerify"
                  type="button"
                  color="accent"
                  v-if="verifyCodeVisible"
                />
                <p class="q-mt-md">
                  {{ isRegister ? "Есть аккаунт?" : "Нет аккаунта?" }}
                  <q-badge
                    class="cursor-pointer q-pa-sm"
                    color="info"
                    @click="isRegister = !isRegister"
                  >
                    {{ isRegister ? "Войти" : "Регистрация" }}
                  </q-badge>
                </p>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useAuthStore } from "stores/auth";
import CommonInput from "components/common/CommonInput.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import CommonSelect from "components/common/CommonSelect.vue";
import { useShopStore } from "stores/shop";
import { faker } from "@faker-js/faker";

const authStore = useAuthStore();
const shopStore = useShopStore();
const quasar = useQuasar();
const router = useRouter();
const isDev = process.env.DEV;

const isRegister = ref(false);
const username = ref(
  isDev && isRegister.value ? faker.internet.username() : ""
);
const password = ref("");
const email = ref("");
const isSeller = ref(false);
const verifyCode = ref("");
const verifyCodeVisible = ref(false);
const first_name = ref(`${isDev ? faker.person.firstName() : ""}`);
const last_name = ref(`${isDev ? faker.person.lastName() : ""}`);
const middle_name = ref(`${isDev ? faker.person.middleName() : ""}`);
const shop = ref({});

const shops_list = computed(() => shopStore.getShops);

const handleSign = async () => {
  if (isRegister.value) {
    await authStore.signUp(
      first_name.value,
      last_name.value,
      middle_name.value,
      username.value,
      password.value,
      false,
      email.value,
      shop.value.id
    );
    if (!!localStorage.getItem("user-pass")) verifyCodeVisible.value = true;
  } else {
    await authStore.login(username.value, password.value);
  }
};

const handleVerify = async () => {
  await authStore.verifyCode(verifyCode.value);
};

watch(isRegister, () => {
  if (isRegister.value && isDev) {
    username.value = faker.internet.username();
    email.value = "qwertototo2332@gmail.com";
    password.value = "test";
  }
});

onMounted(async () => {
  console.log(process.env);
  if (localStorage.getItem("user-token")) {
    await shopStore.list();
    quasar.notify({
      timeout: 10000,
      message: "Вы уже авторизованы!",
      color: "positive",
      type: "positive",
      position: "bottom-right",
      actions: [
        {
          label: "На главную",
          color: "white",
          handler: async () => {
            await router.push("/products");
          },
        },
      ],
    });
  }
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #3d5a80 0%, #ffffff 100%);
  background: #3d5a80;
}
</style>
