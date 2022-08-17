const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../model/users')

const api = supertest(app);

const initialUsers = [
  {
    _id: "62d2f6ec99e8f00977a4b72e",
    name: "Arto Hellas",
    username: "hellas",
    passwordHash: "$2b$10$AzejsZu2i5Ts6jy90EDDh.t7i8ZY1R9.l7oc3QpSKUU/Xz8520bhq",
    blogs: "5a422a851b54a676234d17f7"
  },
  {
    _id: "62d2f6ec99e8f00977a4b730",
    name: "Alan Turing",
    username: "alani",
    passwordHash: "$2b$10$AzejsZu2i5Ts6jy90EDDh.t7i8ZY1R9.l7oc3QpSKUU/Xz8520bhq",
    blogs: "5a422aa71b54a676234d17f8"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(initialUsers[0])
  await userObject.save()
  userObject = new User(initialUsers[1])
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