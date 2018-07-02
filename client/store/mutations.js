import * as actionTypes from './actionTypes.js'

const mutations = {
    [actionTypes.FETCH_EXPENSES]: (state, expenses) => {
        state.expenses = expenses 
    }
}

export default mutations