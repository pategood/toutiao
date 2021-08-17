/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
/**
 * 获取文章详情
 */
export const getArticle = articleId => {
  return request({
    method: "GET",
    url: `/app/v1_0/articles/${articleId}`
  })
}
