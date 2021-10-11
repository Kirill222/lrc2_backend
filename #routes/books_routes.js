const express = require('express')
const router = express.Router()
const booksController = require('../#controllers/books_controller')
const paginatedResults = require('../#middleware/paginationMiddleware')
const Book = require("../#models/book_model")
const upload = require('../#middleware/bookCoverUploadMiddleware')

router.post('/books', upload.single('bookCover'), booksController.createBook)
router.get('/books', paginatedResults(Book), booksController.getBooks)
router.delete('/books/:bookId', booksController.deleteBook)
router.patch('/books/:bookId', booksController.updateBook)

module.exports = router