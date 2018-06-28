

const express = require('express')
const morgan = require('morgan')
const expensesRouter = require('./routes/expenses')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

//bring in front end
app.use(express.static(`${__dirname}/../client`))
/* app.use((req, res, next) => {
    console.log('my middleware :)')
    next()
}) */
app.use(bodyParser.json())

app.use(morgan('tiny'))
app.use('/expenses', expensesRouter)
/* app.get('/', (req, res) => { 
    res.sendFile('index.html')
})
app.get('/kittens', (req, res) => { res.send('Hello Kittens!') })
app.get('/apples', (req, res) => { res.send('Hello apples') })
*/

//middleware for error handelling, last thing because we want to obtain all info first
app.use((req, res, next) => {
    if (req.error){
        switch(req.error.name) {
            case "ValidationError":
                res.status(422).json({
                    message: req.error.message,
                })
                break
            default:
                res.status(500).send()
        }
    } else {
        //we fell through the controller
        res.status(404).send()
    }
    
})

mongoose.connect('mongodb://developer:mlabpass23@ds263500.mlab.com:63500/expenses-app')
    .then(() => {
        app.listen(3000)
    })

//app.listen(3000, () => console.log('Example app listening on port 3000!'))
