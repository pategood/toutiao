// 搜索模块 api

import request from "@/utils/request";

export const getSearchSuggestions = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q //联想搜索关键词
        }
    })
}

/**
 * 获取搜索结果
 */
export function getSearchResult(params) {
    return request({
        method: "GET",
        url: "/app/v1_0/search",
        params
    })
}

/**
 * 获取用户搜索历史
 */
export function getUserSearchHistory() {
    return request({
        method: "GET",
        url: "/app/v1_0/search/histories"
    })
}