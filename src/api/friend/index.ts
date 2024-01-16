import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { FriendQuery, FriendPageVO } from "./types";

/**
 * 获取好友分页列表
 *
 * @param queryParams
 */
export function getFriendPage(queryParams: FriendQuery): AxiosPromise<PageResult<FriendPageVO[]>> {
  return request({
    url: "/api/friend/page",
    method: "get",
    params: queryParams,
  });
}
