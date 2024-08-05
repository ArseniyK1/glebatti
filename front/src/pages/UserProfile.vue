<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm" style="height: 100%">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" style="height: 100%">
        <q-card
          class="card-bg text-white no-shadow"
          bordered
          style="height: 100%"
        >
          <q-card-section class="text-h6">
            <div class="text-h6">Профиль</div>
            <div class="text-subtitle2">Информация о пользователе</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.login"
                    label="Логин"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.email"
                    label="Почта"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.first_name"
                    label="Имя"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.last_name"
                    label="Фамилия"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.middle_name"
                    label="Отчество"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dark
                    color="white"
                    dense
                    v-model="user_details.role"
                    label="Роль"
                  />
                </q-item-section>
              </q-item>
              <!--              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
              <!--                <q-item-section>-->
              <!--                  <q-input-->
              <!--                    dark-->
              <!--                    color="white"-->
              <!--                    type="textarea"-->
              <!--                    dense-->
              <!--                    v-model="user_details.about"-->
              <!--                    label="Обо мне"-->
              <!--                  />-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info text-white">Обновить</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!--      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">-->
      <!--        <q-card class="card-bg text-white no-shadow" bordered>-->
      <!--          <q-card-section class="text-h6 q-pa-sm">-->
      <!--            <div class="text-h6">Change Password</div>-->
      <!--          </q-card-section>-->
      <!--          <q-card-section class="q-pa-sm row">-->
      <!--            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">-->
      <!--              <q-item-section> Current Password </q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">-->
      <!--              <q-item-section>-->
      <!--                <q-input-->
      <!--                  type="password"-->
      <!--                  dark-->
      <!--                  dense-->
      <!--                  outlined-->
      <!--                  color="white"-->
      <!--                  round-->
      <!--                  v-model="password_dict.current_password"-->
      <!--                  label="Current Password"-->
      <!--                />-->
      <!--              </q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">-->
      <!--              <q-item-section> New Password </q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">-->
      <!--              <q-item-section>-->
      <!--                <q-input-->
      <!--                  type="password"-->
      <!--                  dark-->
      <!--                  dense-->
      <!--                  outlined-->
      <!--                  color="white"-->
      <!--                  round-->
      <!--                  v-model="password_dict.new_password"-->
      <!--                  label="New Password"-->
      <!--                />-->
      <!--              </q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">-->
      <!--              <q-item-section> Confirm New Password </q-item-section>-->
      <!--            </q-item>-->
      <!--            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">-->
      <!--              <q-item-section>-->
      <!--                <q-input-->
      <!--                  type="password"-->
      <!--                  dark-->
      <!--                  dense-->
      <!--                  outlined-->
      <!--                  round-->
      <!--                  color="white"-->
      <!--                  v-model="password_dict.confirm_new_password"-->
      <!--                  label="Confirm New Password"-->
      <!--                />-->
      <!--              </q-item-section>-->
      <!--            </q-item>-->
      <!--          </q-card-section>-->
      <!--          <q-card-actions align="right">-->
      <!--            <q-btn class="text-capitalize bg-info text-white"-->
      <!--              >Change Password</q-btn-->
      <!--            >-->
      <!--          </q-card-actions>-->
      <!--        </q-card>-->
      <!--      </div>-->
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "stores/auth";
const authStore = useAuthStore();
const user_details = ref({
  first_name: "",
  last_name: "",
  middle_name: "",
  email: "",
  role: "",
});

onMounted(async () => {
  const authState = authStore.getParseProfile;
  user_details.value = authState;
  user_details.value.role = authState.roleId.description;
});
onUnmounted(() => {
  user_details.value = {
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    role: "",
  };
});
</script>

<style scoped>
.card-bg {
  background-color: #162b4d;
}
</style>
