import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserForm, UserInfo, UserPageVO, UserQuery } from "./types";

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfoApi(): AxiosPromise<UserInfo> {
  return request({
    url: "/api/user/me",
    method: "get",
  });
}

/**
 * 获取用户分页列表
 *
 * @param queryParams
 */
export function getUserPage(queryParams: UserQuery): AxiosPromise<PageResult<UserPageVO[]>> {
  return request({
    url: "/api/user/page",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取用户表单详情
 *
 * @param userId
 */
export function getUserForm(userId: number): AxiosPromise<UserForm> {
  return request({
    url: "/api/user/" + userId + "/form",
    method: "get",
  });
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data: any) {
  return request({
    url: "/api/user",
    method: "post",
    data: data,
  });
}

/**
 * 修改用户
 *
 * @param id
 * @param data
 */
export function updateUser(id: number, data: UserForm) {
  return request({
    url: "/api/user/" + id,
    method: "put",
    data: data,
  });
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export function updateUserPassword(id: number, password: string) {
  return request({
    url: "/api/user/" + id + "/password",
    method: "patch",
    params: { password: password },
  });
}

/**
 * 删除用户
 *
 * @param ids
 */
export function deleteUsers(ids: string) {
  return request({
    url: "/api/user/" + ids,
    method: "delete",
  });
}

/**
 * 下载用户导入模板
 *
 * @returns
 */
export function downloadTemplateApi() {
  return request({
    url: "/api/user/template",
    method: "get",
    responseType: "arraybuffer",
  });
}

/**
 * 导出用户
 *
 * @param queryParams
 * @returns
 */
export function exportUser(queryParams: UserQuery) {
  return request({
    url: "/api/user/_export",
    method: "get",
    params: queryParams,
    responseType: "arraybuffer",
  });
}

/**
 * 导入用户
 *
 * @param file
 */
export function importUser(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/user/_import",
    method: "post",
    params: {},
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
