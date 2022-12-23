//import admin controller  and pass it to the router 
const express = require('express')
const {getRooms,getBookings,getPayments,updateRoom,createRoom} = require('../controllers/adminController')

const router = express.Router()  

router.get('/rooms',getRooms)   
router.get('/bookings',getBookings)
router.get('/payments',getPayments)
router.put('/rooms/:id',updateRoom)
router.post('/createRoom',createRoom)

module.exports = router