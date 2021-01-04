let express = require('express')
let loginRoute = express.Router()
let loginController = require('../controllers/loginController')
let verifyFace = require('../middleware/checkFaces')

loginRoute.post('/verify',verifyFace,loginController)

module.exports = loginRoute