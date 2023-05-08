const mongoose = require('mongoose')
const dotenv = require('dotenv')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    url: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: {
        type: [
            {
                comment: {
                    type: String,
                },
                author: {
                    type: String,
                    default: 'Anonymous',
                },
            },
        ],
        default: [],
    },
})

blogSchema.set('toJSON', {
    transform: (document, objReturned) => {
        objReturned.id = objReturned._id.toString()
        delete objReturned._id
        delete objReturned.__v
    },
})

dotenv.config({ path: '.env' })

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
