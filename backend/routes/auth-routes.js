import express from 'express'
import AuthControllers from '../controllers/auth-controllers.js'

const authRoutes = express.Router()

authRoutes.post('/register', AuthControllers.registerAuth)
authRoutes.post('/login', AuthControllers.loginAuth)
authRoutes.post('/forgot-password', AuthControllers.forgotPassword)
authRoutes.put('/reset-password/:user_id/:user_token', AuthControllers.resetPassword)
authRoutes.get('/check-user-authentication', AuthControllers.checkUserAuthentication)

export default authRoutes
