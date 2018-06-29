const data = () => ({
	description: '',
    amount: '',
	quantity:'',
	loading: true,
	deletingId: null,
	snackbar: false,
	snackText:'',
	snackColor:'black',
	expenseId: null,
	valid: {
		description: true,
        amount: true,
        quantity: true
	},
	expenses: [],
	headers: [
		{
			text:'Selected',
			align:'left',
			sortable:'false',
			value:'',
		},
		{
			text: 'Description',
			align: 'left',
			sortable: 'false',
			value: 'description'
		},
		{
			text: 'Amount',
			align: 'left',
			sortable: 'true',
			value: 'amout'
		},
		{
			text: 'Quantity',
			align: 'left',
			sortable: 'true',
			value: 'quantity'
		},
		{
			text: 'Date',
			align: 'left',
			sortable: 'true',
			value: 'date'
		},
		{
			text: 'Actions',
			align: 'left',
			sortable: 'false',
			value: ''
		}





	]
})

export default data
