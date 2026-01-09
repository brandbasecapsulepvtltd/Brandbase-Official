const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Event = require('./models/Event');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkIds = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const events = await Event.find({}, { id: 1, name: 1 }).sort({ id: 1 });
        console.log('Existing Event IDs:');
        events.forEach(e => console.log(`ID: ${e.id}, Name: ${e.name}`));

        const lastEventByStringSort = await Event.findOne().sort({ id: -1 });
        console.log('\nLast Event by String Sort (-1):', lastEventByStringSort ? lastEventByStringSort.id : 'None');

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkIds();
