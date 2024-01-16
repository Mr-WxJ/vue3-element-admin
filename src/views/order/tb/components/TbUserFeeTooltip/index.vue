<template>
  <div>
    <span>用户佣金</span>
    <el-tooltip placement="top" effect="light" transition="el-fade-in-linear">
      <template #content>
        <div style="margin-bottom: 5px">付款预估佣金：（付款金额 * 提成 - 技术服务费）* 平台比例</div>
        <div style="margin-bottom: 5px">结算预估佣金：（结算金额 * 提成 - 技术服务费）* 平台比例</div>
        <div style="margin-bottom: 5px">注：此为预估佣金，发生退款、保价等行为此金额会变化</div>
      </template>
      <el-icon><Warning /></el-icon>
    </el-tooltip>
  </div>
</template>
