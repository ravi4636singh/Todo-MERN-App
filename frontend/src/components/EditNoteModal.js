import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const EditNoteModal = ({noteId, title, content, date}) => {
	const [modal, setModal] = useState(false)
	const [inputs, setInputs] = useState({title, content})
	const [errorMessage, setErrorMessage] = useState({ status: 'none', message: '', color: '' })
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	const handleChange = e => {
		const name = e.target.name
		const value = e.target.value
		setInputs({...inputs, [name]: value})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		let {title, content} = inputs
		if(title || content){
			title = title.length > 0 ? title : 'No Title'
			const res = await axios.put(`http://localhost:4000/api/note/update-notes/${noteId}`, {title, content}, {
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

	const noteDelete = async () => {
		const res = await axios.delete(`http://localhost:4000/api/note/delete-notes/${noteId}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		const data = await res.data
		if(data.status === 'success'){
			alert('Deleted Successfully')
			navigate('/')
		}else if(data.status === 'failed'){
			navigate('/')
		}
	}

	return (<>
		<div key={noteId} className='w-6/12 mx-auto border border-solid border-pink bg-gray py-1 px-3 mb-2 rounded'>
			<h4 onClick={() => setModal(true)} className='text-xl text-white mb-5 cursor-pointer'>{title}</h4>
            <div className='flex justify-between items-center'>
				<span className='text-sm text-white italic'>{moment(date).format('lll')}</span>
				<div>
					<button
						onClick={() => setModal(true)}
						className='border border-solid border-dark text-md text-white px-3 py-1 rounded hover:bg-dark transition-all duration-500'>
                        Edit
					</button>
					<button onClick={noteDelete} className='bg-red-600 text-md text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-500 hover:text-white ml-2'>
				    	Delete
					</button>
				</div>
			</div>
		</div>

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
							className='inline-block border-none text-xl py-1 px-3 text-white rounded transition-all duration-500 hover:bg-dark'>
							Cancel
						</button>
						<button
							type='submit'
							className='inline-block bg-pink text-xl py-1 px-3 text-white border border-solid border-pink rounded transition-all duration-500 hover:bg-dark-pink'>
							Save
						</button>
					</div>
				</form>
			</div>
		) : null}
	</>)
}

export default EditNoteModal
