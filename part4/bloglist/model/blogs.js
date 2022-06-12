const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: ".env" });

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)