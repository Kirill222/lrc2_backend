const express = require('express')
const router = express.Router()
const booksController = require('../#controllers/books_controller')

router.post('/books', booksController.createBook)

module.exports = router