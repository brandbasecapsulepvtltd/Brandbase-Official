const FloatingLatest = require('../models/FloatingLatest');

// @desc    Get floating latest data
// @route   GET /api/floatinglatest
// @access  Public
exports.getFloatingLatest = async (req, res) => {
    try {
        let floatingLatest = await FloatingLatest.findOne();
        if (!floatingLatest) {
            return res.status(200).json({ success: true, data: {} });
        }
        res.status(200).json({ success: true, data: floatingLatest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update floating latest data
// @route   POST /api/floatinglatest
// @access  Private
exports.updateFloatingLatest = async (req, res) => {
    try {
        let floatingLatest = await FloatingLatest.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: floatingLatest });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
