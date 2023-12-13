const mongoose = require('mongoose');

const userTemplateInfoSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    directory: {
        type: String,
        maxlength: 1000,
        required: true
    },
    index_file: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        maxlength: 2000,
        required: true
    },
    template_id: {
        type: String,
        required: true
    },
    template_name: {
        type: String,
        required: true
    },
    template_category_id: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userTemplateInfo', userTemplateInfoSchema);