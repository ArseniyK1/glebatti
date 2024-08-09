<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
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
              <q-input
                v-model="email"
                v-if="isRegister"
                label="Почта"
                lazy-rules
              />
              <q-input v-model="username" label="Логин" lazy-rules />
              <q-input
                type="password"
                rounded
                v-model="password"
                label="Пароль"
                lazy-rules
              />
              <q-input
                rounded
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
                  {{ isRegister ? "Уже есть аккаунт ?" : "Нет аккаунта ?" }}
                  <q-badge
                    class="cursor-pointer q-pa-sm"
                    color="info"
                    @click="isRegister = !isRegister"
                  >
                    {{ isRegister ? "Войти" : "Зарегистрироваться" }}
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
import { ref } from "vue";
import { useAuthStore } from "stores/auth";
const authStore = useAuthStore();
const username = ref("test");
const password = ref("test");
const email = ref("kiselev-ars02@yandex.ru");
const isRegister = ref(false);
const isSeller = ref(false);
const verifyCode = ref("");
const verifyCodeVisible = ref(false);
const showEmail = () => {
  isRegister.value = !isRegister.value;
};

const handleSign = async () => {
  if (isRegister.value) {
    await authStore.signUp(
      "Тест",
      "Тестов",
      "Тестович",
      username.value,
      password.value,
      isSeller.value,
      email.value
    );
    verifyCodeVisible.value = true;
  } else {
    await authStore.login(username.value, password.value);
  }
};

const handleVerify = async () => {
  await authStore.verifyCode(
    email.value,
    verifyCode.value,
    username.value,
    password.value
  );
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #8f8f8f 100%);
}
</style>
