const router = require('express').Router();
const auth = require('../middleware/authUser');
const orderTableControllers = require('../controllers/orderTable');

router.post("/addOrder",auth.verifyUser, orderTableControllers.insert)
router.get("/getAllOrder",auth.verifyAdmin, orderTableControllers.getAll)
router.get("/getAllOrderOfUser",auth.verifyUser, orderTableControllers.getAllOfOneUser)
router.get("/getOneOrder/:id", orderTableControllers.getOne)
router.delete("/deleteOneOrder/:id",auth.verifyAdmin,auth.verifyUser, orderTableControllers.deleteOne)
router.patch("/updateOrder/:id",auth.verifyAdmin, orderTableControllers.updateOne)

module.exports = router;