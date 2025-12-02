const express = require('express');
const router = express.Router();
const {
  getHomePageData,
  createHomePageData,
  updateHomePageData,
  updateHomePageSection,
  deleteHomePageData
} = require('../controllers/homePageController');

router.route('/')
  .get(getHomePageData)
  .post(createHomePageData)
  .put(updateHomePageData)
  .delete(deleteHomePageData);

router.route('/section/:sectionName')
  .patch(updateHomePageSection);

module.exports = router;