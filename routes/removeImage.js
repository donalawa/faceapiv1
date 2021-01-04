const express = require('express')
const removeImage = express.Router()
let verifyFace = require('../middleware/checkFaces')
let deleteController = require('../controllers/deleteController');

removeImage.post('/remove',verifyFace,deleteController);

module.exports = removeImage