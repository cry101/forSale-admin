import request from '@/utils/request'

// ---------------------------公司管理----------------------------
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

// ---------------------------分类管理----------------------------
/**
 * 分类列表
 * @param name
*/
export function listTag(params) {
    return request({
        url: '/api/v1/tags',
        method: 'get',
        params
    })
}

/**
 * 新增分类
 * @param name
*/
export function addTag(data) {
    return request({
        url: '/api/v1/tag',
        method: 'post',
        data
    })
}

/**
 * 更新分类
 * @param id
 * @param name
*/
export function modifyTag(data) {
    return request({
        url: `/api/v1/tag/${data.id}`,
        method: 'put',
        data
    })
}

/**
 * 删除分类
 * @param id
*/
export function deleteTag(data) {
    return request({
        url: `/api/v1/tag/${data.id}`,
        method: 'delete'
    })
}

// ---------------------------产品管理----------------------------
/**
 * 产品列表
 * @param name
*/
export function listProduct(params) {
    return request({
        url: '/api/v1/products',
        method: 'get',
        params
    })
}

/**
 * 新增产品
 * @param name
*/
export function addProduct(data) {
    return request({
        url: '/api/v1/product',
        method: 'post',
        data
    })
}

/**
 * 更新产品
 * @param id
 * @param name
*/
export function modifyProduct(data) {
    return request({
        url: `/api/v1/product/${data.id}`,
        method: 'put',
        data
    })
}

/**
 * 删除产品
 * @param id
*/
export function deleteProduct(data) {
    return request({
        url: `/api/v1/product/${data.id}`,
        method: 'delete'
    })
}
