const Policy = require('../models/Policy');

exports.getPolicyByType = async (req, res) => {
    try {
        const { type } = req.params;
        const policy = await Policy.findOne({ type });

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: 'Policy not found'
            });
        }

        res.status(200).json({
            success: true,
            data: policy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updatePolicy = async (req, res) => {
    try {
        const { type } = req.params;
        const updateData = req.body;

        const policy = await Policy.findOneAndUpdate(
            { type },
            { ...updateData },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Policy updated successfully',
            data: policy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find();
        res.status(200).json({
            success: true,
            data: policies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
