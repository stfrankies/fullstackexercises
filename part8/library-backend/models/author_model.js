const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name cannot be empty"],
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
  mybooks:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)