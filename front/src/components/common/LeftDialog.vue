<template>
  <div>
    <q-dialog
      transition-show="slide-left"
      transition-hide="slide-right"
      :model-value="visible"
      @update:model-value="updateVisible"
      position="right"
      full-height
      :persistent="persistent"
    >
      <q-card class="my-dialog" :style="calcMyDialogWidth">
        <div class="title q-pa-md row items-center">
          <span class="text-h6 f-bold">{{ title }}</span>
          <q-icon
            class="q-ml-auto cursor-pointer bg-negative q-pa-xs"
            name="close"
            style="border-radius: 15px"
            color="white"
            @click="handleClickCancel"
            size="20px"
            v-if="showClose"
          />
        </div>
        <div class="split-line h-1"></div>
        <div
          class="scroll content flex-center"
          style="height: 100%; border: 1px solid red"
        >
          <slot></slot>
        </div>
        <div class="q-px-md q-pb-md">
          <slot name="extra-description" />
        </div>
        <q-card-actions class="actions q-pa-none">
          <div class="q-pa-md full-width text-right">
            <div class="split-line h-1 q-my-md"></div>
            <q-btn
              label="Закрыть"
              color="primary"
              class="q-ml-md"
              @click="handleClickCancel"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  width: {
    type: String,
    default: "50vw",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close", "update:visible"]);

const calcMyDialogWidth = computed(() => {
  const width = Number(props.width.replace("vw", ""));
  if (width !== 50) {
    return { width: `${width}vw` };
  }
  const documentWidth = document.body.clientWidth;
  if (documentWidth < 600) {
    return {
      width: "90vw",
      maxWidth: "100vw",
    };
  } else if (documentWidth < 960) {
    return {
      width: "80vw",
      maxWidth: "100vw",
    };
  } else if (documentWidth < 1280) {
    return {
      width: "80vw",
      maxWidth: "100vw",
    };
  } else if (documentWidth < 1920) {
    return {
      width: "75vw",
      maxWidth: "100vw",
    };
  } else {
    return {
      width: "50vw",
      maxWidth: "100vw",
    };
  }
});

const handleClickCancel = () => {
  emit("update:visible", false);
  emit("close");
};

const updateVisible = (value) => {
  emit("update:visible", value);
};
const handleBeforeHide = () => {
  console.log("Before hide");
};
</script>

<style lang="scss" scoped>
//.body--dark {
//  .my-dialog {
//    background: #000000;
//  }
//
//  .title {
//    .close {
//      &:hover {
//        color: #000000;
//        background: #eeeeee;
//      }
//    }
//  }
//
//  .actions {
//    background: #000000;
//  }
//}
//
//.body--light {
//  .my-dialog {
//    background: #ffffff;
//  }
//
//  .title {
//    .close {
//      &:hover {
//        background: var(--my-grey-1);
//      }
//    }
//  }
//
//  .actions {
//    background: #ffffff;
//  }
//}
//
//.my-dialog {
//  border-radius: 12px 0 0 12px !important;
//  display: flex;
//  flex-direction: column;
//
//  .title {
//    padding: 16px;
//    font-size: 16px;
//    position: relative;
//  }
//
//  .content {
//    padding: 16px;
//  }
//
//  .actions {
//    width: 100%;
//    margin-top: auto;
//  }
//}
.my-dialog {
  background: #303030;
  color: #ffffff;
  border-radius: 12px 0 0 12px !important;
  display: flex;
  flex-direction: column;
}
</style>
