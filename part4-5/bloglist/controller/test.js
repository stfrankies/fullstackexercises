const express = require('express')

const Blog = require('../model/blogs')
const User = require('../model/users')


const testingRouter = express.Router()

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter