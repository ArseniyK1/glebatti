<template>
  <q-page class="q-pa-sm">
    <div>
      <q-card class="no-border no-shadow bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input
            rounded
            v-model="search"
            outlined
            placeholder="Search Product"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="search = ''"
              />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm">
      <div
        class="col-md-4 col-lg-4 col-sm-12 col-xs-12"
        v-for="item in data"
        v-bind:key="item.id"
      >
        <card-product :data="item"></card-product>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CardProduct from "components/cards/CardProduct.vue";

const data = [
  {
    id: 1,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 2,
    amount: "$30",
    img: new URL(
      "../assets/products/c-d-x-PDX_a_82obo-unsplash.jpg",
      import.meta.url
    ),
    chip: "Discount 90%",
    chip_color: "grey-4",
    chip_class: "text-blue absolute-top-right",
  },
  {
    id: 2,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "$15",
    img: new URL(
      "../assets/products/frankie-valentine-VghbBAYqUJ0-unsplash.jpg",
      import.meta.url
    ),
  },
  {
    id: 3,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 1,
    amount: "$50",
    img: new URL(
      "../assets/products/giorgio-trovato-K62u25Jk6vo-unsplash.jpg",
      import.meta.url
    ),
    chip: "Sold Out",
    chip_color: "grey-8",
    chip_class: "text-white absolute-top-right",
  },
  {
    id: 4,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 5,
    amount: "$70",
    img: new URL(
      "../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg",
      import.meta.url
    ),
    chip: "Discount 50%",
    chip_color: "grey-4",
    chip_class: "text-blue absolute-top-right",
  },
  {
    id: 5,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 2,
    amount: "$50",
    img: new URL(
      "../assets/products/john-fornander-m2WpKnlLcEc-unsplash .jpg",
      import.meta.url
    ),
  },
  {
    id: 6,
    title: "Our Changing Planet",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 4,
    amount: "$30",
    img: new URL(
      "../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg",
      import.meta.url
    ),
  },
];

const search = ref("");
</script>

<style scoped></style>
