const mongoose = require('mongoose')

// Создаем схему, которая будет описывать модель
const Schema = mongoose.Schema

// Параметр - объект конфигурации, с помощью которого происходит
// описание полей, которые должны присутствовать в данной модели 
const categorySchema = new Schema({

	// name - название категории
	name: {
		// type - тип данных, который хранится в данном поле
		type: String,
		// required - обязательно ли поле
		required: true
	},

	// imageSrc - путь к картинке данной категории
	imageSrc: {
		type: String,
		// default - дефолтное значение
		default: ''
	},

	// user - ссылка на id пользователя, который создал данную категорию
	user: {
		// ref - название коллекции
		ref: 'users',
		// Schema.Types.ObjectId - id, который автоматически генерируется
		type: Schema.Types.ObjectId
	},

})

// 1й параметр - имя таблицы
// 2й параметр - имя схемы
module.exports = mongoose.model('categories', categorySchema)
