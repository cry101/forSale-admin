import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

const CompanyId = 'Company'

export function getCompany() {
    return Cookies.get(CompanyId)
}

export function setCompany(id) {
    return Cookies.set(CompanyId, id)
}

export function removeCompany() {
    return Cookies.remove(CompanyId)
}
