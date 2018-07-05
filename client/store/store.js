import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import * as actionTypes from './actionTypes.js'

const store = new Vuex.Store({
    state: {
        expenses: [],
    },
    actions,
    mutations,
    getters,
})

store.dispatch(actionTypes.FETCH_EXPENSES)

export default store