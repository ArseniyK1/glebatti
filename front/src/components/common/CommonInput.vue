<template>
  <q-input v-bind="inputProps" v-model="value">
    <template v-slot:error>
      <slot name="error"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
      <q-icon
        v-if="clearable"
        :style="{ opacity: modelValue ? 1 : 0 }"
        @click="clear"
        name="fal fa-times"
        size="xs"
        style="cursor: pointer; transition: linear 0.2s"
      />
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  dense: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  lazyRules: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  step: {
    type: String,
    default: "any",
  },
});

const emits = defineEmits(["update:modelValue", "blur"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const inputProps = {
  ...props,
  "input-class": props.inputClass,
  "lazy-rules": props.lazyRules,
  step: props.step,
  type: props.type,
};

const clear = () => {
  value.value = "";
};
</script>

<style>
input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
