const router = require('express').Router();
const auth = require('../middleware/authUser');
const staffTableControllers = require('../controllers/staffTable');

router.post("/registerStaff", staffTableControllers.insert)
router.post("/loginStaff", staffTableControllers.find)
router.get("/getAllStaff", staffTableControllers.getAll)
router.get("/findOneStaff/:id", staffTableControllers.findOne)
router.delete("/deleteOneStaff/:id",auth.verifyUser, staffTableControllers.deleteOne)
router.put("/editStaff/:id",auth.verifyUser, staffTableControllers.update)


module.exports = router;