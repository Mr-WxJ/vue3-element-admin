import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { ConfigVO, ConfigForm } from "./types";

/**
 * 获取配置列表
 *
 */
export function getConfigList(type: number): AxiosPromise<ConfigVO[]> {
  return request({
    url: "/api/config/" + type + "/list",
    method: "get",
  });
}

/**
 * 修改用户
 *
 * @param id
 * @param data
 */
export function updateConfig(data: ConfigForm) {
  return request({
    url: "/api/config/update",
    method: "put",
    data: data,
  });
}
