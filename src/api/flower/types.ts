/**
 * 学生对象
 */
export interface StudentVO {
  /**
   * 学生ID
   */
  id?: number;
  /**
   * 学生姓名
   */
  name?: string;
  /**
   * 小红花
   */
  flower?: number;
}

/**
 * 小红花对象
 */
export interface FlowerForm {
  /**
   * 小红花ID
   */
  id?: string;
  /**
   * 小红花名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 备注
   */
  students: StudentVO[];
}
