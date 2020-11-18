const express = require('express')

// Подключаем auth роуты
const authRoutes = require('./routes/auth')

const app = express()

// Регистрируем auth роуты:
// - первый параметр - базовый url
// - второй параметр - auth роут
// Первый и второй параметр - конкатенируются
app.use('/api/auth', authRoutes)

module.exports = app
