// 1：淘宝，2：京东，3：机器人，4：其他
export const ConfigTypeEnum: ConfigType[] = [
  { type: 1, label: "淘宝", icon: "tb" },
  { type: 2, label: "京东", icon: "jd" },
  { type: 3, label: "机器人", icon: "robot" },
  { type: 4, label: "其他", icon: "config" },
];

export type ConfigType = {
  type: number;
  label: string;
  icon: string;
};
