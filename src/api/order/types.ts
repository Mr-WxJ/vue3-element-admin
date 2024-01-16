/**
 * 用户查询对象类型
 */
export interface OrderQuery extends PageQuery {
  // 订单编号
  id?: string;
  // 推广位Id
  pid?: string;
  // 商品名称
  keywords?: string;
  // 订单状态
  status?: number;
  // 开始时间
  startTime?: string;
  // 结束时间
  endTime?: string;
}

/**
 * 订单分页对象
 */
export interface OrderPageVO {
  /**
   * 订单ID
   */
  id: number;

  /**
   * 订单子编号
   */
  sid: string;

  /**
   * 订单父编号
   */
  parentId: string;

  /**
   * 订单唯一标记行
   */
  oid?: string;

  /**
   * 商品数量
   */
  num: number;

  /**
   * 退货数量：京东
   */
  returnNum?: number;

  /**
   * 付款金额
   */
  payPrice: number;

  /**
   * 结算金额
   */
  finishPrice: number;

  /**
   * 订单状态
   */
  status: number;

  /**
   * 类型：淘宝
   */
  type?: string;

  /**
   * 平台比例
   */
  platformRate: number;

  /**
   * pid=mm_1_2_3中的“3”
   */
  adzoneId?: number;

  /**
   * 自定义推广位名称
   */
  adzoneName?: string;

  /**
   * 用户wxid
   */
  userWxid?: string;

  /**
   * 支付时间
   */
  payTime?: Date;

  /**
   * 结算时间
   */
  finishTime?: Date;

  /**
   * 维权标签：淘宝
   */
  refundTag?: string;

  /**
   * 同跨店：2同店 3跨店
   */
  traceType?: string;

  /**
   * PLUS会员 0：否，1：是
   */
  plus?: number;

  /**
   * 计佣扩展信息：京东
   */
  feeExt?: string;

  /**
   * 价保赔付金额：京东
   */
  proPriceAmount?: number;

  /**
   * 预估结算时间：京东
   */
  payMonth?: string;

  /**
   * 支付信息
   */
  feePay?: FeePay;

  /**
   * 结算信息
   */
  feeFinish?: FeeFinish;

  /**
   * 商品信息
   */
  goods?: Goods;

  /**
   * 更新时间
   */
  updateTime?: Date;

  /**
   * 创建时间
   */
  createTime?: Date;

  userName?: string;
  userNote?: string;
  userAvatar?: string;
  userId?: number;
}

export interface FeePay {
  /**
   * 订单唯一标识：
   * 用户通过购物车购买的每个商品对应的订单编号，此订单编号并未在淘宝买家后台透出--子订单编号
   */
  oid: string;

  /**
   * 支付的时间
   */
  time: Date;

  /**
   * 付款预估佣金
   */
  preFee: number; // 使用number类型，因为BigDecimal在Java中，而在TypeScript中直接使用number

  /**
   * 淘宝技术服务费--通常为佣金的10%
   */
  deductFee: number;

  /**
   * （付款预估佣金-服务费 ）
   */
  actualFee: number;

  /**
   * 用户付款预估佣金，（预估佣金-服务费）* 平台比例
   */
  userFee: number;

  /**
   * 付款预估这个订单赚取的费用：
   * （付款预估佣金-服务费 ）- 订单的付款预估佣金（付款佣金-服务费）* 平台比例
   */
  earningFee: number;
}

export interface FeeFinish {
  /**
   * 订单唯一标识：
   * 用户通过购物车购买的每个商品对应的订单编号，此订单编号并未在淘宝买家后台透出--子订单编号
   */
  oid: string;

  /**
   * t_user表中的 微信id - user_wx_id
   * 为空则表示为尚未绑定用户，
   * 其他值为用户wxid
   */
  userWxid?: string;

  /**
   * 佣金状态：
   * 33：佣金冻结
   * 44：佣金清零
   * 66：佣金可提现
   * 88：佣金已发放，结算到对应用户余额当中
   */
  status: string;

  /**
   * 订单完成的时间
   */
  time: Date;

  /**
   * 最终预估结算佣金
   */
  preFee: number; // 使用number类型，因为BigDecimal在Java中，而在TypeScript中直接使用number

  /**
   * 淘宝技术服务费--通常为佣金的10%
   */
  deductFee: number;

  /**
   * 最终 结算的佣金（结算预估佣金-服务费 ）
   */
  actualFee: number;

  /**
   * 给用户结算的佣金（结算佣金-服务费）* 平台比例
   */
  userFee: number;

  /**
   * 最终这个订单赚取的费用：
   * （结算预估佣金-服务费 ）- 订单的结算预估佣金（结算佣金-服务费）* 平台比例
   */
  earningFee: number;

  /**
   * 结算记录id
   */
  settlementId?: number;

  /**
   * 提现记录id
   */
  withdrawId?: number;
}

export interface Goods {
  /**
   * 商品在淘宝或京东上的唯一id
   */
  unionId: string;

  /**
   * 商品名称
   */
  name: string;

  /**
   * 商品的链接
   */
  url: string;

  /**
   * 商品的图片链接
   */
  img: string;

  /**
   * 商品的店铺名
   */
  storeName: string;
}
