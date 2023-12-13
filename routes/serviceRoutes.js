const express = require('express');
const { addServiceView,serviceListView,appointmentListView,createService,getAllServicesByCategory, edit_service, postEditService, deleteService } = require('../controllers/serviceController');
const router = express.Router();
const uploadIMG = require('../config/img_up_multer');
const destinationPath = "./public/images/service_images/"; // Set your desired destination path
const upload = uploadIMG(destinationPath);


// Define your routes
router.get('/:user_id/:template_id', addServiceView); 
router.post('/:user_id/:template_id', upload.any([
    { name: 'primary_image', maxCount: 1 },
    { name: 'secondary_images', maxCount: 5 } 
  ]),  createService); 
router.get('/:user_id/:template_id/service_list', serviceListView); 
router.get('/api/:user_id/:template_id/service_by_category', getAllServicesByCategory); 
router.get('/:user_id/:template_id/appointment_list', appointmentListView); 

// edit delete service route
router.get('/:user_id/:template_id/edit_service/:service_id', edit_service);
router.post('/:user_id/:template_id/post_edit_service/:service_id', upload.any([
  { name: 'primary_image', maxCount: 1 },
  { name: 'secondary_images', maxCount: 5 }
]), postEditService);

router.get('/:user_id/:template_id/delete_service/:service_id', deleteService);

module.exports = router;
 