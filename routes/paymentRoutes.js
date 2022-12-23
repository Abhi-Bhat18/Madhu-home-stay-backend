const express = require('express')
const {payment,paymentVerification} = require('../controllers/paymentController');


const router = express.Router();

router.post('/booking',payment);
router.post('/verification',paymentVerification);


module.exports = router;