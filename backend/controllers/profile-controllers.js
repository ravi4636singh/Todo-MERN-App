import AuthModel from "../models/auth-model.js"
import bcrypt from 'bcrypt'

class ProfileController {
	// Get user details
	static userInfo = (req, res) => {
		const user = req.user
		res.json({ status: 'success', message: 'User logged In show dashboard', user })
	}

	// Update user details
	static updateUserInfo = async (req, res) => {
		const name = req.body.name

		if(name){
			try {
				await AuthModel.findByIdAndUpdate(req.user._id, {$set: { name }}).select('-password')
				res.json({ status: 'success', message: 'User details updated' })
			} catch (error) {
				res.json({ status: 'failed', message: error.message })
			}
		}else{
			res.json({ status: 'failed', message: 'Something went wrong' })
		}
	}

	// Change Password
    static changePassword = async (req, res) => {
        const password = req.body.password
        if(password.length > 8 ){
            try {
				const salt = await bcrypt.genSalt(10)
				const hashPassword = await bcrypt.hash(password, salt)
				await AuthModel.findByIdAndUpdate(req.user._id, {$set: {password: hashPassword}})
				res.json({ status: 'success', message: 'Password changed' })
			} catch (error) {
				res.json({ status: 'failed', message: error.message })
			}
        }else{
            res.json({ status: 'failed', message: 'Minimum 8 characters password' })
        }
    }
}

export default ProfileController
