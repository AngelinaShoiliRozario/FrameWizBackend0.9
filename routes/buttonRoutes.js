const express = require('express');
const router = express.Router();
const {getAddBtnView, getAllButtons, createButton,updateButton} = require('../controllers/buttonController');
const uploadIMG = require('../config/img_up_multer');


const btn_upload_dest = uploadIMG('./public/images/buttons');

// Define your routes
router.get('/', getAddBtnView); // GET all products
router.get('/edit/:id', updateButton); // GET all products
router.get('/all', getAllButtons); // GET all products
// router.post('/post',btn_upload_dest.single('btn_img'), createButton); // POST a new product
router.post('/post', createButton); // POST a new product

module.exports = router;
 