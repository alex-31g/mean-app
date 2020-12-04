const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users') // === const User = require('../models/user')
const keys = require('../config/keys')

var options = {}

// fromAuthHeaderAsBearerToken - данный метод извлекает токен из хедера
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.jwt

// Данная ф-ция будет вызвана в файле app.js, в строке "require('./middleware/passport')(passport)"
module.exports = (passport) => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				/*
				Ищем запись пользователя, у которой поле id в БД совпадает со значением payload.userId
				payload.userId - получаем из токена, который был сгенерирован в файле controllers\auth.js:
					const token = jwt.sign(
						{
							email: candidate.email,
							userId: candidate._id
						}, 
						keys.jwt,
						{expiresIn: 60*60}
					)
				*/
				const user = await User.findById(payload.userId).select('email id')

				if (user) {
					// Если пользователь найден

					// Метод done - вызываем, чтобы вернуть полученный результат 
					// 1й параметр - ошибка, обрабатывать которую здесь не прийдется - поэтому null
					// 2й параметр - передаем данные, полученные из БД
					done(null, user)
				} else {
					done(null, false)
				}
			} catch {
				console.log(e)
			}
		})
	)
}
