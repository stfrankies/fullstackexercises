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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  }

    const handleLikeChange = async(id, blog) => {
    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    await blogService.updateBlog(id, updateBlog)
  }

    const addBlog = (blogObject) =>{
    blogService.createBlog(blogObject).then(data => {
      setMessage(['success', `${data.title} has been added successfully`])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    }).catch(error => {
      setMessage(['error', error.response.data.error])
      setTimeout(() => {
        setMessage([])
      }, 5000)
    })
  }
  

  const handleDelete = (id, title) =>{
    let action = window.confirm(`Do you really want to delete ${title}`)
    if(action) {
      blogService.deleteBlog(id)
      const filterblog = blogs.filter(blog => blog.id !== id)
      setBlogs(filterblog)
      return
    } 
    return
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      <Togglable buttonShow='New blog' buttonHide="Close x">
        <Notification message={message} />
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {sortBlog.map(blog =>
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLikeChange={() => handleLikeChange(blog.id, blog)}/>
      )}
    </div>)
}

export default App