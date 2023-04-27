import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setBlogPosts, setNotification } from './redux/actions/blogActions'

const App = () => {
    const notification = useSelector(
        (state) => state.blogNotification.notification
    )
    const blogPosts = useSelector((state) => state.allblogPosts.blogs)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService
            .getAll()
            .then((blogPosts) => dispatch(setBlogPosts(blogPosts)))
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const sortBlog = blogPosts.sort((a, b) => b.likes - a.likes)

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
            dispatch(setNotification(['error', error.response.data.error]))
            setTimeout(() => {
                dispatch(setNotification([]))
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
            const updatedBlog = blogPosts.map((blog) =>
                blog.id === id ? { ...blog, likes: data.likes } : blog
            )
            dispatch(setBlogPosts(updatedBlog))
        })
    }

    const addBlog = (blogObject) => {
        blogService
            .createBlog(blogObject)
            .then((data) => {
                dispatch(
                    setNotification([
                        'success',
                        `${data.title} has been added successfully`,
                    ])
                )
                setTimeout(() => {
                    dispatch(setNotification([]))
                }, 5000)
                dispatch(setBlogPosts(blogPosts.concat(data)))
            })
            .catch((error) => {
                dispatch(setNotification(['error', error.response.data.error]))
                setTimeout(() => {
                    dispatch(setNotification([]))
                }, 5000)
            })
    }

    const handleDelete = (id, title) => {
        let action = window.confirm(`Do you really want to delete ${title}`)
        if (action) {
            console.log(id)
            blogService
                .deleteBlog(id)
                .then(() => {
                    dispatch(
                        setNotification([
                            'success',
                            `${title} has been deleted successfully`,
                        ])
                    )
                    setTimeout(() => {
                        dispatch(setNotification([]))
                    }, 5000)
                    const filterblog = blogPosts.filter(
                        (blog) => blog.id !== id
                    )
                    dispatch(setBlogPosts(filterblog))
                })
                .catch((error) => {
                    dispatch(
                        setNotification(['error', error.response.data.error])
                    )
                    setTimeout(() => {
                        dispatch(setNotification([]))
                    }, 5000)
                })
        }
    }

    if (user === null) {
        return (
            <div className="max-h-screen grid grid-rows-10 gap-4 pt-[50px]">
                <Notification message={notification} />
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
                    <p className="col-span-2 grid items-center justify-start text-xl text-blue-700 font-bold">
                        {user.username} logged in
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
                    <Notification message={notification} />
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
