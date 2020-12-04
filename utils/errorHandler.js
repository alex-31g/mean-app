module.exports = (res, error) => {
	// status 500 - Internal Server Error
	res.status(500).json({
		success: false,
		message: error.message ? error.message : error
	})
}