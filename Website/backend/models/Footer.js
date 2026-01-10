const mongoose = require('mongoose');

const footerColumnSchema = new mongoose.Schema({
    title: String,
    links: [{
        label: String,
        href: String
    }]
});

const contactInfoSchema = new mongoose.Schema({
    address: String,
    email: String,
    phone: String
});

const socialLinkSchema = new mongoose.Schema({
    platform: String,
    url: String,
    icon: String
});

const footerSchema = new mongoose.Schema({
    logoLight: String,
    logoDark: String,
    description: String,
    socialLinks: [socialLinkSchema],
    columns: [footerColumnSchema],
    contactInfo: contactInfoSchema,
    legalLinks: [{
        label: String,
        href: String
    }],
    copyright: String,
    gstin: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Footer', footerSchema);
