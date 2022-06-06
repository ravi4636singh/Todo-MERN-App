import { Link, useNavigate } from 'react-router-dom'

const Header = ({registerButton, loginButton, myProfileButton, logoutButton}) => {
	const navigate = useNavigate()

	const logout = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	return (
		<header className='bg-dark fixed top-0 left-0 right-0 z-10'>
			<nav className='container mx-auto px-20 py-2 flex text-2xl'>
				<div className='grow'>
					<Link to='/' className='text-white'>All Note Safe</Link>
				</div>
				<div>
					<Link to='/register'>
						<button
							type='submit'
							style={{ display: registerButton }}
							className='bg-pink text-white text-xl px-4 py-1 border border-solid border-pink rounded-3xl transition-all duration-500 hover:bg-dark-pink hover:border-dark-pink'>
							Register
						</button>
					</Link>

					<Link to='/login'>
						<button
							type='submit'
							style={{ display: loginButton }}
							className='text-xl text-white px-4 py-1 rounded-2xl transition-all duration-500 hover:bg-gray'>
							Login
						</button>
					</Link>

					<Link to='/profile'>
						<button
							type='submit'
							style={{ display: myProfileButton }}
							className='bg-pink text-white text-xl px-3 py-1 border border-solid border-pink rounded transition-all duration-500 hover:bg-transparent hover:text-pink'>
							My Profile
						</button>
					</Link>

					<button
						type='submit'
						style={{ display: logoutButton }}
						onClick={logout}
						className='bg-red-600 text-lg text-white px-2 py-1 ml-3 border border-solid transition-all duration-500 border-red-500 rounded hover:bg-red-700'>
						Logout
					</button>
				</div>
			</nav>
		</header>
	)
}

Header.defaultProps = {
	registerButton: 'none',
	loginButton: 'none',
	myProfileButton: 'none',
	logoutButton: 'none',
}

export default Header
