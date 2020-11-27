const app = require('./app')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')

async function start() {
	try {
		await mongoose.connect('mongodb+srv://alex:%2a111%23@cluster0.a2m34.mongodb.net/meandb', {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true 
		})
		app.listen(port, () => console.log(`server work at ${port} port`))
	} catch (e) {
		console.log(e)
	}
}

start()
