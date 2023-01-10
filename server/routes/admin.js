import express from 'express';  
import { adminLogin, adminRegister, viewPost} from '../controllers/admin'

const router =express.Router();

router.post =("/register",adminRegister)
router.post("/login",adminLogin)
router.post("/view-post",viewPost)

export default router