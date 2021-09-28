const mongoose = require("mongoose")
const Book = require("../#models/book_model")

//POST - create a book
const createBook = async (req, res, next) => {  

  const { title, author, rating, yearOfPublication } = req.body

  const createdBook = new Book({
    title,
    author,
    rating,
    yearOfPublication,
    bookCover: req.file.path
  })

  try {
    await createdBook.save();
  } catch (error) {
    error = new HttpError("The book cannot be saved, try again later", 500)
    return next(error)
  }

  res.status(201);
  res.json({ book: createdBook.toObject({ getters: true }) })
}

//GET all books
const getBooks = async (req, res, next) => {  
  res.json(res.paginatedResults)
}

//DELETE a book
const deleteBook = async (req, res, next) => {
    
    const bookId = req.params.bookId;

    let bookToDelete;
    try {
        bookToDelete = await Book.findById(bookId);
    } catch (error) {
        error = new HttpError("The book to delete was not found", 500);
        return next(error);
    }

    try {
        await bookToDelete.remove();
    } catch (error) {
        console.log(error);
    }

    res.status(200).json({ message: "Book Deleted" });
}

//UPDATE a book
const updateBook = async (req, res, next) => {

    const bookId = req.params.bookId
    const { title, author, rating, yearOfPublication } = req.body
    //find the book that needs to be updated
    let updatedBook
    try {
      updatedBook = await Book.findById(bookId)
    } catch (error) {
      error = new HttpError(
        "There is no such a book in database to be updated",
        500
      )
      return next(error)
    }
  
    updatedBook.title = title
    updatedBook.author = author
    updatedBook.rating = rating
    updatedBook.yearOfPublication = yearOfPublication    
  
    //save the changes
    try {
      await updatedBook.save()
    } catch (error) {
      console.log(error)
    }
    res.status(200).json({ book: updatedBook.toObject({ getters: true }) })
}

exports.createBook = createBook
exports.getBooks = getBooks
exports.deleteBook = deleteBook
exports.updateBook = updateBook
