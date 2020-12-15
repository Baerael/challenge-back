const express   = require('express');
const router    = express.Router();
//const userModel = require('./v1/models/userModel');
//const employee  = require('./v1/routes/employee');

const data = require('./data/loader')
const employee = require('./v2/routes/employee');

//user()


//userModel();
router.use('/employee', employee)


module.exports = router;