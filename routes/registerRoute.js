let express = require('express')
let registerRoute = express.Router()
let registerController = require('../controllers/registerController')
let verifyFace = require('../middleware/checkFaces')

registerRoute.post('/register',verifyFace,registerController)

module.exports = registerRoute