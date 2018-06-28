const mongoose = require('mongoose')
const moment = require('moment')

const expenseSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min:1,
        max:99,
       
    },
    date: {
        type: String,
        required: true,
        default: moment().format('MMMM Do, YYYY'),
    }
})

module.exports = mongoose.model('Expense', expenseSchema)