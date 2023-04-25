import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState([])

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const sortBlog = blogs.sort((a, b) => b.likes - a.likes)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
            setMessage(['error', error.response.data.error])
            setTimeout(() => {
                setMessage([])
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
    }

    const handleLikeChange = async (id, blog) => {
        const updateBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
        }

        await blogService.updateBlog(id, updateBlog).then((data) => {
            const updatedBlog = blogs.map((blog) =>
                blog.id === id ? { ...blog, likes: data.likes } : blog
            )
            setBlogs(updatedBlog)
        })
    }

    const addBlog = (blogObject) => {
        blogService
            .createBlog(blogObject)
            .then((data) => {
                setMessage([
                    'success',
                    `${data.title} has been added successfully`,
                ])
                setTimeout(() => {
                    setMessage([])
                }, 5000)
                setBlogs(blogs.concat(data))
            })
            .catch((error) => {
                setMessage(['error', error.response.data.error])
                setTimeout(() => {
                    setMessage([])
                }, 5000)
            })
    }

    const handleDelete = (id, title) => {
        let action = window.confirm(`Do you really want to delete ${title}`)
        if (action) {
            blogService
                .deleteBlog(id)
                .then(() => {
                    setMessage([
                        'success',
                        `${title} has been deleted successfully`,
                    ])
                    setTimeout(() => {
                        setMessage([])
                    }, 5000)
                    const filterblog = blogs.filter((blog) => blog.id !== id)
                    setBlogs(filterblog)
                })
                .catch((error) => {
                    setMessage(['error', error.response.data.error])
                    setTimeout(() => {
                        setMessage([])
                    }, 5000)
                })
        }
    }

    if (user === null) {
        return (
            <div className="max-h-screen grid grid-rows-10 gap-4 pt-[33%]">
                <Notification message={message} />
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleSubmit={handleLogin}
                />
            </div>
        )
    }

    return (
        <main className="min-h-screen grid items-center justify-center">
            <div className="max-w-[400px] grid gap-4 border-2 border-black px-8 py-4 shadow-2xl rounded-lg">
                <h2 className="text-4xl font-extrabold">Blogs</h2>
                <div className="w-full grid grid-cols-3">
                    <p className="col-span-2 grid items-center justify-start text-2xl">
                        {user.name} logged in
                    </p>
                    <div className="">
                        <button
                            onClick={() => handleLogout()}
                            className="border-2 border-blue-950 text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white hover:font-bold py-2 rounded-lg"
                        >
                            logout
                        </button>
                    </div>
                </div>
                <Togglable buttonShow="New blog" buttonHide="Close x">
                    <Notification message={message} />
                    <BlogForm createBlog={addBlog} />
                </Togglable>
                {sortBlog.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleDelete={handleDelete}
                        handleLikeChange={() => handleLikeChange(blog.id, blog)}
                    />
                ))}
            </div>
        </main>
    )
}

export default App
