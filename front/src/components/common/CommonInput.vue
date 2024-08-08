<template>
  <q-input
    v-bind="inputProps"
    v-model="value"
    outlined
    rounded
    color="transparent"
    style="background-color: #e6e6fa; border-radius: 1.3rem"
    label-color="dark"
    :dense="dense"
    :label="label"
    :readonly="readonly"
    :disable="disable"
  >
    <template v-slot:error>
      <slot name="error"></slot>
    </template>
    <template v-slot:append>
      <q-icon
        v-if="value"
        :style="{ opacity: modelValue ? 1 : 0 }"
        @click="clear"
        :name="mdiClose"
        size="xs"
        style="cursor: pointer; transition: linear 0.2s"
      />
    </template>
    <template v-slot:prepend>
      <q-icon v-if="icon" :name="icon" size="xs" />
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed } from "vue";
import { mdiClose } from "@mdi/js";
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
  disable: {
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
  icon: {
    type: String,
    default: "",
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
