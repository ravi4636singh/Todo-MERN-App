import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
    const [errorMessage, setErrorMessage] = useState({ display: 'none', color: '', message: '' })
	const {user_id, user_token} = useParams()
	const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const form = document.querySelector('#form')
        const formData = new FormData(form)
        let password = formData.get('password')
        let confirmPassword = formData.get('confirm-password')
		if(password && confirmPassword){
            if(password === confirmPassword){
				const res = await axios.put(`http://localhost:4000/api/auth/reset-password/${user_id}/${user_token}`, { password, confirmPassword })
				const data = await res.data
				if(data.status === 'success'){
					alert(data.message)
					navigate('/login')
				}else if(data.status === 'failed'){
					alert(data.message)
				}
            }else{
                setErrorMessage({display: 'block', color: 'red', message: 'Password and Confirm Password does not match'})
            }
		}else{
			setErrorMessage({display: 'block', color: 'red', message: '**All fields are requires**'})
		}
    }

	return (
		<>
			<div className='bg-gray h-screen w-full pt-16'>
				<form id='form' onSubmit={handleSubmit} className='w-1/3 mx-auto'>
					<label htmlFor='password' className='block text-xl text-white my-1'>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Enter Password'
						required
						className='block text-xl w-full py-1 px-2 outline-none rounded-md'
					/>

                    <label htmlFor='confirm-password' className='block text-xl text-white my-1'>
						Confirm Password
					</label>
					<input
						type='password'
						name='confirm-password'
						id='confirm-password'
						placeholder='Enter Confirm Password'
						required
						className='block text-xl w-full py-1 px-2 outline-none rounded-md'
					/>

					<div className='text-center'>
						<button type='submit'
							className='bg-pink text-white text-xl py-1 px-4 my-3 cursor-pointer rounded-lg outline-none transition-all duration-300 hover:bg-dark-pink'>
							Reset Password
						</button>
					</div>

                    <span style={{display: errorMessage.display, color: errorMessage.color}} className='text-center'>{errorMessage.message}</span>
				</form>
			</div>
		</>
	)
}

export default ResetPassword
