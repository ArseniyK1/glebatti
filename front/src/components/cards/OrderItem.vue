<template>
  <q-item class="bg-dark q-ma-sm text-white">
    <q-item-section avatar top>
      <q-icon name="account_tree" color="black" size="34px" />
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">GitHub</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">[quasarframework/quasar]</span>
        <span class="text-grey-8"> - GitHub repository</span>
      </q-item-label>
      <q-item-label caption lines="1">
        @rstoenescu in #3: > Generic type parameter for props
      </q-item-label>
      <q-item-label
        lines="1"
        class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
      >
        <span class="cursor-pointer">Open in GitHub</span>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="q-gutter-xs q-mt-sm">
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="delete"
          color="negative"
        />
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="done"
          color="positive"
        />
        <q-btn size="12px" flat dense round icon="more_vert" />
      </div>
    </q-item-section>
  </q-item>
</template>
<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>
