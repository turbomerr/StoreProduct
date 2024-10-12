import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Plese fill all fields!" })
        }
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.redirect("/login")
            return res.status(100).json({ success: false, message: "User is already exist!" })
        }
        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        //res.redirect("/api/user/login")
        return res.status(201).json({ success: true, data: newUser, message: "User created succesfully!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Register Fatal Error" })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields!" })
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(500).json({ success: false, message: "User not found" })
        }
        const verifyPassword = await bcryptjs.compare(password, userExist.password)
        if (!verifyPassword) {
            return res.status(400).json({ success: false, message: "Password is not match!" })
        }

        // generate a token 
        // const token = generateToken(userExist._id) //return token
        // res.cookie("token", token, { httpOnly: false, secure: false })

        // return res.status(201).json({ success: true, message: `${userExist.username} logged in successfully!` })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Login Fatal Error" })
    }
}
export const logout = async (req, res) => {
    try {

        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" })
        return res.status(200).json({ success: true, message: `User logged out successfully!` });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Logout Fatal Error" })
    }
}

