import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import multer from 'multer';


//app config
const app = express()
const port = process.env.PORT || 4000

// const bodyParser = require('body-parser')
connectDB()
connectCloudinary()


// app.use(bodyParser.json())
//middlewares
app.use(express.json())
app.use(cors())

//api endpoints

app.use('/api/admin',adminRouter)

app.get('/' , (req,res) =>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("server started" , port))