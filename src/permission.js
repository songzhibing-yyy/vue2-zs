import router from './router'
import { getToken } from './utils/auth'
// 所有和权限控制相关的事
console.log('权限控制生效了')
const WHITE_LIST = ['/login', '404']
// 1.路由前置守卫
router.beforeEach((to, from, next) => {
  // from 从哪里来
  // to 到那里去
  // next 放行函数
  const token = getToken()
  if (token) {
    // 有token
    next()
  } else {
    // 没token
    // 是否在白名单内 -是否在数组中能找到 - path -to.path
    if (WHITE_LIST.includes(to.path)) {
      // 在白名单内
      next()
    } else {
      // 不在白名单内
      next('/login')
    }
  }
})

