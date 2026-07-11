const BlogScheduler = require('./BlogScheduler');

/**
 * Initializes the AI Blog Scheduler background tasks.
 */
const initScheduler = () => {
    console.log('--- Initializing AI Blog Scheduler ---');

    // Initial run after a short delay (to let server stabilize)
    setTimeout(() => {
        console.log('--- Running Initial Blog Scheduler Cycle ---');
        BlogScheduler.run().catch(err => {
            console.error('Error in initial BlogScheduler run:', err);
        });
    }, 15000); // 15 seconds after startup

    // Periodic run every 1 hour
    setInterval(() => {
        console.log('--- Running Periodic Blog Scheduler Cycle ---');
        BlogScheduler.run().catch(err => {
            console.error('Error in periodic BlogScheduler run:', err);
        });
    }, 3600000); // 1 hour
};

module.exports = { initScheduler };
