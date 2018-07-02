import api from '../helpers/api.js'
import * as actionTypes from './actionTypes.js'

const actions = {
    [actionTypes.FETCH_EXPENSES]: ({ commit }) => 
        api.getExpenses()
            .then(expenses => commit(actionTypes.FETCH_EXPENSES, expenses))
    
}

export default actions