const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    hero: {
        tagline: String,
        title: String,
        description: String,
        ctaText: String,
        videoUrl: String,
        cardImage: String,
        images: [String]
    },
    bento: {
        mainHeading: String,
        cards: {
            conceptToReality: {
                title: String,
                imageAlt: String,
                imageUrl: String
            },
            projectsDelivered: {
                count: String,
                label: String
            },
            amazingWork: {
                title: String,
                structureImage: String,
                structureAlt: String
            },
            showcaseStall: {
                imageUrl: String,
                alt: String,
                location: String
            },
            citiesReach: {
                count: String,
                label: String
            }
        },
        services: [String]
    },
    clientPortfolio: [{
        // id: Number (we can use _id)
        imagePosition: { type: String, default: 'right' }, // 'left' or 'right'
        logo: String,
        companyName: String,
        industry: String,
        projectTitle: String,
        projectDescription: String,
        servicesProvided: [String],
        results: [{
            value: String,
            label: String
        }],
        mediaItems: [{
            type: { type: String, enum: ['image', 'video'] },
            url: String,
            alt: String,
            title: String,
            thumbnail: String
        }],
        testimonial: {
            clientImage: String,
            clientName: String,
            position: String,
            quote: String
        }
    }],
    testimonials: {
        sectionTitle: String,
        sectionDescription: String,
        testimonials: [{
            text: String,
            image: String,
            name: String,
            role: String
        }]
    },
    faqs: {
        sectionTitle: String,
        faqs: [{
            question: String,
            answer: String
        }]
    },
    gallery: [String], // Array of image URLs for the kinetic scroll gallery
    metadata: {
        title: String,
        description: String,
        keywords: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
