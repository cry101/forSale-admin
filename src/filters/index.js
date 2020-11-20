
// 全局过滤器
const filterUrl = url => {
    if (!url) return ''
    if (/http:\/\//.test(url)) {
        return url
    }
    return process.env.VUE_APP_BASE_API + '/api/' + url
}

export { filterUrl }
