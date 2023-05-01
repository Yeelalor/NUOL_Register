// State
export const state = () => ({
    isLogin: false,

})

// Mutations
export const mutations = {
    setLogin(state, response) {
        state.isLogin = response
    }
}