const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/users')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    response.status(400).json({ message: "password must have more than 3 characters" })
    return
  }

  const users = await User.find({})

  const isNotUnique = users.filter(founduser => new RegExp(username, "i").test(founduser.username))

  if(isNotUnique.length !== 0){
    response.status(400).json({ message: "This username has already been taken!"})
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }

})

usersRouter.get('/', (request, response) => {
  User.find({})
    .then(users => {
      response.json(users)
    })
})

module.exports = usersRouter