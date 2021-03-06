const express = require("express")
const mongoose = require("mongoose")
const booksRoutes = require('./#routes/books_routes')

const app = express()

app.use(express.json())

//handeling CORS errors:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if (res.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
      return res.status(200).json({})
    }
    next()
  })


  app.use('/api', booksRoutes)


 
  try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      'mongodb+srv://kirill:kirill@cluster0.ohvr9.mongodb.net/lrc2_backend?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
 
 app.listen(5000, () => console.log('application is running on port 5000'))