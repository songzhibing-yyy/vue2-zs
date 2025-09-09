// 月卡管理相关接口
/**
 * @param {*} params {page,pageSize}
 * @returns
 */
import request from '@/utils/request'
export function getCardListAPI(params) {
  return request({
    url: '/parking/card/list',
    method: 'GET',
    params
  })
}
