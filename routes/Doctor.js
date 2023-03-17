const router = require('express').Router();
const auth = require('../middleware/authUser');
const doctorTableControllers = require('../controllers/doctorTable');
const upload = require('../middleware/multer');

router.post("/registerDoctor",upload, doctorTableControllers.insert)
router.post("/loginDoctor", doctorTableControllers.find)
router.get("/getAllDoctor", doctorTableControllers.getAll)
router.delete("/deleteOneDoctor/:id", doctorTableControllers.deleteOne)


module.exports = router;