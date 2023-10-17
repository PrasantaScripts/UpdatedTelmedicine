const express = require('express');
const { registerFamily, fetchFamily, fetchTotalFamily ,exportTotalFamily} = require('../controllers/familyController');
const { route } = require('./hwRoutes');


const router = express.Router();

router.post('/fetch' , fetchFamily)
router.post('/register', registerFamily)
router.get('/countFamily',fetchTotalFamily)
router.get('/export',exportTotalFamily)

module.exports = router;