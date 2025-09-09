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

/**
 * 新增月卡
 * @data
 * @returns
 */
export function createCardAPI(data) {
  return request({
    url: '/parking/card',
    method: 'POST',
    data
  })
}
