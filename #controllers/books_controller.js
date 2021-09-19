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
  let books
  try {
    books = await Book.find();
  } catch (error) {
    error = new HttpError(
      "Books cannot be accessed, somethihg went wrong",
      404
    )
    return next(error)
  }

  res.json({ books: books.map((book) => book.toObject({ getters: true })) })
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

exports.createBook = createBook
exports.getBooks = getBooks
exports.deleteBook = deleteBook
