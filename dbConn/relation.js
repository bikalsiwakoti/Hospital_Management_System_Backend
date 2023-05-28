const User = require('../models/User');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const AppointmentSchedule= require('../models/AppointmentSchedule');
const Product= require('../models/Product');
const Payment= require('../models/Payment');
const Order= require('../models/Order');
const Shipping= require('../models/Shipping');
const Attendance= require('../models/Attendance');
const Cart= require('../models/Cart');

//admin
User.hasOne(Admin);

//staff
User.hasOne(Staff);
User.hasOne(Cart);

//doctor
User.hasOne(Doctor);

//patient
User.hasOne(Patient);
Doctor.hasOne(Patient);

// appointmentSchedule
Doctor.hasOne(AppointmentSchedule);
Patient.hasOne(AppointmentSchedule);

//product
Admin.hasOne(Product);

//payment
Order.hasOne(Payment);


//order
User.hasOne(Order);

//shipping
Order.hasOne(Shipping);

//attendance
Staff.hasOne(Attendance); 
