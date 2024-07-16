const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: String,
  type: String,
  isFavorite: Boolean
})

module.exports = mongoose.model('Food', foodSchema)