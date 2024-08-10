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
                label="Имя"
                dense
                v-if="isRegister"
              />
              <common-input
                v-model="last_name"
                label="Фамилия"
                dense
                v-if="isRegister"
              />
              <common-input
                v-model="middle_name"
                dense
                label="Отчество"
                v-if="isRegister"
              />
              <common-input
                v-model="email"
                v-if="isRegister"
                label="Почта"
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
              <common-input
                rounded
                dense
                v-model="verifyCode"
                label="Введите код"
                lazy-rules
                v-if="verifyCodeVisible"
              />
              <q-checkbox
                v-model="isSeller"
                label="Зарегистрироваться как продавец"
                v-if="isRegister"
              />
              <div class="flex justify-between items-center">
                <q-btn
                  :label="isRegister ? 'Зарегистрироваться' : 'Войти'"
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
import { onMounted, ref } from "vue";
import { useAuthStore } from "stores/auth";
import CommonInput from "components/common/CommonInput.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const quasar = useQuasar();
const router = useRouter();

const username = ref("test");
const password = ref("test");
const email = ref("kiselev-ars02@yandex.ru");
const isRegister = ref(false);
const isSeller = ref(false);
const verifyCode = ref("");
const verifyCodeVisible = ref(false);
const first_name = ref("Глеб");
const last_name = ref("Поленников");
const middle_name = ref("Александрович");

const handleSign = async () => {
  if (isRegister.value) {
    await authStore.signUp(
      first_name.value,
      last_name.value,
      middle_name.value,
      username.value,
      password.value,
      isSeller.value,
      email.value
    );
    if (!!localStorage.getItem("user-pass")) verifyCodeVisible.value = true;
  } else {
    await authStore.login(username.value, password.value);
  }
};

const handleVerify = async () => {
  await authStore.verifyCode(verifyCode.value);
};

onMounted(() => {
  if (localStorage.getItem("user-token")) {
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
  //background-image: linear-gradient(135deg, #3d5a80 0%, #ffffff 100%);
  background: #3d5a80;
}
</style>
