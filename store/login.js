// State
export const state = () => ({
    isLogin: false,
    isAdminLogin: false,
})

// Mutations
export const mutations = {
    setLogin(state, response) {
        state.isLogin = response
    },
    setAdminLogin(state, response) {
        state.isAdminLogin = response
    }
}