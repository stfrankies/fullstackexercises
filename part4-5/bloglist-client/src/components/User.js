import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function User({ users, signedInUser, handleLogout }) {
    const { userId } = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        const getSingleUser = async () => {
            try {
                const blogUser = await users.find((user) => user.id === userId)
                console.log(blogUser)
                setUser(blogUser)
            } catch (err) {
                console.error('Error: ' + err)
            }
        }

        getSingleUser()
    }, [users, userId])

    if (!user) {
        return null
    }

    return (
        <main className="min-h-screen grid items-center justify-center">
            <div className="max-w-[400px] grid gap-4 border-2 border-black px-8 pt-4 pb-6 shadow-2xl rounded-lg">
                <h2 className="text-4xl font-extrabold">Blogs</h2>
                <div className="w-full grid grid-cols-3">
                    <p className="col-span-2 grid items-center justify-start text-xl text-blue-700 font-bold">
                        {signedInUser.name} logged in
                    </p>
                    <div>
                        <button
                            onClick={() => handleLogout()}
                            className="border-2 border-blue-950 text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white hover:font-bold py-2 rounded-lg"
                        >
                            logout
                        </button>
                    </div>
                </div>

                <div className="border-2 border-black shadow-2xl rounded-lg py-4">
                    <div className="px-4">
                        <h2 className="text-2xl font-extrabold">{user.name}</h2>
                    </div>
                    <div className="py-2 px-4">
                        <ul className="grid gap-2">
                            <h4 className="text-xl text-blue-700 font-bold">
                                Added Blogs:
                            </h4>
                            {user.blogs === undefined
                                ? null
                                : user.blogs.map((userblog, index) => (
                                      <div
                                          key={userblog.id}
                                          className="grid grid-cols-10 text-lg font-normal pt-2"
                                      >
                                          <h5 className="col-span-1">
                                              {index + 1}.
                                          </h5>
                                          <li className="col-span-9">
                                              {userblog.title}
                                          </li>
                                      </div>
                                  ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default User
