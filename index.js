import express from "express";
import multer from "multer"
import mongoose from "mongoose";
import cors from "cors"
import {registerValidator, loginValidator, postCreateValidator} from "./validation.js";
import {checkAuth, handleValidationErorrs} from './utils/index.js';
import {PostController, UserController } from './controllers/index.js'

mongoose.connect(
    process.env.MONGODB_URI
).then(()=>
    console.log(
        "DB OK"
    ))
    .catch((err)=>console.log("DB error",err))

const app = express();

const storage = multer.diskStorage({
    destination: (_,__, cb)=>{
        cb(null,"uploads")
    },
    filename:(_,file, cb)=>{
        cb(null,file.originalname)
    },
})

const upload = multer({storage})

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidator,  handleValidationErorrs,UserController.login)
app.post('/auth/register',  registerValidator, handleValidationErorrs, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`
    });
})

app.get('/tags', PostController.getLastTags)

app.post('/posts',checkAuth, postCreateValidator, handleValidationErorrs, PostController.create)
app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth, postCreateValidator, handleValidationErorrs, PostController.update)

app.listen(process.env.PORT || 4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log("server ok")
});