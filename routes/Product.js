const router = require('express').Router();
const auth = require('../middleware/authUser');
const productTableControllers = require('../controllers/productTable');
const upload = require('../middleware/multer')

router.post("/addProduct",upload, productTableControllers.insert)
router.get("/getAllProduct", productTableControllers.getAll)
router.get("/getAllProducts", productTableControllers.getAllAdmin)
router.get("/getOneProduct/:id", productTableControllers.getOne)
router.delete("/deleteProduct/:id",auth.verifyUser, productTableControllers.deleteOne)
router.patch("/updateProduct/:id",auth.verifyUser,upload, productTableControllers.updateOne)


module.exports = router;