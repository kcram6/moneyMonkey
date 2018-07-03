import api from '../helpers/api.js'
import * as actionTypes from './actionTypes.js'

const actions = {
    [actionTypes.FETCH_EXPENSES]: ({ commit }) => 
        api.getExpenses()
            .then(expenses => commit(actionTypes.FETCH_EXPENSES, expenses)),

    [actionTypes.CREATE_EXPENSE]: ({ commit }, expense) =>
        api.addExpense(expense)
            .then(expense => commit(actionTypes.CREATE_EXPENSE, expense)),
    
    [actionTypes.COPY_EXPENSE]: ({ dispatch }, expense) =>
        dispatch(actionTypes.CREATE_EXPENSE, expense),

    [actionTypes.UPDATE_EXPENSE]: ({ commit }, expense) =>
        api.updateExpense(expense)
            .then(expense => commit(actionTypes.UPDATE_EXPENSE, expense)),

    [actionTypes.DELETE_EXPENSE]: ({ commit }, id) =>
        api.deleteExpense(id)
            .then(() => commit(actionTypes.DELETE_EXPENSE, id))
    
    
}

export default actions