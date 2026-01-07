const Section = require('../models/AboutSection');

// Get all sections
exports.getAllSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json({
            success: true,
            count: sections.length,
            data: sections
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single section by ID
exports.getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                error: 'Section not found'
            });
        }

        res.status(200).json({
            success: true,
            data: section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get section by name
exports.getSectionByName = async (req, res) => {
    try {
        const section = await Section.findOne({ sectionName: req.params.name });

        if (!section) {
            return res.status(404).json({
                success: false,
                error: 'Section not found'
            });
        }

        res.status(200).json({
            success: true,
            data: section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new section
exports.createSection = async (req, res) => {
    try {
        const section = await Section.create(req.body);

        res.status(201).json({
            success: true,
            data: section
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// Update section
exports.updateSection = async (req, res) => {
    try {
        let section = await Section.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                error: 'Section not found'
            });
        }

        section = await Section.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: section
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// Update section by name
exports.updateSectionByName = async (req, res) => {
    try {
        const section = await Section.findOneAndUpdate(
            { sectionName: req.params.name },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!section) {
            return res.status(404).json({
                success: false,
                error: 'Section not found'
            });
        }

        res.status(200).json({
            success: true,
            data: section
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// Delete section
exports.deleteSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                error: 'Section not found'
            });
        }

        await section.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete section by name
exports.deleteSectionByName = async (req, res) => {
    try {
        const section = await Section.findOne({ sectionName: req.params.name });

        if (!section) {
            return res.status(404).json({
                success: false,
                error: 'Section not found'
            });
        }

        await section.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get all section names
exports.getAllSectionNames = async (req, res) => {
    try {
        const sections = await Section.find().select('sectionName -_id');
        const sectionNames = sections.map(section => section.sectionName);

        res.status(200).json({
            success: true,
            count: sectionNames.length,
            data: sectionNames
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};