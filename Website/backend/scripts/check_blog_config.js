const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/database');
const Event = require('../models/Event');

async function checkData() {
    try {
        await connectDB();
        console.log('Connected to DB');

        const enabledEvents = await Event.find({
            'blogConfiguration.enabled': true
        });

        console.log(`Found ${enabledEvents.length} enabled events.`);

        for (const event of enabledEvents) {
            console.log('\n--- Event:', event.name, '---');
            console.log('ID:', event.id);
            console.log('End Date:', event.endDate);
            console.log('Blog Config:', JSON.stringify(event.blogConfiguration, null, 2));

            const today = new Date();
            const config = event.blogConfiguration;
            const endDate = config.generationEndDate ? new Date(config.generationEndDate) : new Date(event.endDate);

            console.log('Check - End Date < Today:', endDate < today);

            if (config.scheduledBlogs) {
                for (const blog of config.scheduledBlogs) {
                    console.log(`Blog ${blog.category}: publishDate=${blog.publishDate}, isGenerated=${blog.isGenerated}`);
                    if (blog.publishDate) {
                        console.log(`  new Date(blog.publishDate) <= today: ${new Date(blog.publishDate) <= today}`);
                    }
                }
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Check failed:', error);
        process.exit(1);
    }
}

checkData();
