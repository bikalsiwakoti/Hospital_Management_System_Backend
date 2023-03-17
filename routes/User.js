const router = require('express').Router();
const userTableControllers = require('../controllers/userTable');
const auth = require('../middleware/authUser');

router.post("/registerUser", userTableControllers.insert)
router.post("/loginUser", userTableControllers.find)
router.put("/updateUser/:id", userTableControllers.update)
router.get("/getAllUser", userTableControllers.getAll)
router.get("/findOneUser/:id", userTableControllers.findOne)
router.delete("/deleteUser/:id", userTableControllers.deleteUser)

module.exports = router;