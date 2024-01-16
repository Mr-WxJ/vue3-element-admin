import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { OrderPageVO, OrderQuery } from "./types";

/**
 * 获取订单分页列表
 *
 * @param queryParams
 */
export function getOrderPage(platform: number, queryParams: OrderQuery): AxiosPromise<PageResult<OrderPageVO[]>> {
  return request({
    url: "/api/order/" + platform + "/page",
    method: "get",
    params: queryParams,
  });
}
