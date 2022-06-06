import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LandingPage = () => {
	const navigate = useNavigate()
	
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

	return (<>
		<main>
			<div className='flex justify-center items-center'>
				<div className='relative h-screen bg-front-image w-full bg-cover bg-no-repeat object-cover'>
				</div>
				<div className='absolute text-center'>
					<h2 className='text-3xl font-extrabold text-dark-pink'>Access Your Notes From Anywhere {'&'} Anytime</h2>
					<h4 className='text-xl font-medium mb-6'>All Notes are Safe</h4>
					<div className='flex gap-3 justify-center'>
						<div className='w-1/5 py-1 bg-pink text-white text-2xl border border-solid border-pink rounded transition-all duration-500 hover:bg-dark-pink hover:text-xl'>
							<Link to='/login'>Login</Link>
						</div>
						<div className='w-1/5 py-1 bg-pink text-white text-2xl border border-solid border-pink rounded transition-all duration-500 hover:bg-dark-pink hover:text-xl'>
							<Link to='/register'>Register</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	</>)
}
export default LandingPage
