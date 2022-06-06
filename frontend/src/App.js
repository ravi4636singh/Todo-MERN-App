import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashboardPage from './pages/DashboardPage'
import MyProfilePage from './pages/MyProfilePage'
import ErrorPage from './pages/ErrorPage'

function App() {
	return (
		<BrowserRouter>
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path='register' element={<RegisterPage />} />
				<Route path='login' element={<LoginPage />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='dashboard' element={<DashboardPage />} />
				<Route path='profile' element={<MyProfilePage />} />
			</Route>
			<Route path='reset-password/:user_id/:user_token' element={<ResetPassword />} />
			<Route path='*' element={<ErrorPage />} />
		</Routes>
		</BrowserRouter>
	)
}

export default App
