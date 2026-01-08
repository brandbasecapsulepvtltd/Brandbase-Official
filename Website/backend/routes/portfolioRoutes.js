const express = require('express');
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} = require('../controllers/portfolioController');

const router = express.Router();

router
    .route('/')
    .get(getPortfolios)
    .post(createPortfolio);

router
    .route('/:slug') // Note: public fetch by slug
    .get(getPortfolio);

router
    .route('/:id') // Note: admin operations by ID
    .put(updatePortfolio)
    .delete(deletePortfolio);

module.exports = router;
