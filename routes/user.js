import express from "express";
import { login, profile, register } from "../controllers/user.js";

const router = express.Router();

//register
router.post('/register',register)
//login
router.post('/login',login);
//profile
router.get('/profile/:id',profile)
export default router;