/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

const blog = {
    title: "The latest blog in town",
    author: "Adrian Gucci",
    url: "addywrites.blog.me",
    likes: 5
  }

describe('<Togglable /> text and event', () => {
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
