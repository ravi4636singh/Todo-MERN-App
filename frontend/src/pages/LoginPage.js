import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
	const [inputs, setInputs] = useState({email: '', password: ''})
	const [errorMessage, setErrorMessage] = useState({ display: 'none', color: '', message: '' })
	const navigate = useNavigate()

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setInputs({...inputs, [name]: value})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		let {email, password} = inputs
		if(email && password){
			const res = await axios.post('http://localhost:4000/api/auth/login', { email, password })
			const data = await res.data
			if(data.status === 'success'){
				localStorage.setItem('token', data.token)
				navigate('/dashboard')
			}else if(data.status === 'failed'){
				setErrorMessage({display: 'block', color: 'red', message: data.message})
			}
		}else{
			setErrorMessage({display: 'block', color: 'red', message: '**All fields are requires**'})
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
			<Header registerButton='block' />
			<section style={{height: '100vh'}} className='flex flex-col justify-center items-center bg-dark'>
			<span style={{display: errorMessage.display, color: errorMessage.color}} className='mb-1'>{errorMessage.message}</span>
				<form method='POST' onSubmit={handleSubmit} className='px-7 py-6 w-1/4 rounded-2xl bg-pink'>
					<label htmlFor='email' className='block text-md text-white'>Email Id</label>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Enter Email'
						required
						value={inputs.email}
						onChange={handleChange}
						className='text-lg w-full mt-0.5 mb-2 px-2 py-1 outline-none rounded'
					/>

					<label htmlFor='password' className='block text-md text-white'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Enter Password'
						required
						value={inputs.password}
						onChange={handleChange}
						className='text-lg w-full mt-0.5 mb-2 px-2 py-1 outline-none rounded'
					/>

					<Link to='/forgot-password' className='text-white hover:underline'>Forgot Password ?</Link>

					<div className='text-center'>
						<input
							type='submit' value='Login'
							className='cursor-pointer mt-2 bg-dark text-xl py-1 px-5 text-white border border-solid border-dark rounded transition-all duration-500 hover:bg-gray'/>
					</div>
				</form>
			</section>
		</>
	)
}

export default LoginPage
