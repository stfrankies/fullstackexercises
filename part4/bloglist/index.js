const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./model/blogs')


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.status(200).json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    }).catch(e =>{
      if(e.name === "ValidationError"){
        response.status(400).json(e)
      }
      console.log(e)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app