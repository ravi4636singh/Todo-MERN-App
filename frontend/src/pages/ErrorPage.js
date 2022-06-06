import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    
    const handleSubmit = async () => {
        const token = localStorage.getItem('token')
        if(token){
            const res = await axios.get('http://localhost:4000/api/auth/check-user-authentication', {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.data
            if(data.status === 'success'){
                navigate('/dashboard')
            }else if(data.status === 'failed'){
                navigate('/')
            }
        }else{
             navigate('/')
        }
    }
  
  return (
    <div className="bg-dark text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl">404 Page Not Found</h1>
        <button onClick={handleSubmit} className="bg-pink text-xl mt-3 px-4 py-1 rounded border border-solid border-pink transition-all duration-300 hover:border-transparent hover:bg-dark-pink hover:text-lg">Go to home page</button>
    </div>
  )
}

export default ErrorPage