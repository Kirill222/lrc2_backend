// module.exports.signup_get = (req, res) => {
//     res.redirect('/signup')
// }

// module.exports.login_get = (req, res) => {
//     res.redirect('/login')
// }

module.exports.signup_post = (req, res) => {
    res.send('new signup')
}

module.exports.login_post = (req, res) => {
    res.send('new login')
}