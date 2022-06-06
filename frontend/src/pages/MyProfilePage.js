import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MyProfilePage = () => {
	const [inputs, setInputs] = useState({
		name: '', email: '', password: ''
	})
	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setInputs({...inputs, [name]: value})
	}
	const navigate = useNavigate()

	const token = localStorage.getItem('token')
	const isLoggedIn = async () => {
		if (token) {
			const res = await axios.get('http://localhost:4000/api/profile/user-info', {
				headers: { Authorization: `Bearer ${token}` }
			})
			const data = await res.data
			if (data.status === 'success') {
				setInputs({
					name: data.user.name, email: data.user.email
				})
			}else if(data.status === 'failed'){
				navigate('/')
			}
		}else{
			navigate('/')
		}
	}

	useEffect(() => {
		isLoggedIn()
	}, [setInputs])

	const saveChanges = async () => {
		inputs.name && await axios.put('http://localhost:4000/api/profile/update-user-info', {name: inputs.name}, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(res => {
			const data = res.data
			if(data.status === 'success'){
				alert(data.message)
				window.location.reload()
			}else if(data.status === 'failed'){
				alert(data.message)
			}
		})

		inputs.password && await axios.patch('http://localhost:4000/api/profile/change-password', {password: inputs.password}, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(res => {
			const data = res.data
			if(data.status === 'success'){
				window.location.reload()
			}else if(data.status === 'failed'){
				alert(data.message)
			}
		})
	}

	return (
		<>
			<Header logoutButton='inline-block' />
			<section className='bg-gray h-screen pt-16'>

					<div className='mt-10 w-1/3 mx-auto'>
						<div>
							<label htmlFor='full-name' className='block text-white text-xl mb-1'>Full Name</label>
							<input
								type='text'
								id='name'
								name='name'
								value={inputs.name}
								onChange={handleChange}
								className='w-10/12 py-1 px-2 text-xl outline-none border border-solid border-stone-300 rounded'/>
						</div>

						<div>
							<label htmlFor='email' className='block text-white text-xl mb-1 mt-3'>Email Id</label>
							<input
								type='email'
								id='email'
								name='email'
								value={inputs.email}
								disabled
								className='w-10/12 py-1 px-2 text-xl outline-none border border-solid border-stone-300 rounded'/>
						</div>

						<div>
							<label htmlFor='password' className='block text-white text-xl mb-1 mt-3'>Password</label>
							<input
								type='password'
								id='password'
								name='password'
								placeholder='Change Password'
								value={inputs.password}
								onChange={handleChange}
								className='w-10/12 py-1 px-2 text-xl outline-none border border-solid border-stone-300 rounded'/>
						</div>
					</div>

				<div className='text-center mt-16'>
					<button
						type='button'
						onClick={saveChanges}
						className='bg-green-600 text-white text-lg py-1 px-3 rounded transition-all duration-300 hover:bg-green-700'>
						Save Changes
					</button>
				</div>
			</section>
		</>
	)
}

export default MyProfilePage
