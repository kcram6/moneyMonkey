import actions from './actions.js'
import mutations from './mutations.js'
import * as actionTypes from './actionTypes.js'

const store = new Vuex.Store({
    state: {
        expenses: [],
    },
    actions,
    mutations,
})

store.dispatch(actionTypes.FETCH_EXPENSES)

export default store