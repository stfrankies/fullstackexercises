import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
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

  const AddBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService.createBlog(newBlog).then(data => {
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

  const showBlogForm = () => {
    setBlogFormVisible(true)
    setButtonVisible(false)
  }

  const hideBlogForm = () => {
    setBlogFormVisible(false);
    setButtonVisible(true)
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
          handleSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      {blogFormVisible && (<div>
        <h2>Create New</h2>
        <Notification message={message} />
        <form onSubmit={AddBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
          <button onClick={() => hideBlogForm()}>Cancel</button>
        </form>
      </div>)}
      {buttonVisible && <button onClick={() => showBlogForm()}>New Blog</button>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App