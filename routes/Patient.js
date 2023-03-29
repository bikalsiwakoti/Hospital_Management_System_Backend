const router = require('express').Router();
const auth = require('../middleware/authUser')
const patientTableControllers = require('../controllers/patientTable')

router.post('/addDetails',auth.verifyUser, patientTableControllers.addDetails)
router.get('/getPatients', patientTableControllers.getDetailsByDoctor)
router.get('/getOnePatient/:id', patientTableControllers.getOnePatient)
router.get('/getOneDoctor/:id', patientTableControllers.getOneDoctor)

module.exports = router;