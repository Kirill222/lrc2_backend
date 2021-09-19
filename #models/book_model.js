const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: String, required: true },
    yearOfPublication: { type: String, required: true },    
})

module.exports = mongoose.model("Book", bookSchema)