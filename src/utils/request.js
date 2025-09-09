import axios from 'axios'
import { getToken } from './auth'
import { Message } from 'element-ui'

// 1、通用配置
// 2、定制化的配置

// 通用配置
// 1、axios实例化axios.create 基地址配置baseURL+超时timeout（100ms）

// 拓展：create方法可以调用多次，每次执行都会生成一个独一无二的实例
// export default const a = axios.create({baseURL: 'https://api-hmzs.itheima.net/v1', timeout: 5000}) // 生成一个新的实例
// export default const b = axios.create({baseURL: 'https://api-hmzs.itheima.net/v2', timeout: 5000}) // 生成一个新的实例

// 2、请求拦截器 请求头中添加token数据 接口鉴权 统一配置

// 客户端发送请求 - 请求拦截器（针对请求参数做处理） - 后端
// 拓展一下：可以添加多个请求拦截器
// 客户端请求 -> 请求拦截器1 -> 请求拦截器2 -> 后端

// 3、响应拦截器 数据剥离res.data / 401错误处理 /前端自定义错误 处理？

// 成功回调200-300
// 失败回调不在这个之间

// 后端-》相应拦截器-》客户端
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/v1',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken() // 获取token
    if (token) {
      config.headers.Authorization = token // 请求头中添加token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  // 接口出错的时候自动执行这个回调
  error => {
    console.dir(error.response.data.msg)
    // 错误类型可能有好多种 根据不同的状态码进行不同的错误提示
    Message.warning({
      type: 'warning',
      message: error.response.data.msg
    })
    return Promise.reject(error)
  }
)

export default service
