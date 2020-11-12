import request from '@/utils/request'

// ---------------------------用户列表----------------------------
/**
 * 记录列表
 * @param nickName
*/
export function listCustomer(params) {
    return request({
        url: '/api/v1/customers',
        method: 'get',
        params
    })
}
