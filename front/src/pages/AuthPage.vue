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
                  color="primary"
                />
                <p class="q-mt-md">
                  {{ isRegister ? "Уже есть аккаунт ?" : "Нет аккаунта ?" }}
                  <q-badge
                    class="cursor-pointer"
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
const email = ref("test@test.com");
const isRegister = ref(false);
const isSeller = ref(false);
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
  } else {
    await authStore.login(username.value, password.value);
  }
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
