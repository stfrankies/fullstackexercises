const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: ".env" });

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObj) =>{
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)