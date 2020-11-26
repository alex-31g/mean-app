const express = require('express')

// Подключаем контроллеры для роутов
const controller = require('../controllers/auth')

// Метод Router() - предназначен для создания роутов
const router = express.Router()

// При переходе на роут 'http://localhost:5000/api/auth/login',
// будет вызван контроллер controller.login
router.post('/login', controller.login)

// При переходе на роут  'http://localhost:5000/api/auth/register'
// будет вызван контроллер controller.register
router.post('/register', controller.register)

module.exports = router
