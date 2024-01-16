<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :lg="24" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true" size="small">
            <el-form-item prop="status">
              <el-select v-model="queryParams.status" placeholder="全部状态" clearable class="!w-[150px]">
                <el-option v-for="item in orderStatusOptions" :key="item.code" :label="item.value" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <date-select ref="dateSelectRef" @date-range-change="dateRangeChange" />
            </el-form-item>
            <el-form-item prop="searchType">
              <el-select
                v-model="currentSearchType"
                placeholder="选择搜索类型"
                clearable
                class="!w-[150px]"
                @change="handleSearchTypeChange"
              >
                <el-option v-for="item in searchTypeOptions" :key="item.code" :label="item.value" :value="item.code" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="currentInputValue"
                placeholder="请输入"
                class="!w-[180px]"
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left: 10px" @click="handleQuery"><i-ep-search />搜索</el-button>
              <el-button @click="resetQuery">
                <i-ep-refresh />
                重置</el-button
              >
            </el-form-item>
            <div class="tool-right">
              <el-tooltip
                content="是否查看佣金"
                placement="top"
                size="small"
                effect="light"
                transition="el-fade-in-linear"
              >
                <el-switch
                  v-model="showFinalFee"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #d7d5d5"
                  active-text="佣金"
                  @change="tableKey = tableKey + 1"
                />
              </el-tooltip>
            </div>
          </el-form>
        </div>
        <!-- 订单列表 -->
        <el-card shadow="never" class="table-container">
          <el-table :key="tableKey" v-loading="listLoading" size="small" :data="orderList" fit style="width: 100%">
            <el-table-column label="订单信息" min-width="500px" align="left">
              <template #default="scope">
                <div class="order-goodsInfo">
                  <div class="order-itemImg">
                    <a :href="scope.row.goods.url" style="width: 100%; height: 80px">
                      <el-image :src="scope.row.goods.img" class="cover" style="width: 100%; height: 80px" />
                    </a>
                  </div>
                  <div class="order-info">
                    <div class="order-info-name">
                      <div
                        style="
                          width: 100%;
                          float: left;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          font-size: 13px;
                        "
                      >
                        <el-tooltip
                          :content="scope.row.goods.name"
                          placement="bottom-start"
                          effect="light"
                          transition="el-fade-in-linear"
                        >
                          <a :href="scope.row.goods.url">{{ scope.row.goods.name }}</a>
                        </el-tooltip>
                      </div>
                    </div>
                    <div class="order-info-left">店铺名：{{ scope.row.goods.storeName }}</div>
                    <div class="order-info-left">
                      <span>父订单编号：{{ scope.row.parentId }}</span>
                    </div>
                    <div class="order-info-left">
                      <span>子订单编号：{{ scope.row.sid }}</span>
                    </div>
                    <div>
                      <span class="order-info-money"
                        >付款金额：<span class="paid-money" style="color: #b22222"
                          >￥{{ scope.row.payPrice }}</span
                        ></span
                      ><span class="order-time">{{ scope.row.payTime }} 付款</span>
                    </div>
                    <div v-if="scope.row.finishPrice">
                      <span class="order-info-money"
                        >结算金额：<span class="paid-money">￥{{ scope.row.finishPrice }}</span></span
                      ><span class="order-time">{{ scope.row.finishTime }} 结算</span>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="订单状态" min-width="100px" align="center">
              <template #header>
                <TbOrderStatusTooltip />
              </template>
              <template #default="scope">
                <el-tag :type="getTagType(scope.row.status)">{{ formatOrderStatus(scope.row.status) }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="用户" min-width="100px" align="left" prop="userName" />

            <el-table-column label="用户佣金" min-width="180px">
              <template #header>
                <TbUserFeeTooltip />
              </template>
              <template #default="scope">
                <div class="rate-info">
                  <div v-if="scope.row.feePay" class="rate-info">
                    <span>付款预估佣金：</span><span class="rate-info-data">￥{{ scope.row.feePay.userFee }}</span>
                  </div>
                  <div v-if="scope.row.feeFinish" class="rate-info-final">
                    <span>结算预估佣金：</span
                    ><span class="rate-info-final-fee">￥{{ scope.row.feeFinish.userFee }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="showFinalFee" label="佣金" min-width="180px">
              <template #header>
                <TbTotalFeeTooltip />
              </template>
              <template #default="scope">
                <div class="rate-info">
                  <div v-if="scope.row.feePay" class="rate-info">
                    <span>联盟付款佣金：</span><span class="rate-info-data">￥{{ scope.row.feePay.preFee }}</span>
                  </div>
                  <div v-if="scope.row.feePay" class="rate-info">
                    <span>实际付款佣金：</span><span class="rate-info-data">￥{{ scope.row.feePay.actualFee }}</span>
                  </div>
                  <div v-if="scope.row.feeFinish" class="rate-info-final">
                    <span>联盟预估佣金：</span
                    ><span class="rate-info-final-fee">￥{{ scope.row.feeFinish.preFee }}</span>
                  </div>
                  <div v-if="scope.row.feeFinish" class="rate-info-final">
                    <span>实际结算佣金：</span
                    ><span class="rate-info-final-fee">￥{{ scope.row.feeFinish.actualFee }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="推广位" min-width="80px" align="center" prop="adzoneName">
              <template #header>
                <div>
                  <span>推广位</span>
                  <span>
                    <el-tooltip placement="top" effect="light" transition="el-fade-in-linear">
                      <template #content>
                        <div style="margin-bottom: 5px">指推广该订单的推广位</div>
                      </template>
                      <el-icon><Warning /></el-icon>
                    </el-tooltip>
                  </span>
                </div>
              </template>
            </el-table-column>

            <!-- <el-table-column label="操作" fixed="right" align="center" width="100">
              <template #header>
                <EditTooltip />
              </template>
              <template #default="scope">
                <el-button
                  v-hasPerm="['robot:order:tb:edit']"
                  type="primary"
                  size="small"
                  plain
                  @click="handleUpdate(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-hasPerm="['robot:order:tb:delete']"
                  size="small"
                  type="danger"
                  plain
                  style="margin-top: 5px; margin-left: 0px"
                  @click="handleDelete(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column> -->
          </el-table>

          <pagination
            v-if="total > 0"
            v-model:total="total"
            v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize"
            @pagination="handleQuery"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { getOrderPage } from "@/api/order";
import DateSelect from "@/components/DateSelect/index.vue";

import { OrderPageVO, OrderQuery } from "@/api/order/types";

const orderStatusOptions = [
  {
    code: 12,
    value: "已付款",
  },
  {
    code: 3,
    value: "已结算",
  },
  {
    code: 13,
    value: "已失效",
  },
];
const searchTypeOptions = [
  {
    code: "id",
    value: "订单号",
  },
  {
    code: "pid",
    value: "推广位",
  },
  {
    code: "keywords",
    value: "关键字",
  },
];

const tableKey = ref(0);
const total = ref(0);
const listLoading = ref(true);
const currentSearchType = ref("");
const currentInputValue = ref("");

const queryFormRef = ref(ElForm); // 查询表单
const userFormRef = ref(ElForm); // 用户表单
const dateSelectRef = ref(null!);

const queryParams = reactive<OrderQuery>({
  pageNum: 1,
  pageSize: 10,
});

// 设置查询的订单起止时间
function dateRangeChange(startTime: string, endTime: string) {
  queryParams.startTime = startTime;
  queryParams.endTime = endTime;
}

const orderList = ref<OrderPageVO[]>(); // 用户分页数据

// 展示总佣金
const showFinalFee = ref(false);

const downloadLoading = ref(false);

// 获取订单列表
async function getOrderList() {
  listLoading.value = true;
  getOrderPage(1, queryParams)
    .then(({ data }) => {
      orderList.value = data.list;
      total.value = data.total;
      console.log(orderList.value);
    })
    .finally(() => {
      listLoading.value = false;
    });
}

// 搜索订单
function handleQuery() {
  if (currentSearchType.value === "id") {
    queryParams.id = currentInputValue.value;
  } else if (currentSearchType.value === "pid") {
    queryParams.pid = currentInputValue.value;
  } else if (currentSearchType.value === "keywords") {
    queryParams.keywords = currentInputValue.value;
  }

  getOrderList();
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  queryParams.id = undefined;
  queryParams.pid = undefined;
  queryParams.keywords = undefined;
  queryParams.pageNum = 1;
  (dateSelectRef.value as any).resetDateRange();
}

function handleSearchTypeChange() {
  queryParams.id = undefined;
  queryParams.pid = undefined;
  queryParams.keywords = undefined;
}

function formatOrderStatus(status: number) {
  switch (status) {
    case 12:
      return "已付款";
    case 3:
      return "已结算";
    case 13:
      return "已失效";
    default:
      return "未知状态";
  }
}

function getTagType(status: number) {
  switch (status) {
    case 12:
      return "success"; // 设置为成功状态的标签
    case 3:
      return ""; // 设置为信息状态的标签
    case 13:
      return "info"; // 设置为危险状态的标签
    case 88:
      return "warning"; // 设置为警告状态的标签
    default:
      return "info"; // 默认为普通状态的标签
  }
}

// 处理订单修改的信息
function handleUpdate(row: any) {}

// 处理删除订单
function handleDelete(id: any) {}

/** 导出用户 */
function handleExport() {}

onMounted(() => {
  getOrderList();
});
</script>
