const express = require('express');
const { createTemplate , getTemplateByID, getAllTemplates , getAllTemplateCategories} = require('../controllers/templateController');
const router = express.Router();



// Define your routes
router.post('/', createTemplate); 
router.get('/all', getAllTemplates); 
router.get('/categories', getAllTemplateCategories); 
router.get('/:id', getTemplateByID); 


module.exports = router;
 