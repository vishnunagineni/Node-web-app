const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const path = require('path')
const { response } = require('express')
const bodyParser=require('body-parser')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan('tiny'))

app.use((req, res, next) => {
    debug('This is a custom middleware..')
    next()
})
app.use(express.static(path.join(__dirname,'/public')))
app.use('/css', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css')))
app.set('views', './src/views') //accessing views folder
//app.set('view engine', 'pug')

app.set('view engine', 'ejs')

const nav = [{link: '/books',title: 'Books'}, {link: '/authors', title: 'Authors'},]

const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter=require('./src/routes/adminRoutes')(nav)
const authRouter=require('./src/routes/adminRoutes')(nav)
const debug = require('debug')('app')

// app.get('/', (req, res) => {
//     //res.send(`Hello from node and express app.`)
//     //res.sendFile(path.join(__dirname, 'views/index.html'))
//     //res.render('index', {title: 'E-commerce application'})
//     res.render('index', {title: 'E-commerce application'})
// })

app.get('/', (req, res) => {
    res.render('index',{
        nav,
        title: 'Books-Library'
    })
})



app.use('/books', bookRouter)
app.use('/admin',adminRouter)
app.use('/signUp',authRouter)

// app.get('/', (req, res) => {
//     res.render('index',{
//         list: ['John', 'David'],
//         title: 'Employee Data'
//     })
// })

app.listen(port,() => {
    console.log(`Server running on port ${chalk.blue(port)}`)
    //debug(`Server running on port ${chalk.green(4000)}`) // runs only when app is on debug mode.
})
