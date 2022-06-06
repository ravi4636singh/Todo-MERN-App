import express from 'express'
import ProfileController from '../controllers/profile-controllers.js'
import { isPermission } from '../middlewares/auth-middleware.js'

const profileRoutes = express.Router()

profileRoutes.get('/user-info', isPermission, ProfileController.userInfo)
profileRoutes.put('/update-user-info', isPermission, ProfileController.updateUserInfo)
profileRoutes.patch('/change-password', isPermission, ProfileController.changePassword)

export default profileRoutes