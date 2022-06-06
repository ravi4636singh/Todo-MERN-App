import { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
	const [inputs, setInputs] = useState({name: '', email: '', password: '', confirmPassword: ''})
	const [errorMessage, setErrorMessage] = useState({ display: 'none', color: '', message: '' })
	const navigate = useNavigate()

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setInputs({ ...inputs, [name]: value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		let {name, email, password, confirmPassword} = inputs
		
		if(name && email && password && confirmPassword){
			if(password === confirmPassword){
				const res = await axios.post('http://localhost:4000/api/auth/register', { name, email, password, confirmPassword })
				const data = await res.data
				if(data.status === 'success'){
					localStorage.setItem('token', data.token)
					navigate('/dashboard')
				}else if(data.status === 'failed'){
					setErrorMessage({display: 'block', color: 'red', message: data.message})
				}
			}else{
				setErrorMessage({display: 'block', color: 'red', message: 'Password and Confirm Password are not matching'})
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
			<Header loginButton='block' />
			<section style={{ height: '100vh' }} className='flex flex-col justify-center items-center bg-dark'>
				<span style={{display: errorMessage.display, color: errorMessage.color}} className='mb-1'>{errorMessage.message}</span>
				<form onSubmit={handleSubmit} method='POST' className='px-7 py-4 w-2/5 rounded-2xl bg-pink'>
					<label htmlFor='name' className='block text-md text-white'>Full Name</label>
					<input
						type='text'
						name='name'
						id='name'
						placeholder='Enter Full-Name'
						required
						value={inputs.name}
						onChange={handleChange}
						className='text-lg w-full mt-0.5 mb-2 px-2 py-1 outline-none rounded'
					/>

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
						placeholder='Password'
						required
						value={inputs.password}
						onChange={handleChange}
						className='text-lg w-full mt-0.5 mb-2 px-2 py-1 outline-none rounded'
					/>

					<label htmlFor='confirmPassword' className='block text-md text-white'>Confirm Password</label>
					<input
						type='password'
						name='confirmPassword'
						id='confirmPassword'
						placeholder='Confirm Password'
						required
						value={inputs.confirmPassword}
						onChange={handleChange}
						className='text-lg w-full mt-0.5 mb-2 px-2 py-1 outline-none rounded'
					/>

					<div className='text-center'>
						<input
							type='submit'
							className='cursor-pointer mt-2 bg-dark text-xl py-1 px-5 text-white border border-solid border-dark rounded transition-all duration-500 hover:bg-gray'/>
					</div>
				</form>
			</section>
		</>
	)
}

export default RegisterPage
