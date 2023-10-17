const express = require('express');
const { authDoctor, registerDoctor, fetchTotalDoctors,getDoctors,searchDoctor,findDoc,blockDoc,editDoc,modifyQ,getQ,popQ, fetchQ} = require('../controllers/doctorControllers');

const router = express.Router();

router.post('/login' , authDoctor);
router.post('/register', registerDoctor);
router.get('/countDoctor',fetchTotalDoctors);
router.get('/Doctor',getDoctors);
router.get('/search',searchDoctor);
router.post('/findDoc',findDoc);
router.post('/blockDoc',blockDoc);
router.post('/editDoc',editDoc);
router.post('/modifyQ',modifyQ);
router.post('/getQ',getQ);
router.post('/popQ',popQ)
router.post('/fetchQ',fetchQ);
module.exports = router;