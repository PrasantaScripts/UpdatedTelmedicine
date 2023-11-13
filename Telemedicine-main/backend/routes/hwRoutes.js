const express = require('express');
const { authHw, registerHw, fetchTotalHw,findHw,blockHw,editHw} = require('../controllers/hwControllers');

const router = express.Router();

router.post('/login' , authHw)
router.post('/register', registerHw)
router.get('/countHw',fetchTotalHw)
router.post('/findHw',findHw)
router.post('/blockHw',blockHw)
router.post('/editHw',editHw)
module.exports = router;