const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    company_id: state => state.user.company_id
}
export default getters
