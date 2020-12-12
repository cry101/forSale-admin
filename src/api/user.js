import request from '@/utils/request'

/**
 * 用户登录
 * @param username
 * @param password
*/
export function login(data) {
    return request({
        url: `/v1/userLogin`,
        method: 'post',
        data
    })
}

/**
 * 获取用户信息
 * @param token in header
*/
export function userInfo() {
    return request({
        url: `/v1/userInfo`,
        method: 'get'
    })
}

// ---------------------------用户列表----------------------------
/**
 * 记录列表
 * @param nickName
*/
export function listUser(params) {
    return request({
        url: '/v1/users',
        method: 'get',
        params
    })
}

/**
 * 删除记录
 * @param id
*/
export function deleteUser(data) {
    return request({
        url: `/v1/user/${data.id}`,
        method: 'delete'
    })
}
