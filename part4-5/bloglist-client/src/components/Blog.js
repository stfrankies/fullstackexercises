import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({blog}) => {

  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const IncrementLike = async() => {
    const likesplusone = ++blog.likes
    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likesplusone
    }

    await blogService.updateBlog(blog.id, updateBlog)
    setLikes(likesplusone)
  }

return(
  <div style={blogStyle}>
    <Togglable buttonShow="view" buttonHide="hide" toggleTitle={blog.title +' '+blog.author}>
      <br/>{blog.url}
      <br/>Likes: {likes} <button onClick={IncrementLike}>like</button>
      <br/>{blog.author}
    </Togglable>
  </div> )
}

export default Blog