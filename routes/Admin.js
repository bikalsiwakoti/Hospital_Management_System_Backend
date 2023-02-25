const router = require('express').Router();
const auth = require('../middleware/authUser');
const adminTableControllers = require('../controllers/adminTable');

router.post("/registerAdmin", adminTableControllers.insert)
router.post("/loginAdmin", adminTableControllers.find)


module.exports = router;