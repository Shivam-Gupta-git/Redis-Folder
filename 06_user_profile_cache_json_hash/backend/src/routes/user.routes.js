import express from 'express'
import { createUserWithJSON, getUserWithJSON } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.post("/user/:id/json", createUserWithJSON);
userRoute.get("/user/:id/json", getUserWithJSON);

export { userRoute }