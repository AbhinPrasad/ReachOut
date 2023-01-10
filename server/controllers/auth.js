import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/User.js"
import { otpSend } from "../services/nodeMailer.js";




export const sendOtp = async (req, res) => {
    try {
        const {
            email,
        } = req.body;



        const emailExist = await User.findOne({ email: email });

        if (emailExist) {
            res.status(200).send({
                message: "Email already exist",
                success: false
            });
        } else {
            otpSend(email)
                .then((response) => {

                    res.status(200).send({
                        message: "OTP sent",
                        response: response,
                        success: true
                    });
                })
                .catch((err) => console.log("ERROR", err));
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false });
    }
};

//REGISTER USER

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (err) {
        res.status(500).json({ error: err.message })

    }

}

//login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) return res.status(400).json({ msg: " User does not exist" })

        if (user.Active) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials", success: false })

            const token = jwt.sign({ id: user._id }, process.env.JWt_SECRET)

            delete user.password;
            res.status(200).json({ token, user, success: true })

        } else {
            res.status(401).json({ status: 'user have been blocked' })
        }


    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}