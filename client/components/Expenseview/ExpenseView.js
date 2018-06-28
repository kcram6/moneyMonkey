
import data from './data.js'
import template from './template.js'
import api from '../../helpers/api.js'


const ExpenseView = Vue.component('expense-view', {
	data,
	template,
	created() {
		api.getExpenses()
			.then(expenses => {
				this.expenses = expenses
				this.loading = false
			})
			.catch(e => console.log(e))
	},
	watch: {
		description(val) {
			if (val !== '')
				this.valid.description = this.validDescription()
		},
		amount(val) {
			if (val !== '')
				this.valid.amount = this.validAmount()
		},
		quantity(val) {
			if (val !== '')
				this.valid.quantity = this.validQuantity()
		}
	},
	computed: {
		total() {
			// functional way
			return this.expenses
				.reduce((total, expense) =>
					total + (expense.amount * expense.quantity), 0)
		},
		changeButtonValue() {
			return this.expenseId === null ? 'Add Expense' : 'Update Expense'
		},
		clearButtonVisible() {
			return this.description !== "" || this.amount !== "" || this.quantity !== "" || this.expenseId !== null
		},
		dark() {
			return this.theme === 'dark'
		},
		loadingText() {
			return this.loading ? '...Loading Expenses' : 'No Expenses :('
		}
	},
	methods: {
		showSnack(message, color) {
			this.snackColor = color
			this.snackText = message
			this.snackbar = true
		},
		setTheme(theme) {
			this.theme = theme
		},
		validAmount() {
			return this.amount !== '' && /^[^,]([0-9]{0,3})(,?([0-9]){3})*(\.[0-9]{0,2})?$/.test(this.amount)
		},

		validDescription() {
			return this.description !== '' 
		},
		validQuantity() {
			return Number(this.quantity) && Number(this.quantity) < 100 && Number(this.quantity) > 0
		},
		setDeletingId(id) {
			this.deletingId = id
		},

		setEditingId(id) {
			this.expenseId = id
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)

			this.description = this.expenses[indexOfExpense].description
            this.amount = this.expenses[indexOfExpense].amount.toLocaleString()
			this.quantity = this.expenses[indexOfExpense].quantity.toLocaleString()
			
			

		},
		isValid() {
			this.valid = {
				description: this.validDescription(),
                amount: this.validAmount(),
                quantity: Number(this.quantity) && Number(this.quantity) < 100 && Number(this.quantity) > 0,
			}

			for(const key in this.valid) {
				if (!this.valid[key]) {
					const refString = key + 'Ref'
					const ref = this.$refs[refString]
					ref.select()
					return false
				}
			}

			return true
		},
		saveExpense() {
			this.description = this.description.trim()
            this.amount = this.amount.trim()
            this.quantity = this.quantity.trim()
			if (this.isValid()) {
				if (this.expenseId !== null) {
					console.log('updating')
					// we are editing an expense
					this.updateExpense(this.expenseId)

				} else {
					console.log('adding')
					// we are adding an expense
					this.addExpense()

				}
				this.description = ''
                this.amount = ''
                this.quantity = ''
				this.$refs.descriptionRef.focus()
			}
		},
		/* addExpense() {
			const expense = {
					description: this.description,
					amount: Number(this.amount.replace(/,/g, '')),
                    quantity: Number(this.quantity)
			}
			api.addExpense(expense)
				.then(expense => this.expenses.unshift(expense))
				.catch(e => console.log(e))
		},
		updateExpense(id) {
			const updatedExpense = {
				_id: id,
				description: this.description,
                amount: Number(this.amount.replace(/,/g, '')),
                quantity: Number(this.quantity),
			}

			api.updateExpense(updatedExpense)
				.then(expense => {
					const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
					this.expenses.splice(indexOfExpense, 1, expense)
					this.expenseId = null
				})
		},
		deleteExpense(id) {
			api.deleteExpense(id)
				.then(() => this.expenses = this.expenses.filter(expense => expense._id !== id))

			// imperative way
			/*for(let i = 0; i < this.expenses.length; i++) {
				if (this.expenses[i].id === id)
					this.expenses.splice(i, 1)
			}
			
		},

		copyExpense(id) {
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
			const expense = this.expenses[indexOfExpense]

			api.addExpense({...expense})
				.then(expense => this.expenses.unshift(expense))
				.catch(e => console.log(e))
			
		}, */
		copyExpense(id) {
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
			const expense = this.expenses[indexOfExpense]
			
			api.addExpense({ ...expense })
				.then(expense => this.expenses.unshift(expense))
				.then(() => this.showSnack('Duplicated Expense', 'green'))
				.catch(e => this.showSnack('Failed to duplicate', 'red'))
		},
		addExpense() {
			const expense = {
				description: this.description,
				amount: Number(this.amount.replace(/,/g, '')),
				quantity: Number(this.quantity),
			}
			api.addExpense(expense)
				.then(expense => this.expenses.unshift(expense))
				.then(this.clear)
				.then(() => this.showSnack('Added Expense', 'green'))
				.catch(e => this.showSnack('Failed to add', 'red'))
		},
		updateExpense(id) {
			const updatedExpense = {
				_id: id,
				description: this.description,
				amount: Number(this.amount.replace(/,/g, '')),
				quantity: Number(this.quantity),
			}

			api.updateExpense(updatedExpense)
				.then(expense => {
					const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
					this.expenses.splice(indexOfExpense, 1, expense)
					this.expenseId = null
				})
				.then(this.clear)
				.then(() => this.showSnack('Updated Expense', 'green'))
				.catch(e => this.showSnack('Failed to update', 'red'))
		},

		deleteExpense(id) {
			api.deleteExpense(id)
				.then(() => this.expenses = this.expenses.filter(expense => expense._id !== id))
				.then(() => this.showSnack('Deleted Expense', 'green'))
				.catch(e => this.showSnack('Failed to delete', 'black'))
		},
		
				

		/*deleteExpense() {
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === this.deletingId)
			console.log(this.expenses[indexOfExpense].description)
			api.deleteExpense(this.deletingId)
				.then(() => {
					this.expenses = this.expenses.filter(expense => expense._id !== this.deletingId)
					this.deletingId = null
				})
				.then(() => this.showSnack('Deleted Expense', 'green'))
				.catch(e => this.showSnack('Failed to delete', 'red'))
		},*/

		clear() {
			this.description = ''
            this.amount = ''
			this.quantity = ''
			this.expenseId = null
			this.valid.description = true
			this.valid.amount = true
		}
	}
})

/*
setTimeout(() => {
	app.message = 'Record an expense'
}, 2000)

*/

export default ExpenseView