<!-- 用户管理 -->
<script setup lang="ts">
import { getFriendPage } from "@/api/friend";

import { FriendQuery, FriendPageVO } from "@/api/friend/types";

const queryFormRef = ref(ElForm); // 查询表单

const loading = ref(false); //  加载状态
const queryParams = reactive<FriendQuery>({
  pageNum: 1,
  pageSize: 10,
});
const dateTimeRange = ref("");
const total = ref(0); // 数据总数
const pageData = ref<FriendPageVO[]>(); // 用户分页数据

watch(dateTimeRange, (newVal) => {
  if (newVal) {
    queryParams.startTime = newVal[0];
    queryParams.endTime = newVal[1];
  }
});

/** 查询 */
function handleQuery() {
  loading.value = true;
  getFriendPage(queryParams)
    .then(({ data }) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

/** 重置查询 */
function resetQuery() {
  queryFormRef.value.resetFields();
  dateTimeRange.value = "";
  queryParams.pageNum = 1;
  queryParams.startTime = undefined;
  queryParams.endTime = undefined;
  handleQuery();
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 用户列表 -->
      <el-col :lg="24" :xs="24">
        <div class="search-container">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="关键字" prop="keywords">
              <el-input
                v-model="queryParams.keywords"
                placeholder="微信名称/备注/账号/wxid..."
                clearable
                style="width: 200px"
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item label="创建时间">
              <el-date-picker
                class="!w-[240px]"
                v-model="dateTimeRange"
                type="daterange"
                range-separator="~"
                start-placeholder="开始时间"
                end-placeholder="截止时间"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleQuery"><i-ep-search />搜索</el-button>
              <el-button @click="resetQuery">
                <i-ep-refresh />
                重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>

        <el-card shadow="never" class="table-container">
          <el-table v-loading="loading" :data="pageData">
            <el-table-column key="id" label="用户ID" align="center" prop="id" width="100" />
            <el-table-column label="微信名称" show-overflow-tooltip align="left" prop="name" width="150" />
            <el-table-column label="微信账号" show-overflow-tooltip align="left" prop="num" width="150" />
            <el-table-column label="好友备注" show-overflow-tooltip align="left" prop="note" width="150" />

            <el-table-column label="性别" width="100" align="center" prop="gender" />

            <el-table-column label="余额" align="center" prop="balance" width="120" />
            <el-table-column label="已提现金额" align="center" prop="income" width="120" />
            <el-table-column label="正在提现金额" align="center" prop="withdraw" width="120" />
            <el-table-column label="冻结金额" align="center" prop="freeze" width="120" />
            <el-table-column label="饭粒比例" align="center" prop="rate" width="120" />
            <el-table-column label="会员运营ID" align="center" prop="specialId" width="100" />

            <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
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
