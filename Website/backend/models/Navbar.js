const mongoose = require('mongoose');

const navItemSchema = new mongoose.Schema({
    name: String,
    link: String
});

const navCategorySchema = new mongoose.Schema({
    category: String,
    categoryLink: String,
    items: [navItemSchema]
});

const directLinkServiceSchema = new mongoose.Schema({
    category: String,
    link: String
});

const navbarSchema = new mongoose.Schema({
    logoLight: {
        type: String,
        default: 'https://ik.imagekit.io/vinayak06/brandbasewhite-removebg-preview.png'
    },
    logoDark: {
        type: String,
        default: 'https://ik.imagekit.io/vinayak06/brandbaseNew1-removebg-preview.png?updatedAt=1764581531819'
    },
    services: [navCategorySchema],
    directLinkServices: [directLinkServiceSchema],
    mainLinks: [{
        label: String,
        path: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Navbar', navbarSchema);
