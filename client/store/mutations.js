import * as actionTypes from './actionTypes.js'

const mutations = {
    [actionTypes.FETCH_EXPENSES]: (state, expenses) => {
        state.expenses = expenses 
    },
    [actionTypes.CREATE_EXPENSE]: (state, expense) => {
        state.expenses.unshift(expense)
    },
    
    [actionTypes.DELETE_EXPENSE]: (state, id) => {
        state.expenses = state.expenses.filter(expense => expense._id !== id)
    }
  
}



export default mutations