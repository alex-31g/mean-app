const express = require('express')

// Подключаем auth роуты
const authRoutes = require('./routes/auth')

const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const app = express()

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
