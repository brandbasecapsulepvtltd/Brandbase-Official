const TopBar = require('../models/TopBar');

// @desc    Get top bar data
// @route   GET /api/topbar
// @access  Public
exports.getTopBar = async (req, res) => {
    try {
        let topBar = await TopBar.findOne();
        if (!topBar) {
            // Return default or empty if not found, or seed it
            return res.status(200).json({ success: true, data: {} });
        }
        res.status(200).json({ success: true, data: topBar });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update top bar data
// @route   POST /api/topbar
// @access  Private
exports.updateTopBar = async (req, res) => {
    try {
        let topBar = await TopBar.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: topBar });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
