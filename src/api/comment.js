/**
 * 对评论或评论回复点赞
 */
export function addCommentLike(commentId) {
  return request({
    method: "POST",
    url: "/app/v1_0/comment/likings",
    data: {
      target: commentId
    }
  });
}

/**
 * 取消对评论或评论回复点赞
 */
export function deleteCommentLike(commentId) {
  return request({
    method: "DELETE",
    url: `/app/v1_0/comment/likings/${commentId}`
  });
}


/**
 * 添加评论或评论回复
 */
export const addComment = data => {
  return request({
    method: "POST",
    url: "/app/v1_0/comments",
    data
  })
}