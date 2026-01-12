const mongoose = require('mongoose');

const ContentBlockSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['paragraph', 'list', 'subheading', 'warning', 'contact'],
        required: true
    },
    text: String,
    items: [{
        term: String,
        definition: String,
        text: String
    }],
    contactDetails: {
        company: String,
        tagline: String,
        email: String,
        privacyEmail: String,
        website: String,
        phone: String,
        address: String
    }
}, { _id: true });

const PolicySectionSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    iconName: String,
    content: [ContentBlockSchema],
    note: String
}, { _id: true });

const PolicySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['privacy-policy', 'terms-and-conditions'],
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    sections: [PolicySectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);
