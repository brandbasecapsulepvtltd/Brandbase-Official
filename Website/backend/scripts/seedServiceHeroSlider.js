const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ServiceCategory = require('../models/ServiceCategory');
const connectDB = require('../config/database');

// Load env vars
dotenv.config(); // Default looks in CWD, which is correct (backend root)

const seedHeroSlider = async () => {
    try {
        await connectDB();
        console.log('MongoDB Connected...');

        const categories = await ServiceCategory.find({});
        console.log(`Found ${categories.length} categories.`);

        for (const category of categories) {
            console.log(`Processing category: ${category.category}`);

            const subServices = category.categoryServices?.services || [];
            const slides = [];

            if (subServices.length > 0) {
                subServices.forEach(service => {
                    slides.push({
                        img: service.image || 'https://via.placeholder.com/1920x1080', // Fallback
                        text: [service.title.toUpperCase()], // Wrap title in array as per schema
                        link: service.link || '#',
                        buttonText: 'Learn More' // Default button text
                    });
                });
            } else {
                // Fallback default slides if no sub-services
                slides.push({
                    img: "https://cdn.cosmos.so/8b0252bd-cb64-45f4-aef8-672c7f628f76?format=jpeg",
                    text: ["BETWEEN SHADOW", "AND LIGHT"],
                    link: "/services/av-production",
                    buttonText: "Discover More"
                });
            }

            category.heroSlider = { slides };
            await category.save();
            console.log(`Updated heroSlider for ${category.category} with ${slides.length} slides.`);
        }

        console.log('Seeding completed.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedHeroSlider();
