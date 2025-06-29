import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

//user register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
    
        if (user) {
            return res.json({ message: "User already exixts  . . . !", success: false ,userId: user._id});
        }
        //hashing password bcryptjs
        const hashedPass = await bcrypt.hash(password, 6);
    
        user = await User.create({ name, email, password: hashedPass });
    
        res.json({ message: "User registered SUCCESSFULLY  . . . !", success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }

}

config({ path: ".env" });

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
    
        if (!user) return res.json({ message: "NO user exists", success: false });
    
        //un - hashing password
        const validPass = await bcrypt.compare(password, user.password);
    
        if (!validPass) {
            return res.json({ message: "Incorrect password", success: false });
        }
    
        //since evrything is correct
        //make jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });
    
        res.json({ message: `Welcome ${user.name} . . . !`, token, success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }

}

export const profile = async(req,res) => {
    const id = req.params.id;

    try {
        let user = await User.findOne({ _id: id });
    
        if(!user) return res.json({message:"User not found . . . !",message:false});
    
        res.json({message:"user fond . . . !",user,message:true});
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false });
    }
}