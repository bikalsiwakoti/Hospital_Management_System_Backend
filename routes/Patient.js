const router = require('express').Router();
const auth = require('../middleware/authUser')
const patientTableControllers = require('../controllers/patientTable')

router.post('/addDetails',auth.verifyUser, patientTableControllers.addDetails)
router.get('/getPatients',auth.verifyDoctor, patientTableControllers.getDetailsByDoctor)

module.exports = router;