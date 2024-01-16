<template>
  <div>
    <span>用户佣金</span>
    <el-tooltip placement="top" effect="light" transition="el-fade-in-linear" scoped-slot>
      <div slot="content" style="margin-bottom: 5px">付款预估佣金：付款金额 * 佣金比例 * 分成比例 * 平台比例</div>
      <div slot="content" style="margin-bottom: 5px">结算预估佣金：结算金额 * 佣金比例 * 分成比例 * 平台比例</div>
      <div slot="content" style="margin-bottom: 5px">注：此为预估佣金，发生退款、保价等行为此金额会变化</div>
      <i class="el-icon-warning-outline" style="color:orange; margin-left:5px; cursor:pointer;" />
    </el-tooltip>
  </div>
</template>

