<template>
  <q-select
    v-bind="selectProps"
    v-model="value"
    outlined
    bg-color="white"
    rounded
    label-color="dark"
    :dense="dense"
    :label="label"
    :options="options"
    :option-label="optionLabel"
    :readonly="readonly"
    :disable="disable"
    @update:model-value="$emit('update:modelValue', $event)"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
    @clear="$emit('clear')"
    @input="$emit('input')"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <q-icon
        v-if="value?.length"
        @click="clear"
        :name="mdiClose"
        size="xs"
        style="cursor: pointer"
      />
    </template>
  </q-select>
</template>

<script setup>
import { ref, computed } from "vue";
import { mdiClose } from "@mdi/js";

const props = defineProps({
  modelValue: {
    type: [Object, String, Number],
    default: () => ({}),
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
  readonly: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  hideSelected: {
    type: Boolean,
    default: false,
  },
  hideDropdownIcon: {
    type: Boolean,
    default: false,
  },
  useInput: {
    type: Boolean,
    default: false,
  },
  stackLabel: {
    type: Boolean,
    default: false,
  },
  fillInput: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  filterFn: {
    type: Function,
    default: null,
  },
  optionLabel: {
    type: Function,
    default: null,
  },
});

const emits = defineEmits([
  "update:modelValue",
  "blur",
  "focus",
  "clear",
  "input",
]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

const selectProps = {
  ...props,
  "option-label": props.optionLabel,
  "hide-selected": props.hideSelected,
  "hide-dropdown-icon": props.hideDropdownIcon,
  "use-input": props.useInput,
  "stack-label": props.stackLabel,
  "fill-input": props.fillInput,
};

const clear = () => {
  value.value = "";
};
</script>
