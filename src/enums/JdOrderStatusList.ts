// enums/JdOrderStatusList.ts

export const getJdOrderStatusText = (code: number): string => {
  const statusItem = JdOrderStatusList.find((item) => item.code === code);
  return statusItem ? statusItem.status : "未知状态";
};

export type JdOrderStatus = {
  code: number;
  status: string;
};

export const JdOrderStatusList: JdOrderStatus[] = [
  { code: -1, status: "未知" },
  { code: 2, status: "无效-拆单" },
  { code: 3, status: "已失效" },
  { code: 4, status: "无效-京东帮帮主订单" },
  { code: 5, status: "无效-账号异常" },
  { code: 6, status: "无效-赠品类目不返佣" },
  { code: 7, status: "无效-校园订单" },
  { code: 8, status: "无效-企业订单" },
  { code: 9, status: "无效-团购订单" },
  { code: 11, status: "无效-乡村推广员下单" },
  { code: 13, status: "违规订单-其他" },
  { code: 14, status: "无效-来源与备案网址不符" },
  { code: 15, status: "待付款" },
  { code: 16, status: "已付款" },
  { code: 17, status: "已完成" },
  { code: 19, status: "无效-佣金比例为0" },
  { code: 20, status: "无效-此复购订单对应的首购订单无效" },
  { code: 21, status: "无效-云店订单" },
  { code: 22, status: "无效-PLUS会员佣金比例为0" },
  { code: 23, status: "无效-支付有礼" },
  { code: 24, status: "已付定金" },
  { code: 25, status: "违规订单-流量劫持" },
  { code: 26, status: "违规订单-流量异常" },
  { code: 27, status: "违规订单-违反京东平台规则" },
  { code: 28, status: "违规订单-多笔交易异常" },
  { code: 29, status: "无效-跨屏跨店" },
  { code: 30, status: "无效-累计件数超出类目上限" },
  { code: 31, status: "无效-黑名单SKU" },
];
