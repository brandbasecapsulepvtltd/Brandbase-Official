const Portfolio = require('../models/Portfolio');

// @desc    Get all portfolios
// @route   GET /api/portfolios
// @access  Public
exports.getPortfolios = async (req, res, next) => {
    try {
        const { category, isFeatured, sort } = req.query;

        // Build query
        const queryObj = {};
        if (category && category !== 'all') queryObj.category = category;
        if (isFeatured === 'true') queryObj.isFeatured = true;

        // Execute query
        let query = Portfolio.find(queryObj);

        // Sort
        if (sort) {
            if (sort === 'oldest') {
                query = query.sort('createdAt');
            } else if (sort === 'latest') {
                query = query.sort('-createdAt');
            } else if (sort === 'order') {
                query = query.sort('order');
            }
        } else {
            query = query.sort('-createdAt'); // Default sort
        }

        const portfolios = await query;

        res.status(200).json({
            success: true,
            count: portfolios.length,
            data: portfolios
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get single portfolio
// @route   GET /api/portfolios/:slug
// @access  Public
exports.getPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOne({ slug: req.params.slug });

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio item not found'
            });
        }

        res.status(200).json({
            success: true,
            data: portfolio
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create new portfolio
// @route   POST /api/portfolios
// @access  Private
exports.createPortfolio = async (req, res, next) => {
    try {
        // Generate slug from title if not provided (handled by pre-save hook, but good to be explicit if needed)

        const portfolio = await Portfolio.create(req.body);

        res.status(201).json({
            success: true,
            data: portfolio
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Portfolio with this title/slug already exists'
            });
        }
        // Validation error
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
exports.updatePortfolio = async (req, res, next) => {
    try {
        let portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio item not found'
            });
        }

        portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: portfolio
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
exports.deletePortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio item not found'
            });
        }

        await portfolio.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};
