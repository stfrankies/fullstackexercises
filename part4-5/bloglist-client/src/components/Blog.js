import Togglable from './Togglable'

const Blog = ({blog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return(
  <div style={blogStyle}>
    <Togglable buttonShow="view" buttonHide="hide" toggleTitle={blog.title +' '+blog.author}>
      <br/>{blog.url}
      <br/>Likes: {blog.likes} <button>like</button>
      <br/>{blog.author}
    </Togglable>
  </div> )
}

export default Blog