const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/user')
const errorHandler = require('../utils/errorHandler')

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
			errorHandler(res, e)
		}
		
	}
}

// АВТОРИЗАЦИЯ
module.exports.login = async (req, res) => {

	// При авторизации проверяем, существует ли уже такой пользователь в БД. 
	// Для этого с помощью mongoose метода findOne()
	// ищем запись, у которой поле email совпадает с req.body.email
	const candidate = await User.findOne({email: req.body.email})

	if (candidate) {
		// Если пользователь существует - проверяем пароль

		// compareSync - метод с помощью которого будем сравнивать пароли.
		// 1й параметр - незахэшированный пароль, полученный от юзера
		// 2й параметр - захэшированный пароль из БД
		const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

		if (passwordResult) {
			// Если пароли совпали - генерируем JWT-токен

			// Метод sign - позволяет выполнить авторизацию
			// 1й параметр - объект, который необходимо зашифровать в токене
			// 2й параметр - секретный ключ, который учавствует в генерации токена
			// 3й параметр - время жизни токена в секундах
			const token = jwt.sign(
				{
					email: candidate.email,
					userId: candidate._id
				}, 
				keys.jwt,
				{expiresIn: 60*60}
			)

			res.status(200).json({
				token: `Bearer ${token}`
			})
		} else {
			// Если пароли не совпали
			res.status(401).json({
				message: 'Пароли не совпадают'
			})
		}
	} else {
		// Если пользователь не существует
		res.status(404).json({
			message: 'Пользователь с таким email не найден'
		})
	}
}