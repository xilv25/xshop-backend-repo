// routes/templates.js
const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController'); // Path ini benar

router.get('/', templateController.getAllTemplates);
router.get('/:id', templateController.getTemplateById);
router.post('/', templateController.createTemplate);

module.exports = router;