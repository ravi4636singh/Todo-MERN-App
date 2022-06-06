import EditNoteModal from '../components/EditNoteModal'
import Header from '../components/Header'
import NewNoteModal from '../components/NewNoteModal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DashboardPage = () => {
	const [notes, setNotes] = useState([])
	const navigate = useNavigate()
	
	const token = localStorage.getItem('token')
	const getNotes = async () => {
		if(token){
			const res = await axios.get('http://localhost:4000/api/note/read-notes', {
				headers: { Authorization: `Bearer ${token}` }
			})
			const data = await res.data
			if(data.status === 'success'){
				setNotes(data.notes)
				console.log(data.notes)
			}else if(data.status === 'failed'){
				navigate('/')
			}
		}else{
			navigate('/')
		}
	}

	useEffect(() => {
		getNotes()
	}, [setNotes])

	return(<>
		<Header myProfileButton='inline-block' logoutButton='inline-block' />
		<NewNoteModal />
		{notes ? 
		<section className='bg-gray min-h-screen py-8 mt-28'>
			{notes.map(note => <span key={note._id}>
				<EditNoteModal noteId={note._id}  title={note.title} content={note.content} date={note.updatedAt} />
			</span>)}
		</section> : <h1>No Notes</h1>}
	</>)
}

export default DashboardPage
