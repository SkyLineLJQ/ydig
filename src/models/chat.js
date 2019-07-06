let state = {
    user: {
        socketId: '',
        userName: '',
        passWord: '',
        img: 'static/img/2.9fb592e9.png'
    },
    sessions: [], //链接的列表
    currentId: '', // 选中当前的id
}

let mutations = {
    setSessions(state, data) {
        state.sessions = data
    },
    setCurrentId(state, data) {
        state.currentId = data
    },
}

let actions = {}

let getters = {
    sessions: state => {
        return state.sessions
    },
    currentId: state => {
        return state.currentId
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}