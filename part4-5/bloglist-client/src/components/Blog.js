import Togglable from './Togglable'

const Blog = ({blog, handleDelete, handleLikeChange}) => {

  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return(
  <div style={blogStyle} className="blogWrapper">
    <Togglable buttonShow="view" buttonHide="hide" toggleTitle={blog.title +' by '+blog.author}>
      <div className='blogList'>
        <br/>{blog.url}
        <br/>Likes: {blog.likes} <button onClick={handleLikeChange} className="likeButton" id='like'>like</button>
        <br/>{blog.author}
        <button onClick={() => handleDelete(blog.id, blog.title)}>Remove</button>
      </div>
    </Togglable>
  </div> )
}

export default Blog