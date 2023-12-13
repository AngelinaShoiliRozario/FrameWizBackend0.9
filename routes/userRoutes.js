const express = require('express');
const router = express.Router();
const { userSiteListView } = require('../controllers/userController');



// Define your routes
router.get('/sitelist/:user_id/:template_id', userSiteListView); 



module.exports = router;
 