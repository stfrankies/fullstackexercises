import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import {
    setBlogPosts,
    setNotification,
    setSignedInUser,
} from './redux/actions/blogActions'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import NavBar from './components/NavBar'

function App() {
    const notification = useSelector(
        (state) => state.blogNotification.notification
    )
    const blogPosts = useSelector((state) => state.allblogPosts.blogs)
    const signedInUser = useSelector((state) => state.loggedInUser.user)
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [comment, setComment] = useState('')

    useEffect(() => {
        blogService
            .getAll()
            .then((blogPosts) => dispatch(setBlogPosts(blogPosts)))
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setSignedInUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    useEffect(() => {
        usersService.getAllUsers().then((users) => setUsers(users))
    }, [])

    const sortBlog = blogPosts.sort((a, b) => b.likes - a.likes)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setSignedInUser(user))
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

    const handleAddComment = async (blogId, comment, setComment) => {
        await blogService.addComment(blogId, comment, setComment)
    }

    if (signedInUser === null) {
        return (
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
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
                        }
                    />
                </Routes>
            </Router>
        )
    }

    return (
        <Router>
            <NavBar signedInUser={signedInUser} handleLogout={handleLogout} />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <main className="min-h-screen grid items-center justify-center">
                            <div className="max-w-[400px] grid gap-4 mt-20 border-2 border-black px-8 py-4 shadow-2xl rounded-lg">
                                <h2 className="text-4xl font-extrabold">
                                    Blog app
                                </h2>
                                <div className="w-full grid grid-cols-3">
                                    <p className="col-span-2 grid items-center justify-start text-xl text-blue-700 font-bold">
                                        {signedInUser.username} logged in
                                    </p>
                                    <div>
                                        <button
                                            onClick={() => handleLogout()}
                                            className="border-2 border-blue-950 bg-blue-700 text-white hover:bg-white hover:text-blue-700 px-8 py-2 rounded-lg"
                                        >
                                            logout
                                        </button>
                                    </div>
                                </div>

                                <Togglable
                                    buttonShow="New blog"
                                    buttonHide="Close x"
                                >
                                    <Notification message={notification} />
                                    <BlogForm createBlog={addBlog} />
                                </Togglable>
                                {sortBlog.map((blog) => (
                                    <Blogs
                                        key={blog.id}
                                        blog={blog}
                                        handleDelete={handleDelete}
                                        handleLikeChange={() =>
                                            handleLikeChange(blog.id, blog)
                                        }
                                    />
                                ))}
                            </div>
                        </main>
                    }
                />
                <Route
                    path="/blogs/:blogId"
                    element={
                        <Blog
                            blogPosts={blogPosts}
                            signedInUser={signedInUser}
                            handleLikeChange={handleLikeChange}
                            handleLogout={handleLogout}
                            handleTextAreaChange={({ target }) =>
                                setComment(target.value)
                            }
                            comment={comment}
                            setComment={setComment}
                            handleAddComment={handleAddComment}
                        />
                    }
                />
                <Route
                    path="/users"
                    element={
                        <Users
                            users={users}
                            currentUser={signedInUser.username}
                            handleLogout={handleLogout}
                        />
                    }
                />
                <Route
                    path="/users/:userId"
                    element={
                        <User
                            users={users}
                            signedInUser={signedInUser}
                            handleLogout={handleLogout}
                        />
                    }
                />
            </Routes>
        </Router>
    )
}

export default App
