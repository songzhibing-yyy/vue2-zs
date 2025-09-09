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
/**
 * 获取月卡详情
 * @data
 * @returns
 */
export function getCardDetailAPI(id) {
  return request({
    url: `/parking/card/detail/${id}`
  })
}

/**
 * 更新月卡
 * @data
 * @returns
 */
export function updateCardAPI(data) {
  return request({
    url: '/parking/card/edit',
    method: 'PUT',
    data
  })
}

/**
 * 删除月卡
 * @param {*} id
 * @returns
 */
export function delCardAPI(id) {
  return request({
    url: `/parking/card/${id}`,
    method: 'DELETE'
  })
}

