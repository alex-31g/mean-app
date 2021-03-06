const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Подключаем роуты
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const app = express()

app.use(passport.initialize())

// Подключаем файл в котором будет описана логика защиты роутов
// Конструкция "require('./middleware/passport')" вернет ф-цию, которую мы вызовем, передав в неё passport:
require('./middleware/passport')(passport)

// Говорим morgan'у, что мы в режиме разработки
app.use(morgan('dev'))

// Парсим json
app.use(bodyParser.json())

// Парсим данные формы
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

// Регистрируем auth роуты:
// - первый параметр - базовый url
// - второй параметр - auth роут
// Первый и второй параметр - конкатенируются
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
