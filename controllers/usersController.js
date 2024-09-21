import mongoose from "mongoose";
import bcrypt from "bcrypt";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = { ...req.body, password: hashedPassword };

        await user.create(newUser);

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

        res.status(201).json({ msg: "User registered successfully!", token });

    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }
} 

export const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        const t_user = await user.findOne({email});

        if( !t_user ) {
            return res.status(404).json({msg: "User doesn't exist!"});
        }

        const isPassMatch = await bcrypt.compare(password, t_user.password);

        if( !isPassMatch ) {
            return res.status(401).json({msg: "Invalid user credentials!"});
        }

        const token = jwt.sign({id:t_user._id}, process.env.JWT_SECRET);

        res.status(201).json({msg: "Login successful!", token});
        
    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }

}

export const getUser = async (req, res) => {
    const { id } = req.params;

    if( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({msg: "Invalid user id!"});
    }

    try {
        const t_user = await user.findById(id);
        if( !t_user ) {
            return res.status(404).json({msg: 'User not found!'});
        }
        res.status(200).json(t_user);
    } catch (error) {
        res.status(500).json({msg: `${error}`});
    }
}