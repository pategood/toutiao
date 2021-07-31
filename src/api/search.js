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