import express from 'express';
import { login, sendOtp } from '../controllers/auth.js'

const router = express.Router();


router.post("/login", login);

export default router