const Footer = require('../models/Footer');

// @desc    Get footer data
// @route   GET /api/footer
// @access  Public
exports.getFooter = async (req, res) => {
    try {
        let footer = await Footer.findOne();
        if (!footer) {
            return res.status(200).json({ success: true, data: {} });
        }
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update footer data
// @route   POST /api/footer
// @access  Private
exports.updateFooter = async (req, res) => {
    try {
        let footer = await Footer.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: footer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
