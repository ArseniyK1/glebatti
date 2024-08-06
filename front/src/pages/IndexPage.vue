<template>
  <q-page class="bg-dark text-white full-height">
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <!-- Primary Section -->
        <div class="text-h6 text-primary">Primary</div>
        <q-btn label="Primary Button" color="primary" />
        <q-input
          label="Primary Input"
          color="primary"
          bg-color="primary"
          label-color="dark"
          outlined
          rounded
        />
        <q-select
          filled
          label="Primary Select"
          :options="options"
          color="primary"
          label-color="white"
        />

        <!-- Secondary Section -->
        <div class="text-h6 text-secondary">Secondary</div>
        <q-btn label="Secondary Button" color="secondary" />
        <q-input
          filled
          label="Secondary Input"
          color="secondary"
          label-color="white"
        />
        <q-select
          filled
          label="Secondary Select"
          :options="options"
          color="secondary"
          label-color="white"
        />

        <!-- Accent Section -->
        <div class="text-h6 text-accent">Accent</div>
        <q-btn label="Accent Button" color="accent" />
        <q-input
          filled
          label="Accent Input"
          color="accent"
          label-color="white"
        />
        <q-select
          filled
          label="Accent Select"
          :options="options"
          color="accent"
          label-color="white"
        />

        <!-- Positive Section -->
        <div class="text-h6 text-positive">Positive</div>
        <q-btn label="Positive Button" color="positive" />
        <q-input
          filled
          label="Positive Input"
          color="positive"
          label-color="white"
        />
        <q-select
          filled
          label="Positive Select"
          :options="options"
          color="positive"
          label-color="white"
        />

        <!-- Negative Section -->
        <div class="text-h6 text-negative">Negative</div>
        <q-btn label="Negative Button" color="negative" />
        <q-input
          filled
          label="Negative Input"
          color="negative"
          label-color="white"
        />
        <q-select
          filled
          label="Negative Select"
          :options="options"
          color="negative"
          label-color="white"
        />

        <!-- Info Section -->
        <div class="text-h6 text-info">Info</div>
        <q-btn label="Info Button" color="info" />
        <q-input filled label="Info Input" color="info" label-color="white" />
        <q-select
          filled
          label="Info Select"
          :options="options"
          color="info"
          label-color="white"
        />

        <!-- Warning Section -->
        <div class="text-h6 text-warning">Warning</div>
        <q-btn label="Warning Button" color="warning" />
        <q-input
          filled
          label="Warning Input"
          color="warning"
          label-color="white"
        />
        <q-select
          filled
          label="Warning Select"
          :options="options"
          color="warning"
          label-color="white"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
      ],
    };
  },
};
</script>
