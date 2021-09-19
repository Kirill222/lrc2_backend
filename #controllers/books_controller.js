const mongoose = require('mongoose')
const Book = require('../#models/book_model')


//POST - create a book
const createBook = async (req, res, next) => {

    const {title, author, rating, yearOfPublication} = req.body

    const createdBook = new Book({
        title,
        author,
        rating,
        yearOfPublication,
    })

    try {
        await createdBook.save()
      } catch (error) {
        error = new HttpError("The book cannot be saved, try again later", 500)
        return next(error)
      }
    
      res.status(201)
      res.json({ book: createdBook.toObject({ getters: true }) })

}

exports.createBook = createBook