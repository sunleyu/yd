import Vue from 'vue'
import Vuex from 'vuex'
// 把操作token的工具函数托管给vuex 因为组件要共享token(许多组件都需要用)
// - 共享token数据
// - 在vuex中更好操作，更好监听。
// 指定成员导入
// import {getUser}from '@/utils/auth'
// 全部成员导入
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    // 用户信息
    user: auth.getUser()
  },
  mutations: {
    // 修改用户信息(设置用户信息)
    // 默认传参+新的用户信息 user是对象(信息很多)
    setUser (state, user) {
      // 只修改了vuex里的数据
      // 如果刷新页面,代码重新执行,会再从本地拿去信息,
      state.user = user
      // 所以 在修改用户信息时要 同时 更新本地用户信息
      auth.setUser(user)
    },
    // 删除用户信息
    delUser (state) {
      state.delUser = {}
      // 更新本地用户信息
      auth.delUser()
    }
  },
  actions: {}
})
