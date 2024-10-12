import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secretKey = process.env.SECRET_KEY

export const generateToken = (userID) => {

    return jwt.sign({userID}, secretKey, { expiresIn: '15m' })
}