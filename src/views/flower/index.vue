<script setup lang="ts">
import { getAllStudents, saveFlowers } from "@/api/flower";

import { StudentVO, FlowerForm } from "@/api/flower/types";

defineOptions({
  name: "Flower",
  inheritAttrs: false,
});

const flowerFormRef = ref(ElForm);

const loading = ref(false);

const dialog = reactive<DialogOption>({
  visible: false,
});

const studentList = ref<StudentVO[]>();

const formData = reactive<FlowerForm>({
  name: "",
  remark: "",
  students: [],
});

const rules = reactive({
  name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
});

const url_flower = "https://img.xuegaopuzi.com/uploads/other/flower.png";
const url_flowerpot = "https://img.xuegaopuzi.com/uploads/other/flowerpot.png";

/** 查询 */
function handleQuery() {
  loading.value = true;
  getAllStudents().then(({ data }) => {
    studentList.value = data;
  });
  loading.value = false;
}

/** 点击花盆 */
function GrowFlower(student: any) {
  if (student.flower === 1) {
    student.flower = 0;
  } else {
    student.flower = 1;
  }
}

/** 表单提交 */
// function handleSubmit() {
//   deptFormRef.value.validate((valid: any) => {
//     if (valid) {
//       const deptId = formData.id;
//       loading.value = true;
//       if (deptId) {
//         updateDept(deptId, formData)
//           .then(() => {
//             ElMessage.success("修改成功");
//             closeDialog();
//             handleQuery();
//           })
//           .finally(() => (loading.value = false));
//       } else {
//         addDept(formData)
//           .then(() => {
//             ElMessage.success("新增成功");
//             closeDialog();
//             handleQuery();
//           })
//           .finally(() => (loading.value = false));
//       }
//     }
//   });
// }

/** 关闭弹窗 */
function closeDialog() {
  dialog.visible = false;
  resetForm();
}

/** 重置表单  */
function resetForm() {
  flowerFormRef.value.resetFields();
  flowerFormRef.value.clearValidate();

  formData.id = undefined;
  formData.name = "";
  formData.remark = "";
  formData.students = [];
}

/**
 * vueUse 全屏
 */
const { isFullscreen, toggle } = useFullscreen();

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <!--全屏 -->
  <div class="fullscreen" @click="toggle">
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
  <div class="my-container">
    <el-row :gutter="16">
      <el-col v-for="item in studentList" :key="item" :span="2">
        <div
          class="card"
          :body-style="{ padding: '0px' }"
          @click="GrowFlower(item)"
        >
          <div class="flower">
            <el-image
              class="image-flower"
              :src="url_flower"
              :class="{ hidden: item.flower !== 1 }"
            />
          </div>
          <div class="flowerpot">
            <el-image class="image-flowerpot" :src="url_flowerpot" />
            <div class="student-name">{{ item.name }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.el-col {
  margin-bottom: 30px;
}

.my-container {
  padding: 40px;
  padding-left: 80px;
}

.fullscreen {
  float: right;
  width: 30px;
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
  color: var(--el-text-color-regular);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--el-color-info-light-3);
  }
}

.card {
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 120px;
  padding: 0;
  background-color: #fff;
}

.image-flower {
  display: block;
  width: 60px;
  margin-left: 10px;
  transition: opacity 0.5s ease;
}

.image-flower.hidden {
  opacity: 0;
}

.image-flowerpot {
  display: block;
  width: 60px;
  height: 40px;
  margin-left: 10px;
}

.flower {
  position: relative;
  display: inline-flex;
  flex: 1;
  width: 80px;
  margin-bottom: -1px;
}

.flowerpot {
  position: relative;
  align-self: flex-end;
  //display: inline-flex;
  width: 80px;
}

.student-name {
  //width: 80px;
  //position: absolute;
  //top: 0;
  //left: 0;
  display: flex;
  //align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #333;

  // 文本不可选
  user-select: none;
}
</style>
