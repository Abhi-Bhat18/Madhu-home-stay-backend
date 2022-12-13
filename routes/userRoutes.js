const express = require('express')
const router = express.Router()
const {registerUser , loginUser,userDetails}= require('../controllers/userController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/details',userDetails);
module.exports = router