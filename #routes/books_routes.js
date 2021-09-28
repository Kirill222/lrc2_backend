const express = require('express')
const router = express.Router()
const booksController = require('../#controllers/books_controller')
const paginatedResults = require('../#middleware/paginationMiddleware')
const Book = require("../#models/book_model")
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/book_covers/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true) //save file
   } else {
    cb(new Error('wrong file extention'), false) //reject, not save the file
   }    
}

const upload = multer({
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter,
})

router.post('/books', upload.single('bookCover'), booksController.createBook)
router.get('/books', paginatedResults(Book), booksController.getBooks)
router.delete('/books/:bookId', booksController.deleteBook)
router.patch('/books/:bookId', booksController.updateBook)

module.exports = router