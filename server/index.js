import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import chatRoutes from "./routes/chat.js"
import MessageRoute from './routes/message.js'
// import AdminRoute from './routes/admin.js'

import { register, sendOtp } from './controllers/auth.js'
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from "./models/User.js"
import Post from './models/Post.js'
import { users, posts } from './data/index.js'
import { adminLogin, adminRegister, blockUser, getFullUsers, unBlockUser, viewPost } from './controllers/admin.js';




//CONFIGURATION

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ "policy": "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)
app.post("/send-otp", sendOtp)
app.post("/admin/register", adminRegister)
app.post("/admin/login", adminLogin)
app.get("/admin/get-users", getFullUsers)
app.post("/admin/block-user", blockUser)
app.post("/admin/unblock-user", unBlockUser)
app.post("/admin/view-post", viewPost)




//ROUTES
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/chat", chatRoutes)
app.use("/message", MessageRoute)
// app.use("/admin",AdminRoute)

//MONGOOSE
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`server port: ${PORT}`))
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error}did not connect`))