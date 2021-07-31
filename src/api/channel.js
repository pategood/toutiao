/* eslint-disable eol-last */
/* 频道相关请求模块
 */

import request from '@/utils/request'

/*  获取所有频道列表 */

export const getAllChannels = () => {
    return request({
        methods: 'GET',
        url: '/app/v1_0/channels'
    })
}

/**
 * 添加用户频道
 */
export const addUserChannel = data => {
    return request({
        method: 'PATCH',
        url: '/app1_0/userannels',
        data
    })
}

/**
 * 删除用户频道
 */
export const deleteUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`
    })
}