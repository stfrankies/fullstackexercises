import { Link, useNavigate } from 'react-router-dom'

function NavBar({ signedInUser, handleLogout }) {
    const navigate = useNavigate()

    return (
        <header className="w-full h-20 bg-blue-600 fixed left-0 top-0">
            <nav className="w-[50%] h-full mx-auto text-white">
                <ul className="w-full h-full grid grid-cols-8 content-center text-lg font-extrabold">
                    <li className="col-span-1 h-full grid items-center justify-center">
                        <Link to="/">blogs</Link>
                    </li>
                    <li className="col-span-1 h-full grid items-center justify-center">
                        <Link to="/users">users</Link>
                    </li>
                    <li className="col-span-4 h-full grid items-center justify-center">
                        {signedInUser.username} logged in
                    </li>
                    <li className="col-span-2 h-full grid items-center justify-center">
                        <Link to="/">
                            <button
                                onClick={() => {
                                    navigate('/')
                                    handleLogout()
                                }}
                                className="border-2 bg-white text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white hover:font-bold py-2 rounded-lg"
                            >
                                logout
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar
