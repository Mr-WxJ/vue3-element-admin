<template>
  <div>
    <span>佣金比例</span>
    <el-tooltip placement="top" effect="light" transition="el-fade-in-linear">
      <template #content>
        <div style="margin-bottom: 5px">佣金比例：京东联盟设置的佣金比例</div>
        <div style="margin-bottom: 5px">
          分佣比例：京东联盟设置的最终分佣比例
        </div>
        <div style="margin-bottom: 5px">平台比例：本平台设置的用户佣金比例</div>
        <el-icon><Warning /></el-icon>
      </template>
    </el-tooltip>
  </div>
</template>
