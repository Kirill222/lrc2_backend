const express = require('express')
const router = express.Router()
const booksController = require('../#controllers/books_controller')

router.post('/books', booksController.createBook)
router.get('/books', booksController.getBooks)
router.delete('/books/:bookId', booksController.deleteBook)

module.exports = router