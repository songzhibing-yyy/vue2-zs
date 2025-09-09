import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { username,password}
 * @return {*} promise
 */
// 函数： 参数+逻辑+返回值
export function loginAPI(data) {
  return request({
    url: '/park/login', // baseURL+url
    method: 'POST', // 请求方法
    data // 请求体参数
  })
}
