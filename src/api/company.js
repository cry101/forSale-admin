import request from '@/utils/request'

/**
 * 公司列表
 * @param name
*/
export function listCompany(params) {
    return request({
        url: '/api/v1/companys',
        method: 'get',
        params
    })
}

/**
 * 新增公司
 * @param name
*/
export function addCompany(data) {
    return request({
        url: '/api/v1/company',
        method: 'post',
        data
    })
}

/**
 * 更新公司
 * @param id
 * @param name
*/
export function modifyCompany(data) {
    return request({
        url: `/api/v1/company/${data.id}`,
        method: 'put',
        data
    })
}

/**
 * 删除公司
 * @param id
*/
export function deleteCompany(data) {
    return request({
        url: `/api/v1/company/${data.id}`,
        method: 'delete'
    })
}
