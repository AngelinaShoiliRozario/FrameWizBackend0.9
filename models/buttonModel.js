const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    maxlength: 10000, 
  },
  // btn_img_url: {
  //   type: String,
  //   required: true,
  // },
  status: {
    type: Boolean,
    default: true, 
  },
});

module.exports = mongoose.model('ButtonModel', buttonSchema);