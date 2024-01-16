/**
 * 用户查询对象类型
 */
export interface FriendQuery extends PageQuery {
  keywords?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * 用户分页对象
 */
export interface FriendPageVO {
  /**
   * 用户头像地址
   */
  avatar?: string;
  /**
   * 创建时间
   */
  createTime?: Date;

  /**
   * 性别
   */
  gender?: string;
  /**
   * 用户ID
   */
  id?: number;

  wxid?: string;

  num?: string;

  name?: string;

  note?: string;

  balance?: string;

  income?: string;

  withdraw?: string;

  freeze?: string;

  rate?: string;

  specialId?: string;
}
