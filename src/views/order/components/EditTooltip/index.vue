<template>
  <div>
    <span>操作</span>
    <el-tooltip placement="top" effect="light" transition="el-fade-in-linear">
      <template #content>
        <div style="margin-bottom: 5px">编辑：只可修改订单状态以及对应用户</div>
        <div style="margin-bottom: 5px">删除：只可删除无效订单，被删除的订单会被放入回收站</div>
      </template>
      <el-icon><Warning /></el-icon>
    </el-tooltip>
  </div>
</template>
