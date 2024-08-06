<!-- StoresPage.vue -->
<template>
  <q-page padding class="stores-page" style="background: #303030; color: white">
    <q-card class="my-card no-shadow" style="background: #424242; color: white">
      <q-card-section class="text-center">
        <h1>Наши Магазины</h1>
        <q-list bordered class="stores-list">
          <q-item v-for="store in stores" :key="store.id" class="store-item">
            <q-item-section>
              <q-item-label>{{ store.name }}</q-item-label>
              <q-item-label caption>{{ store.address }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "StoresPage",
  data() {
    return {
      stores: [
        {
          id: 1,
          name: "Музыкальный Магазин №1",
          address: "ул. Пушкина, 10, Москва",
        },
        {
          id: 2,
          name: "Музыкальный Магазин №2",
          address: "ул. Ленина, 15, Санкт-Петербург",
        },
        {
          id: 3,
          name: "Музыкальный Магазин №3",
          address: "пр. Мира, 5, Екатеринбург",
        },
      ],
    };
  },
};
</script>

<style scoped>
.stores-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.my-card {
  max-width: 800px;
  margin: 10px 0;
}

.store-item {
  display: flex;
  align-items: center;
}

.stores-list {
  width: 100%;
}
</style>
