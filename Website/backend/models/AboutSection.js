const mongoose = require('mongoose');

// Sub-schemas for nested objects
const socialsSchema = new mongoose.Schema({
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String
}, { _id: false });

const imageSchema = new mongoose.Schema({
    url: String,
    alt: String,
    captionTitle: String,
    captionText: String
}, { _id: false });

const ctaSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    text: String,
    buttonText: String
}, { _id: false });

const statsSchema = new mongoose.Schema({
    years: String,
    projectsDelivered: String,
    projects: String,
    satisfaction: String
}, { _id: false });

const milestoneSchema = new mongoose.Schema({
    title: String,
    text: String,
    img: String
}, { _id: false });

const principleItemSchema = new mongoose.Schema({
    id: Number,
    do: {
        title: String,
        text: String,
        src: String
    },
    dont: {
        title: String,
        text: String,
        src: String
    }
}, { _id: false });

// Main AboutContent schema - single document containing all sections
const aboutContentSchema = new mongoose.Schema({
    // Identifier to ensure only one document exists
    identifier: {
        type: String,
        default: 'about-content',
        unique: true,
        immutable: true
    },
    hero: {
        title: String,
        heading: String,
        highlighted: String,
        description: String
    },
    aboutSection: {
        socials: socialsSchema,
        image: String,
        stats: statsSchema,
        title: String,
        description1: String,
        description2: String,
        cta: ctaSchema
    },
    mission: {
        title: String,
        subheading: String,
        description: String,
        highlight: String,
        points: [String],
        image: imageSchema
    },
    vision: {
        title: String,
        subheading: String,
        description: String,
        points: [String],
        image: imageSchema
    },
    timeline: {
        title: String,
        subtitle: String,
        description: String,
        milestones: {
            type: Map,
            of: milestoneSchema
        }
    },
    impact: {
        title: String,
        description: String,
        subheading: String,
        body: String,
        stats: [String],
        tagline: String
    },
    principles: {
        title: String,
        subtitle: String,
        items: [principleItemSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
aboutContentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Also update on findOneAndUpdate
aboutContentSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('AboutContent', aboutContentSchema);