const moment = require('moment')
//model names are capitalized
const ExpenseModel = require('../models/expenses')


//this is the expenseController
module.exports = {
    listExpenses: (req, res, next) => {
        ExpenseModel.find()
            .then(expenses => res.json(expenses))
            .catch(e => {
                req.error = e
                next()
            })
    },
    listOneExpense: (req, res, next) => {
        ExpenseModel.findById(req.params.id)
            .then(expenses => { 
                if (expense === null) {
                    res.status(404).send()
                    return 
                }
                res.json(expenses)
            })
            .catch(e => {
                req.error = e
                next()
            })
    },
    createExpense: (req, res, next) => {
        ExpenseModel.create({
            description: req.body.description,
            amount: req.body.amount,
            quantity: req.body.quantity
            //don't need to pass in date because it is the default in the model
        })
            .then(expense => res.json(expense))
            .catch(e => {
                req.error = e
                next()
            }) 
    },
    updateExpense: (req, res, next) => {
        ExpenseModel.findById(req.params.id)
            .then(expense => {
                if (expense === null) {
                    res.status(404).send()
                    return 
                }
                expense.description = req.body.description
                expense.amount = req.body.amount
                expense.quantity = req.body.quantity
                return expense.save()
            })
            .then(expense => res.json(expense))
            .catch(e => {
                req.error = e
                next()
            })
    },

    deleteExpense: (req, res, next) => {
        ExpenseModel.findByIdAndRemove(req.params.id)
            .then(() => res.status(204).send())
            .catch(e => {
                req.error = e
                next()
            })
        
    },
}


