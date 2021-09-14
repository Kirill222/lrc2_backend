const express = require("express")
const mongoose = require("mongoose")

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


  //Mongoose
  mongoose
  .connect('mongodb+srv://kirill:kirill@cluster0.ohvr9.mongodb.net/lrc2_backend?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {сды       
        app.listen(5000)
       
  })
  .catch((error) => {
    console.log(error)
  })
