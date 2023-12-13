const express = require('express');
const  { createUserTemplateInformation, getUserTemplateInformationByID, getAllUserTemplateInformations } = require('../controllers/userTemplateInfoController');
const router = express.Router();



// Define your routes
router.post('/', createUserTemplateInformation); 
router.get('/all', getAllUserTemplateInformations); 
router.get('/:user_id/:template_id', getUserTemplateInformationByID); 


module.exports = router;
 