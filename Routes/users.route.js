const express=require('express')
const verifiy_token=require("../middleware/verifiy_token")

const multer  = require('multer')

const fileFilter=(req,file,cb)=>{
        const imageType=file.mimetype.split('/')[0]

        if (imageType=='image') {
                return cb(null,true)
        }else{
                return cb(new Error("this is not an image"),false)
        }
}

const diskStorage = multer.diskStorage({
        destination:  function(req, file, cb) {
                // console.log("file",file);
                cb(null,'uploads')
        },
        filename:function (req,file, cb) {
                const ext=file.mimetype.split('/')[1]
                const fileName=`users-${Date.now()}.${ext}`
                cb(null,fileName)
        }
})
const upload = multer({
        storage: diskStorage,
        fileFilter:fileFilter
 })

const router=express.Router()
const {getAllUsers,login,register}=require('../controller/users.controller')

router.route('/')
        .get(verifiy_token,getAllUsers)

router.route('/register')
        .post(upload.single('avatar'),register)

router.route('/login')
        .post(login)




module.exports = router 