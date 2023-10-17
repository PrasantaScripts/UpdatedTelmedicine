const express = require('express');
const {getMedicines, fetchLogs, changeNumber, add} = require('../controllers/medicineControllers');

const router = express.Router();

router.get('/Medicine',getMedicines)
router.get('/fetchlogs',fetchLogs)
router.post('/change',changeNumber)
router.post('/add',add)

module.exports = router;