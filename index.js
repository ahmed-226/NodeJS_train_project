require('dotenv').config()
const express =require('express');
const cors=require('cors');
const url =process.env.MONGO_URL

const httpStatusText=require('./utils/httpStatusText')

const path=require('path')

const app = express();

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const mongoose =require('mongoose');
mongoose.connect(url).then(()=>{
    console.log('mongodb connection');
})

app.use(cors())
app.use(express.json());

const courseRouter=require('./Routes/course.route')
const usersRouter=require('./Routes/users.route')

app.use('/api/courses', courseRouter)
app.use('/api/users', usersRouter)

app.all('*', (req, res,next) => {
    res.status(500).json({status:httpStatusText.ERROR,message:"this resource is not available"})
})

app.use((err,req, res, next) => {
    res.status(500).json({status:httpStatusText.ERROR,message:err.message})
} )





app.listen(process.env.PORT||3000,() => {
    console.log('listening on port');
});