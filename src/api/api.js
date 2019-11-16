
import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  return request('app/v1_0/authorizations', 'post', { mobile, code })
}
/**
 * 获取我的频道信息（如果没登录，获取的是后台设置的默认频道列表）
 */
export const getMyChannels = () => {
  return request('/app/v1_0/user/channels', 'get')
}
/**
 * 获取文章列表
 * @param {Integer} channelId - 频道ID
 * @param {String} timestamp - 时间戳 相对于分页页码
 */
export const getArticles = (channelId, timestamp) => {
  return request('app/v1_1/articles', 'get', {
    channel_id: channelId,
    timestamp,
    with_top: 1
  })
}
