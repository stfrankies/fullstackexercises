/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const blog = {
    title: "The latest blog in town",
    author: "Adrian Gucci",
    url: "addywrites.blog.me",
    likes: 5
  }

describe('<Togglable />, text and event', () => {
  let container

  beforeEach(()=> {
    container = render(
      <Togglable buttonShow='view' buttonHide='hide'>
        <div>
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders blog title and author only by default', () => {

    render(<Blog blog={blog} />)
    const blogHeader = screen.getByText(`${blog.title} by ${blog.author}`)
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    expect(blogHeader).toBeDefined()
  })

  test('click button event shows blog details: likes and url', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})

test('click like button event and response + 2', async () => {
  const mockHandler = jest.fn()

  const{ container } = render(
    <Blog blog={blog} handleLikeChange={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const blogWrap = container.querySelector('.blogWrapper')
  expect(blogWrap).toBeVisible()

  const likeButton = screen.getByText('like')

  expect(likeButton).toBeDefined()
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> calls event handler with right details', async () =>{
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'Blog title...')
  await user.type(inputs[1], 'Blog author...')
  await user.type(inputs[2], 'blog.url...')

  const sendButton = screen.getByText('Create')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog title...')
  expect(createBlog.mock.calls[0][0].author).toBe('Blog author...')
  expect(createBlog.mock.calls[0][0].url).toBe('blog.url...')
})