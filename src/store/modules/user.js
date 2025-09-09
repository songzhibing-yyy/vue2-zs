import { loginAPI } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
export default {
  namespaced: true,
  // 数据状态 响应式 data
  state: {
    token: getToken() || ''// 初始化优先从本地取

  },
  // 同步修改Vuex架构中 有且只有一种提交mutation
  mutations: {
    setToken(state, newToken) {
      // Vuex存一份
      state.token = newToken
      // Cookie也存一份
      setToken(newToken)
    }
  },
  // 异步 接口请求+提交mutation
  actions: {
    async asyncLogin(ctx, { username, password }) {
      // 调用登录接口
      const res = await loginAPI({ username, password })
      // 提交mutation
      ctx.commit('setToken', res.data.token)
    }
  }
}
