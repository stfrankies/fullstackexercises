const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/blogs')

const api = supertest(app)

const token =
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjJkMmY2ZWM5OWU4ZjAwOTc3YTRiNzJlIiwiaWF0IjoxNjU4NjkxNTQxfQ.s1lZF9WfX2kWgJeAZ4sbD93M2ZXXE728yKgguGcJcmk'

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '62d2f6ec99e8f00977a4b72e',
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '62d2f6ec99e8f00977a4b730',
        __v: 0,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(response.body.length)
})

test("blog has a unique id named 'id'", async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('valid blog can be added', async () => {
    const newBlog = {
        title: 'Type warship',
        author: 'Roberto C. Martino',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWarship.html',
        likes: 3,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const likecount = response.body.map((like) => like.likes)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likecount).toBeDefined()
})

test('blog without valid title and url not added', async () => {
    const newBlog = {
        author: 'Roberto C. Martino',
        likes: 3,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('Unauthorized - no valid token', async () => {
    const newBlog = {
        title: 'Type warship',
        author: 'Roberto C. Martino',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWarship.html',
        likes: 3,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog can be deleted', async () => {
    const blogIndb = await Blog.find({})

    const blogToDelete = blogIndb[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204)

    const blogAfter = await Blog.find({})
    const blog_id = blogAfter.map((r) => r.id)

    expect(blog_id).not.toContain(blogToDelete.id)
})

test('a specific blog can be updated', async () => {
    const blogIndb = await Blog.find({})

    const blogToUpdate = blogIndb[0]
    const updateBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog).expect(200)

    const blogAfter = await Blog.find({})
    const blog_likes = blogAfter.map((r) => r.likes)

    expect(blog_likes).toContain(updateBlog.likes)
})

afterAll(() => {
    mongoose.connection.close()
})
