import { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
	const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
		if(email){
			const res = await axios.post('http://localhost:4000/api/auth/forgot-password', { email })
			const data = await res.data
			if(data.status === 'success'){
				alert(data.message)
				console.log(data.passwordResetLink)
			}else if(data.status === 'failed'){
				alert(data.message)
			}
			setEmail('')
		}else{
			alert('Enter Email')
		}
    }

	const token = localStorage.getItem('token')
	const isLoggedIn = async () => {
		if(token){
			const res = await axios.get('http://localhost:4000/api/auth/check-user-authentication', {
				headers: { Authorization: `Bearer ${token}` }
			})
			const data = await res.data
			if(data.status === 'success'){
				navigate('/dashboard')
			}
		}
	}

	useEffect(() => {
		isLoggedIn()
	})

	return (
		<>
			<Header loginButton='inline-block' />

			<div className='bg-gray h-screen pt-20 w-full'>
				<form id='form' onSubmit={handleSubmit} className='w-1/3 mx-auto'>
					<label htmlFor='send-email' className='block text-2xl text-white mb-1'>
						Send Password Reset Link
					</label>
					<input
						type='email'
						name='send-email'
						id='send-email'
						placeholder='Enter Email'
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='block text-xl w-full py-1 px-2 outline-none rounded-md'
					/>

					<div className='text-center'>
						<button type='submit'
							className='bg-pink text-white text-xl py-1 px-4 mt-4 cursor-pointer rounded-lg transition-all duration-300 hover:bg-dark-pink'>
							Send Link
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default ForgotPassword
