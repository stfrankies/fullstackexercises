import { Link, useNavigate } from 'react-router-dom'

function Users({ users, currentUser, handleLogout }) {
    const navigate = useNavigate()

    const handleUserLogout = () => {
        navigate('/')
        handleLogout()
    }

    return (
        <main className="min-h-screen grid items-center justify-center">
            <div className="mt-20 max-w-[400px] grid gap-4 border-2 border-black px-8 py-8 shadow-2xl rounded-lg">
                <h2 className="text-4xl font-extrabold">Blogs</h2>
                <div className="w-full grid grid-cols-3">
                    <p className="col-span-2 grid items-center justify-start text-xl text-blue-700 font-bold">
                        {currentUser} logged in
                    </p>
                    <div>
                        <button
                            onClick={handleUserLogout}
                            className="border-2 border-blue-950 hover:bg-white hover:text-blue-700 bg-blue-700 text-white text-lg px-8 py-2 rounded-lg"
                        >
                            logout
                        </button>
                    </div>
                </div>

                <h2 className="text-4xl font-extrabold">Users</h2>
                <div className="w-full grid gap-6">
                    <div className="grid grid-cols-5">
                        <p className="col-span-3 grid items-center justify-start text-xl text-blue-700 font-bold">
                            users names
                        </p>
                        <p className="col-span-2 grid items-center justify-start text-xl text-blue-700 font-bold">
                            blogs created
                        </p>
                    </div>
                    {users.map((user, index) => (
                        <div className="grid grid-cols-5" key={index}>
                            <Link
                                to={`/users/${user.id}`}
                                className="col-span-3 grid items-center justify-start text-xl text-black font-bold"
                            >
                                {user.name}
                            </Link>

                            <p className="col-span-2 text-center text-xl text-black font-bold">
                                {user.blogs.length}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Users
