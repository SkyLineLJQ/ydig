let state = {
    isAllowedAction: true, // true 是人操作，false为机器操作
}

let mutations = {
    setIsAllowedAction(state, flag) {
        state.isAllowedAction = flag
    },
}

let actions = {}

let getters = {
    isAllowedAction: state => {
        return state.isAllowedAction
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}