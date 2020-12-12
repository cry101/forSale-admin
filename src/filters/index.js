
// 全局过滤器
const filterUrl = url => {
    const base = process.env.VUE_APP_BASE_API || '/api/'
    if (!url) return ''
    if (/http:\/\//.test(url)) {
        return url
    }
    return base + url
}

export { filterUrl }
