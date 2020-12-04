```js
// ==================================
// MONGOOSE METHODS FOR SEARCH IN DB
// ==================================

const User = require('../models/user')

// findOne - ищет запись, у которой поле email в БД совпадает с req.body.email, которое мы передаем
const dataFromMongo = await User.findOne({email: req.body.email})

// findById - ищет запись, у которой поле id в БД совпадает со значением id, которое мы передаем.
// select('email id') - указывает, что необходимо получить только поля - email, id из записи
const dataFromMongo = await User.findById(id).select('email id')

```