const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../model/users')

const api = supertest(app);

const initialUsers = [
  {
    name: "Arto Hellas",
    username: "hellas",
    password: "pass123"
  },
  {
    name: "Alan Turing",
    username: "alani",
    password: "pass123"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new Blog(initialUsers[0])
  await userObject.save()
  userObject = new Blog(initialUsers[1])
  await userObject.save()
})

test('users without valid username not created', async () => {
  const newUser = {
    name: "Alan Turing",
    username: "al",
    password: "pass123"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(initialUsers.length)
})

test('users without valid password not created', async () => {
  const newUser = {
    name: "Alan Turing",
    username: "alani",
    password: "pa"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(initialUsers.length)
})