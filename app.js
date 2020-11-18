const express = require('express')
const app = express()

// Тестовый роут
app.get('/', (req, res) => {
	res.status(200).json({
		message: 'server work'
	})
})

module.exports = app