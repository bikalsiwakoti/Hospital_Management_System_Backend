const router = require('express').Router();
const auth = require('../middleware/authUser');
const cartTableControllers = require('../controllers/cartTable');

router.post("/addcart",auth.verifyUser, cartTableControllers.insert)
router.get("/getAllcart",auth.verifyUser, cartTableControllers.getAll)
router.get("/getOnecart/:id",auth.verifyUser, cartTableControllers.getOne)
router.delete("/deleteOneCart/:id",auth.verifyUser, cartTableControllers.deleteOne)
router.delete("/deleteAllCart",auth.verifyUser, cartTableControllers.deleteAll)
router.patch("/updateCart/:id",auth.verifyUser, cartTableControllers.updateOne)

module.exports = router;