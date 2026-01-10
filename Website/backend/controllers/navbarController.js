const Navbar = require('../models/Navbar');

// @desc    Get navbar data
// @route   GET /api/navbar
// @access  Public
exports.getNavbar = async (req, res) => {
    try {
        let navbar = await Navbar.findOne();
        if (!navbar) {
            return res.status(200).json({ success: true, data: {} });
        }
        res.status(200).json({ success: true, data: navbar });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update navbar data
// @route   POST /api/navbar
// @access  Private
exports.updateNavbar = async (req, res) => {
    try {
        let navbar = await Navbar.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: navbar });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
