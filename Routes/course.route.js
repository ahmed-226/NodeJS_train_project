const express=require('express')

const {body }=require('express-validator');
const verifiy_token=require("../middleware/verifiy_token")
const allowedTo=require("../middleware/allowedTo")


const {validationSchema}=require('../middleware/validationschema')

const router=express.Router();

const { getAllcourese, getCourese, addCourse, updatecourse, deletecourse } = require('../controller/courses.controller');
const userRole = require('../utils/userRoles');

router.route('/').get( verifiy_token,getAllcourese)
    .post(verifiy_token,validationSchema(),addCourse)

router.route('/:courseId').get(verifiy_token, getCourese)
                        .patch(verifiy_token,updatecourse)
                        .delete(verifiy_token,allowedTo(userRole.ADMIN,userRole.MANGER),deletecourse)      
                        
module.exports = router;