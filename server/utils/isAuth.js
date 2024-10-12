import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const isAuth = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(500).json({ success: false, message: 'Access denied. No token provided.'})
    }
    try {
        //Verify token valid or invalid
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if(!decoded){
            return res.status(500).json({success : false, message : "Invalid or expired token."})
        }
        req.user = decoded;
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success : false, message : "Invalid or expired token."})
    }

}