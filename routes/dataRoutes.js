const express = require('express');
const  {createBooking,getBooking} = require('../controllers/dataControllers');
const router = express.Router();

router.post('/booking',createBooking);
router.get('/booking',getBooking);

module.exports = router;