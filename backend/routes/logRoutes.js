const express = require('express');
const { fetchLogs, handelLogout } = require('../controllers/logControllers');

const router = express.Router();

router.get('/fetch',fetchLogs);
router.post('/logout',handelLogout);

module.exports = router;