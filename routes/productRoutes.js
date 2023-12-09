const express = require('express');
const { productCategory,addProductView,orderListView, productListView,createProduct,getProductByUserId_TemplateId } = require('../controllers/productController');
const router = express.Router();
const uploadIMG = require('../config/img_up_multer');

const destinationPath = "./public/images/user_product_images/"; // Set your desired destination path
const upload = uploadIMG(destinationPath);


// Define your routes
router.get('/:user_id/:template_id/add_product', addProductView); 
router.get('/:user_id/:template_id/all_products', getProductByUserId_TemplateId); 

router.post('/:user_id/:template_id/post_product', upload.fields([
  { name: 'primary_image', maxCount: 1 },
  { name: 'secondary_images', maxCount: 5 } 
]), createProduct); 

router.get('/:user_id/:template_id/product_category', productCategory);

router.get('/:user_id/:template_id/order_list', orderListView); 
router.get('/:user_id/:template_id/product_list', productListView); 

router.get('/:user_id/:template_id/edit_product/:product_id', editProductView);  
router.post('/:user_id/:template_id/edit_product/:product_id',upload.fields([ 
  { name: 'primary_image', maxCount: 1 }, 
  { name: 'secondary_images', maxCount: 5 }  
]), postEditProduct);


module.exports = router;
 