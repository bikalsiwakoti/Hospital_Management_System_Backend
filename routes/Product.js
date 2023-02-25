const router = require('express').Router();
const auth = require('../middleware/authUser');
const productTableControllers = require('../controllers/productTable');
const upload = require('../middleware/multer')

router.post("/addProduct",upload, auth.verifyAdmin, productTableControllers.insert)
router.get("/getAllProduct", productTableControllers.getAll)
router.get("/getOneProduct/:id", productTableControllers.getOne)
router.delete("/deleteProduct/:id", productTableControllers.deleteOne)
router.patch("/updateProduct/:id", productTableControllers.updateOne)


module.exports = router;