const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const connectDB = require('../config/database');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Clear existing admins (optional, but good for consistent seed)
        await Admin.deleteMany({ email: 'wayne5403n@gmail.com' });

        const admin = new Admin({
            name: 'Wayne Admin',
            email: 'wayne5403n@gmail.com',
            password: 'vinayak5403' // This will be hashed by the pre-save hook
        });

        await admin.save();

        console.log('✅ Admin user seeded successfully');
        console.log('Email: wayne5403n@gmail.com');
        console.log('Password: vinayak5403');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
