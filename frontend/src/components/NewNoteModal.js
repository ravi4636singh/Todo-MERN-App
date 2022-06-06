import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewNoteModal = () => {
	const [modal, setModal] = useState(false)
	const [inputs, setInputs] = useState({title: '', content: ''})
	const [errorMessage, setErrorMessage] = useState({ status: 'none', message: '', color: '' })
	const navigate = useNavigate()

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setInputs({...inputs, [name]: value})
	}

	const token = localStorage.getItem('token')
	const handleSubmit = async e => {
		e.preventDefault()
		let {title, content} = inputs
		if(title || content){
			title = title.length > 0 ? title : 'No Title'
			const res = await axios.post('http://localhost:4000/api/note/create-notes', {title, content}, {
				headers: { Authorization: `Bearer ${token}` }
			})
			const data = await res.data
			if(data.status === 'success'){
				navigate('/')
				setModal(false)
			}else if(data.status === 'failed'){
				setErrorMessage({ status: 'block', message: data.message, color: 'red' })
			}
		}else{
			setErrorMessage({ status: 'block', message: 'Sorry blank note not create', color: 'red' })
		}
	}

	return (
		<>
			<section style={{top: '52px'}} className='bg-dark fixed left-0 right-0'>
				<div className='w-9/12 mx-auto py-4'>
					<button type='button' onClick={() => setModal(true)}
						className='bg-gray border border-solid border-gray text-xl text-white px-4 py-1.5 rounded-xl hover:bg-transparent transition-all duration-500'>Create New Note
					</button>
				</div>
			</section>

			{modal ? (
				<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
					<form onSubmit={handleSubmit} className='border border-solid border-dark bg-gray px-5 rounded w-8/12'>
						<span style={{display: errorMessage.status, color: errorMessage.color}} className='text-center'>{errorMessage.message}</span>
						<label htmlFor='title' className='block text-2xl text-white mt-4'>Title</label>
						<input
							type='text'
							name='title'
							id='title'
							placeholder='Enter Title'
							required
							value={inputs.title}
							onChange={handleChange}
							className='block w-full text-lg border-none mt-0.5 mb-2 px-2 py-1 outline-none rounded'/>

						<textarea
							name='content'
							id='content'
							rows='10'
							placeholder='Write a message...'
							value={inputs.content}
							onChange={handleChange}
							className='block w-full text-lg border-none mt-0.5 mb-2 px-2 py-1 outline-none rounded'>
						</textarea>

						<div className='flex justify-end gap-2 mb-4'>
							<button type='button' onClick={() => setModal(false)}
								className='inline-block border-none text-xl py-1 px-3 text-white rounded transition-all duration-500 hover:bg-dark'>Cancel
							</button>
							<button type='submit' onClick={handleSubmit}
								className='inline-block bg-pink text-xl py-1 px-3 text-white border border-solid border-pink rounded transition-all duration-500 hover:bg-dark-pink'>Save</button>
						</div>
					</form>
				</div>
			) : null}
		</>
	)
}

export default NewNoteModal
