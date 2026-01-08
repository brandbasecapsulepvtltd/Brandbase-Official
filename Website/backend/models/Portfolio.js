const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: [
            'web-development',
            'app-development',
            'branding',
            'digital-marketing',
            'ui-ux-design',
            'ecommerce',
            'other'
        ]
    },
    client: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Please add a featured image']
    },
    images: [{
        type: String
    }],
    challenge: {
        type: String
    },
    solution: {
        type: String
    },
    result: {
        type: String
    },
    technologies: [{
        type: String
    }],
    liveLink: {
        type: String,
        match: [
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create slug from title
portfolioSchema.pre('validate', function (next) {
    if (this.title && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
