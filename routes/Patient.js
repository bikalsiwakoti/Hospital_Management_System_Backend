const router = require('express').Router();
const auth = require('../middleware/authUser')
const patientTableControllers = require('../controllers/patientTable')

router.post('/addDetails',auth.verifyUser, patientTableControllers.addDetails)
router.get('/getPatients',auth.verifyAdmin, patientTableControllers.getDetailsByDoctor)
router.get('/getOnePatient/:id',auth.verifyAdmin, patientTableControllers.getOnePatient)
router.get('/getOneDoctor/:id',auth.verifyAdmin, patientTableControllers.getOneDoctor)

module.exports = router;