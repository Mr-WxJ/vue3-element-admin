/**
 * 配置查询对象类型
 */
export interface ConfigVO {
  // id
  id: number;
  // 配置名称
  name?: string;
  // 配置类型
  type: number;
  // 配置键
  code: string;
  // 配置内容
  value: string | number;
  // 输入类型
  inputType: string;
  // 配置描述
  description?: string;
  // 是否必填
  required?: number;

  // 添加用于存储按钮显示状态的属性
  showButtons?: boolean;
}

export interface ConfigForm {
  // id
  id: number;
  // 配置名称
  name?: string;
  // 配置类型
  type: number;
  // 配置键
  code: string;
  // 配置内容
  value?: string | number;
  // 输入类型
  inputType: string;
  // 配置描述
  description?: string;
  // 是否必填
  required?: number;
}
