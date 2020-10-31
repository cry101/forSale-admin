import request from '@/utils/request'

// ---------------------------进销记录----------------------------
/**
 * 记录列表
 * @param name
*/
export function listRecord(params) {
    return request({
        url: '/api/v1/records',
        method: 'get',
        params
    })
}

/**
 * 删除记录
 * @param id
*/
export function deleteRecord(data) {
    return request({
        url: `/api/v1/record/${data.id}`,
        method: 'delete'
    })
}

// ---------------------------库存列表----------------------------
/**
 * 记录列表
 * @param name
*/
export function listInventory(params) {
    return request({
        url: '/api/v1/inventorys',
        method: 'get',
        params
    })
}

/**
 * 删除记录
 * @param id
*/
export function deleteInventory(data) {
    return request({
        url: `/api/v1/inventory/${data.id}`,
        method: 'delete'
    })
}
