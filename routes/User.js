const router = require('express').Router();
const userTableControllers = require('../controllers/userTable');
const auth = require('../middleware/authUser');

router.post("/registerUser", userTableControllers.insert)
router.get("/getAllUser", userTableControllers.getAllUser)
router.post("/loginUser", userTableControllers.find)
router.put("/updateUser",auth.verifyUser, userTableControllers.update)
router.delete("/deleteUser",auth.verifyUser, userTableControllers.deleteUser)



module.exports = router;