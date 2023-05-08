const blogsRouter = require('express').Router()
const Blog = require('../model/blogs')
const jwt = require('jsonwebtoken')
const User = require('../model/users')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    if (!request.user) {
        response.status(401).json({ error: 'Unauthorized user' })
        return
    }

    const body = request.body
    const user = request.user

    try {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id,
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        const newComment = {
            comment: request.body.comment,
            author: 'Anonymous',
        }

        blog.comments.push(newComment)
        const updatedBlog = await blog.save()
        return response.status(201).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const user = request.user
        const blog = await Blog.findById(request.params.id)
        if (blog.user._id.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            user.blogs = user.blogs.filter(
                (blog) => blog.toString() !== request.params.id.toString()
            )
            await user.save()
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'Unauthorized user' })
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updatedBlog) => {
            response.status(200).json(updatedBlog)
        })
        .catch((error) => next(error))
})

module.exports = blogsRouter
