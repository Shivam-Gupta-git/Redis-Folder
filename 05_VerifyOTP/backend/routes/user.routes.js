import express from 'express'
import { createOtp, ttl, verifyOtp } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.post("/create-otp", createOtp)
userRouter.post("/verify-otp", verifyOtp)
userRouter.get("/ttl", ttl)

export { userRouter }