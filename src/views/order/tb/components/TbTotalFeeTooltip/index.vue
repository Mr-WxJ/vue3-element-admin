<template>
  <div>
    <span>佣金</span>
    <el-tooltip placement="top" effect="light" transition="el-fade-in-linear">
      <template #content>
        <div style="margin-bottom: 5px">联盟付款佣金：付款金额 * 提成</div>
        <div style="margin-bottom: 5px">实际付款佣金：付款金额 * 提成 - 技术服务费</div>
        <div style="margin-bottom: 5px">联盟结算佣金：结算金额 * 提成</div>
        <div style="margin-bottom: 5px">实际结算佣金：结算金额 * 提成 - 技术服务费</div>
        <div style="margin-bottom: 5px">注：此为预估佣金，发生退款、保价等行为此金额会变化</div>
      </template>
      <el-icon><Warning /></el-icon>
    </el-tooltip>
  </div>
</template>
