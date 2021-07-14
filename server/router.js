const express = require("express")
const router = express.Router()
const Controller = require("./Controller")

router.get('/api', Controller.showMessage)

router.get('/books', Controller.getBooks)

router.get('/books/find', Controller.find)

module.exports = router