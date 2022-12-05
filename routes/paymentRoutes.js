const express = require('express')
const {payment,paymentVerification} = require('../controllers/paymentController');


const router = express.Router();

router.post('/payment',payment);
router.post('/verification',paymentVerification)


module.exports = router;