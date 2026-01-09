const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Event = require('./models/Event');

dotenv.config({ path: path.join(__dirname, '.env') });

const verifyFix = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Simulate what the controller does:
        const aggregation = await Event.aggregate([
            {
                $project: {
                    idNumber: { $toInt: "$id" }
                }
            },
            {
                $sort: { idNumber: -1 }
            },
            {
                $limit: 1
            }
        ]);
        const lastId = aggregation.length > 0 ? aggregation[0].idNumber : 0;
        const nextId = (lastId + 1).toString();
        console.log('Next generated ID should be:', nextId);

        if (nextId === '11') {
            console.log('✅ Fix verified: ID 11 correctly generated (ID 10 exists).');

            // Actually try to create a dummy event to be 100% sure
            const dummyEvent = new Event({
                id: nextId,
                name: "Verification Test Event",
                startDate: new Date(),
                endDate: new Date(),
                venue: "Test Venue",
                city: "Test City",
                organizer: "Test Organizer",
                organizerWebsite: "https://test.com",
                industry: "tech",
                isIndoor: true,
                expectedFootfall: 100,
                stallSizes: ["9x9"],
                description: "Test Description",
                whyParticipate: "Test Why"
            });

            await dummyEvent.save();
            console.log('✅ Dummy event saved successfully with ID 11.');

            // Cleanup
            await Event.deleteOne({ id: '11' });
            console.log('✅ Dummy event deleted.');
        } else {
            console.log('❌ Fix failed: Expected ID 11 but got', nextId);
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

verifyFix();
