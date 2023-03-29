const router = require('express').Router();
const auth = require('../middleware/authUser');
const orderTableControllers = require('../controllers/orderTable');

router.post("/addOrder",auth.verifyUser, orderTableControllers.insert)
router.get("/getAllOrder", orderTableControllers.getAll)
router.get("/getAllOrderOfUser", orderTableControllers.getAllOfOneUser)
router.get("/getOneOrder/:id", orderTableControllers.getOne)
router.delete("/deleteOneOrder/:id",auth.verifyUser, orderTableControllers.deleteOne)
router.patch("/updateOrder/:id", orderTableControllers.updateOne)

module.exports = router;