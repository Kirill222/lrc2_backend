const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'Please, enter a first name'],        
    },
    lastName: {
        type: String, 
        required: [true, 'Please, enter a last name'],        
    },
    email: {
        type: String, 
        required: [true, 'Please, enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please, enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
})

//LOGIC RELATED TO PASSWORD HASHING
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt) //this refers to the object that is going to be saved in the db
    next()
})

//STATIC CUSTOM METHOD TO LOGIN USER. This method will be used in login_post controller
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email})

    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        console.log(auth)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }

    throw Error('incorrect email')
}

module.exports = mongoose.model("User", userSchema)