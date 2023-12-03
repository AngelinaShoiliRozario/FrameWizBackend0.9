const mongoose = require('mongoose');

const buttonCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ButtonCategoryModel', buttonCategorySchema);