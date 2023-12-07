import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { StudentVO, FlowerForm } from "./types";

/**
 * 获取学生列表
 */
export function getAllStudents(): AxiosPromise<StudentVO[]> {
  return request({
    url: "/my.student/getALl",
    method: "get",
  });
}

/**
 * 保存小红花
 */
export function saveFlowers(): AxiosPromise<FlowerForm> {
  return request({
    url: "/my.student/save",
    method: "post",
  });
}
