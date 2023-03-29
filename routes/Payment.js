const router = require('express').Router();
const auth = require('../middleware/authUser');
const paymentTableControllers = require('../controllers/paymentTable');

router.post("/addPayment",auth.verifyUser, paymentTableControllers.insert)
router.get("/getAllPayment",auth.verifyUser, paymentTableControllers.getAll)
// router.get("/getOnePayment/:id",auth.verifyUser, orderTableControllers.getOne)
// router.delete("/deleteOnePayment/:id",auth.verifyUser, orderTableControllers.deleteOne)
// router.patch("/updatePayment/:id",auth.verifyUser, orderTableControllers.updateOne)

module.exports = router;