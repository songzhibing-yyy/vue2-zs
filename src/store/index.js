import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 组合模块的配置项
  modules: {
    user:user
  }
})
// 组件中使用user模板中的数据
// this.$store.state.user.name

// 组件中触发mutation
// this.$store.commit('user/mutation name')、

// 组件触发action
// this.$store.dispatch('user/action name')

// 场景：1、组件中使用的state和方法很少 this.$store
// 场景：2、组件中使用的state和方法较多 映射方法mapState mapMutations mapActions
export default store
