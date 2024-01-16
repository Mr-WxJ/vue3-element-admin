<template>
  <div class="app-container">
    <el-card shadow="never" class="table-container">
      <el-tabs type="border-card" v-model="activeTabIndex" @tab-click="handleTabClick">
        <el-tab-pane v-loading="loading" v-for="(item, ind) in ConfigTypeEnum" :key="ind">
          <template #label>
            <span class="custom-tabs-label">
              <svg-icon :icon-class="item.icon" />
              <span>{{ item.label }}</span>
            </span>
          </template>
          <div v-for="(config, index) in configList" :key="index">
            <el-form ref="formRef" :model="config" label-width="150px" style="max-width: 700px">
              <el-form-item :label="config.name" prop="value" :rules="getRules(config)">
                <div v-if="config.inputType === 'radio'">
                  <el-radio-group :model-value="config.value" @input="onRadioChange($event, config)" size="small">
                    <el-radio label="0" border>关闭</el-radio>
                    <el-radio label="1" border>开启</el-radio>
                  </el-radio-group>
                </div>
                <el-input
                  v-else
                  clearable
                  :type="config.inputType"
                  v-model="config.value"
                  :show-password="config.inputType === 'password'"
                  @input="handleInputChange(config, index)"
                  @keydown="onKeydown($event, config)"
                >
                  <template
                    #prepend
                    v-if="config.code === 'robot_rate' || config.code === 'cash_day' || config.code === 'cash_min'"
                  >
                    <div v-if="config.code === 'robot_rate'">%</div>
                    <div v-if="config.code === 'cash_day'">号</div>
                    <div v-if="config.code === 'cash_min'">元</div>
                  </template>
                  <template #append>
                    <div v-if="config.showButtons">
                      <el-button class="custom-button" type="primary" @click="saveConfig(config, index)"
                        >保存</el-button
                      >
                      <el-button @click="cancelEdit(config, index)">取消</el-button>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { getConfigList, updateConfig } from "@/api/config";
import { ConfigVO, ConfigForm } from "@/api/config/types";
import { isTbPid } from "@/utils/verification-util";
import { ConfigTypeEnum } from "@/enums/ConfigTypeEnum";
import type { TabsPaneContext } from "element-plus";

const formRef = ref(ElForm); // 表单
const loading = ref(false);
const configList = ref<ConfigVO[]>();

const formData = reactive<ConfigForm>({
  id: 0,
  code: "",
  type: 0,
  inputType: "",
});

const configListOringal = ref<ConfigVO[]>([]);

const activeTabIndex = ref("0");

const handleTabClick = (tab: TabsPaneContext) => {
  const index = tab.index;
  if (index != undefined) {
    activeTabIndex.value = index;
    handleQuery(Number(index) + 1);
  }
};

/**
 * 查询
 */
function handleQuery(type: number) {
  // 重置父组件
  loading.value = true;
  getConfigList(type)
    .then(({ data }) => {
      configList.value = data;
      // configList.value = JSON.parse(JSON.stringify(data));
      configListOringal.value = JSON.parse(JSON.stringify(data));
    })
    .then(() => {
      loading.value = false;
    });
}

function handleUpdateConfig(config: ConfigVO, value: number | string) {
  loading.value = true;
  const index = Number(activeTabIndex.value) + 1;
  formData.id = config.id;
  formData.value = value;
  formData.code = config.code;
  formData.inputType = config.inputType;
  formData.type = index;
  updateConfig(formData)
    .then(() => {
      ElMessage.success("修改配置成功");
    })
    .finally(() => handleQuery(index));
}

const onKeydown = (e: any, config: any) => {
  if (config.inputType === "number") {
    // 输入框中禁止输入e、+、-
    let key = e.key;
    if (key === "e" || key === "E" || key === "+" || key === "-") {
      e.preventDefault();
    }
  }
};

function getRules(config: ConfigVO) {
  const rules: Array<any> = [];
  // 根据配置项动态生成校验规则
  // 添加必填项验证规则
  if (config.required) {
    rules.push({ required: true, message: `${config.name}不能为空`, trigger: "change" });
  }

  if (config.inputType === "number") {
    rules.push({ pattern: /^[0-9]*$/, message: "只能输入数字", trigger: "change" });
  } else if (config.inputType === "url") {
    rules.push({ type: "url", message: "必须是有效的URL地址", trigger: "change" });
  }
  if (config.code === "tb_pid") {
    rules.push({ validator: isTbPid, trigger: "blur" });
  }
  if (config.code === "cash_min") {
    rules.push({ min: 1, max: 28, message: "请输入1到100之间的数字", trigger: "change" });
  }

  return rules;
}

function handleInputChange(config: ConfigVO, index: number) {
  // 处理输入框值改变后的逻辑
  const value = config.value;

  if (value == configListOringal.value[index].value) {
    config.showButtons = false;
  } else {
    config.showButtons = true;
  }
}

function saveConfig(config: ConfigVO, index: number) {
  formRef.value[index].validate((valid: any) => {
    const value = config.value;
    if (valid && value != undefined) {
      handleUpdateConfig(config, value);
      config.showButtons = false;
    }
  });
}

function cancelEdit(config: ConfigVO, index: number) {
  // 处理输入框值改变后的逻辑
  config.value = configListOringal.value[index].value;
  config.showButtons = false;
  ElMessage({
    type: "info",
    message: "取消修改！",
  });
}

function onRadioChange(e: any, config: ConfigVO) {
  console.log(e, config);
  const value = e.target._value;
  const str = value === "0" ? "关闭" : "开启";
  ElMessageBox.confirm("确认要" + str + "?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      handleUpdateConfig(config, value);
      config.value = value;
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消" + str + "！",
      });
    });
}

onMounted(() => {
  handleQuery(1);
});
</script>

<style lang="scss" scoped>
.custom-input-append .custom-button {
  border-color: unset !important;
  background-color: unset !important;
  color: unset !important;
}
</style>
