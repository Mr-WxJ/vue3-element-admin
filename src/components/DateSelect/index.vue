<template>
  <el-date-picker
    v-model="dateRange"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :clearable="false"
    :shortcuts="shortcuts"
    size="small"
    style="width: 280px"
    @change="dateRangeChange"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :disabled-date="disabledDateFn"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose } from "vue";
import { format, subDays } from "date-fns";

const shortcuts = [
  {
    text: "今天",
    value: () => {
      const end = new Date();
      const start = new Date();
      return [start, end];
    },
  },
  {
    text: "最近3天",
    value: () => {
      const end = new Date();
      const start = subDays(end, 3);
      return [start, end];
    },
  },
  {
    text: "最近7天",
    value: () => {
      const end = new Date();
      const start = subDays(end, 7);
      return [start, end];
    },
  },
  {
    text: "最近30天",
    value: () => {
      const end = new Date();
      const start = subDays(end, 30);
      return [start, end];
    },
  },
  {
    text: "最近90天",
    value: () => {
      const end = new Date();
      const start = subDays(end, 90);
      return [start, end];
    },
  },
  {
    text: "最近180天",
    value: () => {
      const end = new Date();
      const start = subDays(end, 180);
      return [start, end];
    },
  },
];

onMounted(() => {
  initDateRange();
});

const DISABLED_DATE_RANGE = 180; // 以天为单位

const dateRange = ref<[string, string]>(["", ""]);

const initDateRange = () => {
  const currentDate = new Date();
  const startDate = subDays(currentDate, 3); // 最近3天
  dateRange.value = [format(startDate, "yyyy-MM-dd"), format(currentDate, "yyyy-MM-dd")];
  dateRangeChange();
};

const disabledDateFn = (time: Date) => {
  const now = new Date();
  return time > now || time <= subDays(now, DISABLED_DATE_RANGE);
};

const emits = defineEmits(["dateRangeChange"]);

const dateRangeChange = () => {
  emits("dateRangeChange", dateRange.value[0], dateRange.value[1]);
};

defineExpose({ resetDateRange: initDateRange });
</script>
