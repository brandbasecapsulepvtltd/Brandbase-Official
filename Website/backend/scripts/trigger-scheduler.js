const mongoose = require('mongoose');
require('dotenv').config();
const BlogScheduler = require('../services/BlogScheduler');

async function debugScheduler() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        console.log("--- Triggering Scheduler ---");
        await BlogScheduler.run();
        console.log("--- Scheduler Run Complete ---");

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

debugScheduler();
