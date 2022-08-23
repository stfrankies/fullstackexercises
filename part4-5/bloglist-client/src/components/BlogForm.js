import React, { useState } from 'react';
import blogService from '../services/blogs'
import Notification from './Notification';

const BlogForm = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState([])

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

  return (
    <div>
      <Notification message={message} />
      <h2>Create New</h2>
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
      </form>
    </div>
  );
}

export default BlogForm;