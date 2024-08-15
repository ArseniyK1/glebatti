<template>
  <div>
    <slot name="custom-top"></slot>
    <q-table
      :title="title"
      class="standart-table relative-position text-white bg-info"
      :bordered="bordered"
      :columns="columns"
      :flat="flat"
      :row-key="rowKey"
      :rows="rows"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="28"
      :square="square"
      :style="'max-height:' + height"
      :dense="dense"
      @row-click="onRowClick"
      :separator="separator"
      table-header-class="text-white"
      v-model:pagination="pagination"
      virtual-scroll
      @virtual-scroll="scrollHandler"
      ref="tableRef"
    >
      <div
        v-if="isLoading"
        style="
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: blue;
        "
      ></div>
      <template
        v-for="slot of Object.keys($slots).filter(
          (e) =>
            e.includes('body') || e.includes('header') || e.includes('bottom')
        )"
        v-slot:[slot]="scope"
      >
        <slot :name="slot" v-bind="scope"></slot>
      </template>
      <template v-slot:top-right>
        <slot name="top-right" />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { mdiPlusBox } from "@mdi/js";

const props = defineProps({
  columns: {
    //заголовки
    type: Array,
    default: () => [],
  },
  rows: {
    //контент таблицы
    type: Array,
    default: () => [],
  },
  flat: {
    //таблица без тени
    type: Boolean,
    default: false,
  },
  bordered: {
    //таблица обведена
    type: Boolean,
    default: false,
  },
  square: {
    //острые углы
    type: Boolean,
    default: false,
  },
  wordWrapHeaders: {
    // перенос заголовков столбцов по словам
    type: Boolean,
    default: false,
  },
  isLoading: {
    //флаг загрузки
    type: Boolean,
    default: false,
  },
  noAdd: {
    //убрать кнопку добавления
    type: Boolean,
    default: false,
  },
  noActions: {
    //убрать 3 точки справа над таблицей
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: String,
    default: "index",
  },
  dense: {
    type: Boolean,
    default: true,
  },
  separator: {
    type: String,
    default: "horizontal",
  },
  title: {
    type: String,
    default: "",
  },
  hideBottom: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "360px",
  },
});

const emit = defineEmits([
  "add",
  "update:period",
  "open",
  "onScroll",
  "delete",
  "showButtons",
  "download",
  "setUnload",
  "selectRow",
]);

const pagination = ref({ rowsPerPage: 0 });
const tableRef = ref(null);
const indexRow = ref(0);

const scrollHandler = ({ index, to, direction }) => {
  if (index === to && direction === "increase" && props.rows?.length > 1) {
    emit("onScroll");
  }
};
const onRowClick = (evt, row, index) => {
  indexRow.value = index;
  emit("open", row);
  emit("selectRow", row.id || row.document_id);
};
</script>

<style scoped>
.standart-table {
  position: relative;
  font-size: 0.75rem;
}

.move .standart-table {
  height: calc(100vh - 230px);
}

.move .row {
  align-items: center;
}

.mdlp-wizzard .income-mdlp-list .standart-table {
  position: relative;
  height: calc(100vh - 230px);
}

.income-mdlp-list .standart-table {
  position: relative;
  height: calc(100vh - 197px);
}

.table__tsd .standart-table {
  height: calc(100vh - 185px);
}

.table__recipe .standart-table {
  height: calc(100vh - 185px);
}

.unload-table .standart-table {
  height: calc(100vh - 185px);
}

.wizzard_step .income-mdlp-list .standart-table {
  position: relative;
  height: calc(100vh - 315px);
}

.full-screen-table .standart-table {
  position: relative;
  height: calc(100vh - 100px);
}

.full-screen-contract-table .standart-table {
  position: relative;
  height: calc(100vh - 125px);
}

.standart-table .table__column-name {
  min-width: 200px;
  max-width: 400px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table thead tr:first-child th {
  background: #fc691a; /* fallback for old browsers */
  background: linear-gradient(
    110deg,
    #fc691a,
    #f78b33,
    #fc691a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.standart-table .q-table__top,
.standart-table .q-table__bottom,
.standart-table thead tr th {
  position: sticky;
  z-index: 1;
  font-size: 0.75rem;
}
.standart-table thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
.standart-table thead tr:first-child th {
  top: 0;
}

.FARM__fab-button--small {
  position: absolute;
  right: 25px;
  bottom: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.standart-table .table__column-date {
  min-width: 30px;
  max-width: 60px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-id {
  min-width: 20px;
  max-width: 170px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-reason {
  min-width: 100px;
  max-width: 250px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-number {
  min-width: 40px;
  max-width: 100px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-doc_num {
  min-width: 40px;
  max-width: 100px;
  white-space: normal;
  text-overflow: ellipsis;
  font-size: 0.75rem;
}

.standart-table .table__column-partner {
  min-width: 150px;
  max-width: 600px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-storage {
  min-width: 150px;
  max-width: 600px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-destruction_type {
  min-width: 150px;
  max-width: 600px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-division_addresses {
  min-width: 150px;
  max-width: 600px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-source {
  min-width: 150px;
  max-width: 600px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-contract {
  min-width: 60px;
  max-width: 150px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-total_sum {
  min-width: 40px;
  max-width: 100px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-name {
  min-width: 200px;
  max-width: 400px;
  white-space: normal;
  font-size: 0.75rem;
}

/*.standart-table .table__column-contract {*/
/*  min-width: 100px;*/
/*  max-width: 200px;*/
/*  white-space: normal;*/
/*  font-size: 12px;*/
/*}*/

.standart-table .table__column-storage_address {
  min-width: 100px;
  max-width: 300px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-name--full {
  min-width: 200px;
  white-space: normal;
  font-size: 0.75rem;
}

.standart-table .table__column-status {
  white-space: normal;
  font-size: 23px;
}

.contract-table .table__column-number {
  white-space: normal;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
}
</style>
