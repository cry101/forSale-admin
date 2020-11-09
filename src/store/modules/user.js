import { login, userInfo } from '@/api/user'
import { getToken, setToken, removeToken, getCompany, setCompany } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        userInfo: {},
        company_id: getCompany()
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERINFO: (state, data) => {
        state.userInfo = data
    },
    SET_COMPANY: (state, data) => {
        state.company_id = data
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            userInfo(state.token).then(response => {
                const { data } = response

                commit('SET_USERINFO', data)
                if (!getCompany()) {
                    commit('SET_COMPANY', data.company_id)
                }
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            // logout(state.token).then(() => {
            removeToken() // must remove  token  first
            resetRouter()
            commit('RESET_STATE')
            resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    setCompany({ commit }, data) {
        return new Promise(resolve => {
            commit('SET_COMPANY', data)
            setCompany(data)
            resolve()
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

