const router = require('express').Router();
const auth = require('../middleware/authUser');
const staffTableControllers = require('../controllers/staffTable');

router.post("/registerStaff", staffTableControllers.insert)
router.post("/loginStaff", staffTableControllers.find)


module.exports = router;