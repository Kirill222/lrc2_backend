const express = require('express')
const router = express.Router()
const booksController = require('../#controllers/books_controller')
const paginatedResults = require('../#middleware/paginationMiddleware')
const Book = require("../#models/book_model")

router.post('/books', booksController.createBook)
router.get('/books', paginatedResults(Book), booksController.getBooks)
router.delete('/books/:bookId', booksController.deleteBook)
router.patch('/books/:bookId', booksController.updateBook)

module.exports = router