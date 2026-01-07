const mongoose = require('mongoose');

const socialsSchema = new mongoose.Schema({
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String
});

const imageSchema = new mongoose.Schema({
    url: String,
    alt: String,
    captionTitle: String,
    captionText: String
});

const ctaSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    text: String,
    buttonText: String
});

const statsSchema = new mongoose.Schema({
    years: String,
    projectsDelivered: String,
    projects: String,
    satisfaction: String
});

const milestoneSchema = new mongoose.Schema({
    title: String,
    text: String,
    img: String
});

const principleItemSchema = new mongoose.Schema({
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
});

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        enum: ['hero', 'aboutSection', 'mission', 'vision', 'timeline', 'impact', 'principles']
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
sectionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Section', sectionSchema);