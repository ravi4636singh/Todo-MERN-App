import jwt from "jsonwebtoken"
import AuthModel from "../models/auth-model.js"

export const isPermission = async (req, res, next) => {
    const { authorization } = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            const token = authorization.split(' ')[1]
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const user = await AuthModel.findById(userId).select('-password')
            req.user = user
            await next()
        } catch (error) {
            res.json({ status: 'failed', message: error.message })
        }
    }else{
        res.json({ status: 'failed', message: 'User must be login' })
    }
}