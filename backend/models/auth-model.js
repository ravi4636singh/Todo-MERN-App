import mongoose from 'mongoose'

const Schema = mongoose.Schema

const authSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true })

const AuthModel = mongoose.model('auth', authSchema)

export default AuthModel