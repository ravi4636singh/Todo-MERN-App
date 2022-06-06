import AuthModel from "../models/auth-model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthControllers{
    // Registration Controller 
    static registerAuth = async (req, res) => {
        const { name, email, password, confirmPassword } = req.body

        const user = await AuthModel.findOne({email: email})

        if(user){
            res.json({ status: 'failed', message: 'This Email is already registered' })
        }else{
            if(name && email && password && confirmPassword){
                if(password === confirmPassword){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new AuthModel({ name: name, email: email, password:hashPassword })
                        await doc.save()
                        // Generate Token
                        const savedUser = await AuthModel({ email: email })
                        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET_KEY)
                        res.json({ status: 'success', message: 'Registered Successfully', token })
                    } catch (error) {
                        res.json({ status: 'failed', message: 'Internal Server Error' })
                    }
                }else{
                    res.json({ status: 'failed', message: 'Password and Confirm Password dose not match.' })
                }
            }else{
                res.json({ status: 'failed', message: 'All fields are required' })
            }
        }
    }

    // Login Controller
    static loginAuth = async (req, res) => {
        const { email, password } = req.body

        if(email && password){
            const user = await AuthModel.findOne({email: email})

            if(user){
                try {
                    const isPasswordMatch = await bcrypt.compare(password, user.password)
                    if(isPasswordMatch){
                        // Generate Token
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
                        res.json({ status: 'success', message: 'Login Successfully', token })
                    }else{
                        res.json({ status: 'failed', message: 'Wrong Password' })
                    }
                } catch (error) {
                    res.json({ status: 'failed', message: 'Internal Server Error' })
                }
            }else{
                res.json({ status: 'failed', message: 'This email is not registered' })
            }
        }else{
            res.json({ status: 'failed', message: '**All fields are required**' })
        }
    }

    // Forgot Password
    static forgotPassword = async (req, res) => {
        const { email } = req.body

        const user = await AuthModel.findOne({email: email})

        if(user){
            try {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
                const passwordResetLink = `http://localhost:3000/reset-password/${user._id}/${token}`
                res.json({ status: 'success', message: 'Password reset link sent, Check email box', passwordResetLink })
            } catch (error) {
                res.json({ status: 'failed', message: 'Something went wrong, please try again' })
            }
        }else{
            res.json({ status: 'failed', message: 'This email is not registered' })
        }
    }

    // Reset Password
    static resetPassword = async (req, res) => {
        const userId = req.params.user_id
        const userToken = req.params.user_token
        const { password, confirmPassword } = req.body

        if(password && confirmPassword){
            if(password === confirmPassword){
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password, salt)
                    const user = await AuthModel.findById(userId)
                    const token = jwt.verify(userToken, process.env.JWT_SECRET_KEY)
                    if(user && token){
                        await AuthModel.findByIdAndUpdate(user._id, {$set: {password: hashPassword}})
                        res.json({ status: 'success', message: 'Password Reset' })
                    }else{
                        res.json({ status: 'failed', message: 'Link is expired' })
                    }
                } catch (error) {
                    res.json({ status: 'failed', message: 'Link is expired' })                  
                }
            }else{
                res.json({ status: 'failed', message: 'Password and confirm password does not match' })
            }
        }else{
            res.json({ status: 'failed', message: 'All fields are required' })
        }
    }

    // Check user login or not
    static checkUserAuthentication = async (req, res) => {
        const { authorization } = req.headers

        if(authorization && authorization.startsWith('Bearer')){
            try {
                const token = authorization.split(' ')[1]
                token && jwt.verify(token, process.env.JWT_SECRET_KEY)
                res.json({ status: 'success', message: 'User logged In show dashboard' })
            } catch (error) {
                res.json({ status: 'failed', message: 'Internal Server Error'})
            }
        }else{
            res.json({ status: 'failed', message: 'User not logged In'})
        }
    }
}

export default AuthControllers
