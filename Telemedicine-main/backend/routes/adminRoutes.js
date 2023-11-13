const express = require('express');
const { authAdmin } = require('../controllers/userController');

const router = express.Router();

router.post('/login' , authAdmin)


module.exports = router;