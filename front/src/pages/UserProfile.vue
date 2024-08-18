<template>
  <q-page class="q-pa-sm" style="background: #303030">
    <div class="row q-col-gutter-sm" style="height: 100%">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" style="height: 100%">
        <q-card
          class="bg-info text-white no-shadow"
          bordered
          style="height: 100%"
        >
          <q-card-section class="text-h6">
            <div class="flex items-center q-mb-sm">
              <q-icon
                :name="mdiCardAccountDetailsOutline"
                color="white"
                class="q-mr-sm"
                size="lg"
              />
              <div class="text-h6">Профиль</div>
            </div>
            <div class="text-subtitle2">Информация о пользователе</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.login"
                    label="Логин"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.email"
                    label="Почта"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.first_name"
                    label="Имя"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.last_name"
                    label="Фамилия"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.middle_name"
                    label="Отчество"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.role"
                    label="Роль"
                  />
                </q-item-section>
              </q-item>
              <q-item
                class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                v-if="user_details.shop?.id"
              >
                <q-item-section>
                  <common-input
                    readonly
                    dense
                    v-model="user_details.shop.name"
                    label="Магазин"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <!--          <q-card-actions align="right">-->
          <!--            <q-btn class="text-capitalize bg-info text-white">Обновить</q-btn>-->
          <!--          </q-card-actions>-->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "stores/auth";
import CommonInput from "components/common/CommonInput.vue";
import { mdiCardAccountDetailsOutline } from "@mdi/js";

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

<style scoped></style>
