const mongoose = require('mongoose');

const templateCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TemplateCategory', templateCategorySchema);