const bcrypt = require('bcryptjs')
const User = require('../models/user')

// АВТОРИЗАЦИЯ
module.exports.login = (req, res) => {}

// РЕГИСТРАЦИЯ
module.exports.register = async (req, res) => {

	// При регистрации проверяем, существует ли уже такой пользователь в БД. 
	// Для этого с помощью mongoose метода findOne()
	// ищем запись, у которой поле email совпадает с req.body.email
	const candidate = await User.findOne({email: req.body.email})

	if (candidate) {
		// Если пользователь существует - нужно вернуть ошибку
		res.status(409).json({
			message: 'Такой email уже занят'
		})
	} else {
		// Если пользователь не существует - создаем его

		// Генерируем соль для пароля:
		// параметр - рандомное число, на основе которого будет сгенирирован хэш
		const salt = bcrypt.genSaltSync(10)

		const password = req.body.password

		// На базе модели User - создаем новую запись
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
		})

		try {
			// Сохраняем запись в БД и возвращаем статус 201
			await user.save()
			res.status(201).json(user)
		} catch(e) {
			// Обработатываем ошибку
			console.log(e)
		}
		
	}
}