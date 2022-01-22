if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expresLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expresLayouts)
app.use(express.static('public'))

// importing mongoose for mangoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, 
{useNewUrlParser: true})
const db = mongoose.connection
//log an error message 
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter)
app.listen(process.env.PORT || 3000, () => console.log('port is running....'))