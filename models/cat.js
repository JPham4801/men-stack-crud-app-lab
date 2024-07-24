const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  favoriteToy: {
    type: String,
    required: true
  },
  isHungry: Boolean
});

const Cat = mongoose.model('Cat', catSchema)
module.exports = Cat