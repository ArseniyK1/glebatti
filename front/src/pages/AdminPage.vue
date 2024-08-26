<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <div class="row q-gutter-sm justify-center">
      <div class="col-5">
        <category-table @remove-product="removeCategory" />
      </div>
      <div class="col-6">
        <shop-table @remove-product="removeShop" />
      </div>
      <div class="col-10">
        <q-card class="bg-info text-white">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Регистрация продавца</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <common-input v-model="first_name" label="Имя" dense />
              <common-input v-model="last_name" label="Фамилия" dense />
              <common-input v-model="middle_name" dense label="Отчество" />
              <common-input v-model="email" label="Почта" dense lazy-rules />
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
                :options="shops_list"
                :option-label="(item) => item.name"
              />
              <div class="flex justify-between items-center">
                <q-btn
                  label="Зарегистрировать"
                  @click="signUpSeller"
                  type="button"
                  color="accent"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CategoryTable from "components/tables/CategoryTable.vue";
import ShopTable from "components/tables/ShopTable.vue";
import { useCategoryStore } from "stores/category";
import { useStorageStore } from "stores/storage";
import { useShopStore } from "stores/shop";
import CommonSelect from "components/common/CommonSelect.vue";
import CommonInput from "components/common/CommonInput.vue";
import { useAuthStore } from "stores/auth";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

const categoryStore = useCategoryStore();
const shopStore = useShopStore();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const email = ref("");
const verifyCodeVisible = ref(false);
const first_name = ref("");
const last_name = ref("");
const middle_name = ref("");
const shop = ref({});

const shops_list = computed(() => shopStore.getShops);

const signUpSeller = async () => {
  await authStore.signUpSeller(
    first_name.value,
    last_name.value,
    middle_name.value,
    username.value,
    password.value,
    email.value,
    shop.value.id
  );
};

const removeCategory = async (id) => {
  await categoryStore.removeCategory(id);
};

const removeShop = async (id) => {
  await shopStore.removeShop(id);
};

onMounted(async () => {
  await shopStore.list();
});
</script>

<style scoped></style>
