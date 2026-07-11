const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const connectDB = require('../config/database');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Create or update admin
        const adminData = {
            name: 'Main Admin',
            email: 'info@brandbasecapsule.com',
            password: 'bcpl2030' // This will be hashed by the pre-save hook
        };

        const existingAdmin = await Admin.findOne({ email: adminData.email });
        if (existingAdmin) {
            existingAdmin.password = adminData.password;
            await existingAdmin.save();
            console.log('✅ Admin user updated successfully');
        } else {
            const admin = new Admin(adminData);
            await admin.save();
            console.log('✅ Admin user created successfully');
        }

        console.log('Email: ' + adminData.email);
        console.log('Password: ' + adminData.password);

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
