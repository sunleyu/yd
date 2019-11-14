// auth 权限认证的意思  token 令牌  封装工具模块
// 提供  获取 存储 删除 token   拿到的使用户信息,但主要使用token
// 设置key
const USER_KEY = 'hm-toutiao-m-84-user'

// 其实是拿用户信息 包括token  获取token

// 指定成员导出
export const getUser = () => {
  // 使用localStorage可以关闭浏览器后不清除token  拿出的的是字符串 需要转成对象
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
}
// 设置token 设置user需要传一个user设置
export const setUser = (user) => {
  return window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}
// 删除token
export const delUser = () => {
  return window.localStorage.removeItem(USER_KEY)
}
