const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Goal', goalSchema);