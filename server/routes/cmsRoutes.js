const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');

router.get('/landing', cmsController.getLandingContent);
router.put('/landing', cmsController.updateLandingContent);

module.exports = router;
