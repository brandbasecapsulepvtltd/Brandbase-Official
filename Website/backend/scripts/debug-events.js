const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('../models/Event');

async function checkEvents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const events = await Event.find({});
        console.log(`Found ${events.length} events.`);

        events.forEach(e => {
            console.log(`\nEvent: ${e.name}`);
            const config = e.blogConfiguration;
            console.log(`Enabled: ${config.enabled}`);
            console.log(`Start Date: ${config.generationStartDate}`);
            console.log(`End Date: ${config.generationEndDate}`);
            console.log(`Posts/Day: ${config.postsPerDay}`);
            console.log(`Last Generated: ${config.lastGeneratedDate}`);
            console.log(`Keywords: ${config.keywords}`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkEvents();
