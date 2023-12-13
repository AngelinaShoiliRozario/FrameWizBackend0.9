const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    page_details: {
        type: String,
        maxlength: 1000,
        default: null
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    directory: {
        type: String,
        required: true
    },
    index_file: {
        type: String,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Template', templateSchema);