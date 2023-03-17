require("dotenv").config();

const express = require("express");
const db = require("./dbConn/conn")
const cookies = require("cookie-parser");
require('./dbConn/relation')
//routess
const userRoute = require("./routes/User")
const adminRoute = require("./routes/Admin")
const staffRoute = require("./routes/Staff")
const doctorRoute = require("./routes/Doctor")
const productRoute = require("./routes/Product")
const patientRoute = require("./routes/Patient")
const attendanceRoute = require("./routes/Attendance")

const PORT = process.env.PORT || 5000;

//middleware
const app = express();
app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static('image'))


app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)
app.use("/api/staff", staffRoute)
app.use("/api/doctor", doctorRoute)
app.use("/api/product", productRoute)
app.use("/api/patient", patientRoute)
app.use("/api/attendance", attendanceRoute)




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
