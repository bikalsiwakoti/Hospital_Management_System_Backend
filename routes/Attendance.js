const router = require('express').Router();
const auth = require('../middleware/authUser');
const attendanceTableControllers = require('../controllers/attendanceTable');
const upload = require('../middleware/multer')

router.post("/addAttendance",upload, auth.verifyStaff, attendanceTableControllers.insert)
router.get("/getAllAttendance",auth.verifyAdmin, attendanceTableControllers.getAll)
router.get("/getOneAttendance", auth.verifyStaff, attendanceTableControllers.getOne)
router.get("/getOneAttendanceById/:id", auth.verifyAdmin, attendanceTableControllers.getOnebyid)

module.exports = router;