<template>
  <q-select
    v-bind="selectProps"
    v-model="value"
    rounded
    outlined
    bg-color="white"
    :dense="dense"
    :label="label"
    :options="options"
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
      <slot name="append"></slot>
      <q-icon
        v-if="clearable && modelValue"
        @click="clear"
        name="fal fa-times"
        size="xs"
        style="cursor: pointer"
      />
    </template>
  </q-select>
</template>

<script setup>
import { ref, computed } from "vue";

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
  optionLabel: {
    type: String,
    default: "name",
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
  value.value = props.useInput ? "" : {};
};
</script>
