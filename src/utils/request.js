// - 最大安全整数处理
// - token请求头携带
import store from '@/store'

// - 响应数据  获取有效数据 处理

// 封装模块 提供一个配置好的axios请求工具函数(调用接口)
// 最大安全值处理 安装生产依赖 npm i json-bigint
import JSONBIGINT from 'json-bigint'
import axios from 'axios'
import router from '../router'
// 默认的一个axios只能写一个配置
// 创建新的axios实例
const instance = axios.create({
  // 基准值
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 转换响应数据格式(配置) data是原始数据
  transformResponse: [(data) => {
    try {
      return JSONBIGINT.parse(data)
    } catch (e) {
      return data
    }
  }]
})

// 请求拦截器 追加token到请求头
instance.interceptors.request.use(config => {
  // 拦截成功
  // 获取token(vuex中的state中user里的token)
  if (store.state.user.token) {
    // 追加token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => Promise.reject(err))

// 响应拦截器
// 1.获取有效数据
// instance.interceptors.response.use(res => {
//   // 原始的res是什么格式返回什么格式
//   // 剥离无效数据  只剩下有效数据  res.data.data
//   // 有时候最后一个data不一定是data 有时候没有相应主体
//   try {
//     // 返回有效数据
//     return res.data.data
//   } catch (e) {
//     return res
//   }
// }, err => Promise.reject(err))
// 2.获取有效数据延长token有效期

instance.interceptors.response.use(res => {
  // 原始的res是什么格式返回什么格式
  // 剥离无效数据  只剩下有效数据  res.data.data
  // 有时候最后一个data不一定是data 有时候没有相应主体
  try {
    // 返回有效数据
    return res.data.data
  } catch (e) {
    return res
  }
}, async err => {
  // 请求失败走这个函数
  // 1.判断是否是401状态码
  // 2.如果是 判断是否登录
  //    如果没登录 拦截登录页面(登陆完回跳)
  //    如果登录了  就是token失效 发刷新token的请求
  //                              刷新成功 更新vuex和本地token  把之前请求重发
  //                              刷新失败  拦截登录页面(登陆完回跳)
  if (err.response && err.response.status === 401) {
    const user = store.state.user
    // if (user && user.token) {
    //   // 已登录
    // }
    //                                            回跳
    const loginConfig = {
      path: '/login',
      query: {
        redirectUrl: router.currentRoute.path
      }
    }
    if (!user || !user.token || !user.refresh_token) {
      // 未登录
      // 跳转登录页面
      return router.push(loginConfig)
    }
    // token失效  发刷新token的请求
    // 不能使instance instance已经有了一些配置(拿到token,但需要refresh_token)
    // 但刷新token不能用到这些配置 所以要用原始的axios发送请求
    try {
      const {
        data: {
          data
        }
      } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'put',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // res 是响应对象 res.data.token是拿到的信token
      // 更新vuex和本地token(mutations提交修改用commit)
      store.commit('setUser', {
        token: data.token,
        refresh_token: user.refresh_token
      })
      // 重新发送之前失败的请求
      return instance(err.config)
    } catch (e) {
      // 刷新token失败
      store.commit('delUser')
      return router.push(loginConfig)
    }
  }
})

// 导出调用接口函数工具
export default (url, method, data) => {
  // params 选项是 get传参
  // data 选项是 其他请求方式的传参
  // 返回值是promise
  return instance({
    url,
    method,
    // [里可以写js表达式]
    // js表达式运行的结果必须是字符串（params|data）
    // 严谨处理  get Get GET 都认为是get
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
