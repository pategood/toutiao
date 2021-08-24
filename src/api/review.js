/**
 * 文章评论相关模块
 */
import request from '@/utils/request'

/**
 * 获取文章评论列表
 */
export const getReviews = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/comments',
    params,
  })
}