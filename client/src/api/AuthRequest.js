import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });


export const sendOtp = (email) => API.post("/send-otp", { email })

export const userLogin = (values, header) => API.post("/auth/login", values, header)


export const userRegister = (userDetails) => API.post("/auth/register", userDetails)