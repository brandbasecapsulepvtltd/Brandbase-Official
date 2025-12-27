// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Admin = require('../models/Admin'); // adjust path as needed

const createAdmin = async () => {
  await mongoose.connect("mongodb+srv://vinayakandhere4:niUjtjP7piNusVwA@cluster0.vtovevf.mongodb.net/brandbase?retryWrites=true&w=majority&appName=Cluster0", {});

  const existing = await Admin.findOne({ email: 'vinayakandhere4@gmail.com' });
  if (existing) {
    console.log('Admin already exists');
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('VinayakBrandbase@2025', 10);

  const newAdmin = new Admin({
    name: 'Vinayak Andhere',
    email: 'vinayakandhere4@gmail.com',
    password: hashedPassword,
  });

  await newAdmin.save();
  console.log('✅ Admin account created!');
  process.exit(0);
};

createAdmin();
