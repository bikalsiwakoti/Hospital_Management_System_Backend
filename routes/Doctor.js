const router = require('express').Router();
const auth = require('../middleware/authUser');
const doctorTableControllers = require('../controllers/doctorTable');

router.post("/registerDoctor", doctorTableControllers.insert)
router.post("/loginDoctor", doctorTableControllers.find)


module.exports = router;