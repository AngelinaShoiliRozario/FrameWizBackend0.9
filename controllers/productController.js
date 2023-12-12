const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const addProductView = async (req, res) => {
  let user_id = req.params.user_id;
  let template_id = req.params.template_id;
  const category_table = `product_category_table_of_user_${user_id}_template_${template_id}`;

  const collection1 = mongoose.connection.collection(category_table);

  const categories = await collection1.find({
    user_id: user_id,
    template_id: template_id,
  });
  const arr = await categories.toArray();

  const success_msg = req.flash("success");

  res.render("product/add_product", {
    user_id: user_id,
    template_id: template_id,
    success_msg: success_msg,
    categories: arr,
  });
};
const createProduct = async (req, res) => {
  // Access the primary image
  const primaryImage = req.files["primary_image"][0];
  const primaryImagePath = primaryImage.path
    .replace(/\\/g, "/")
    .replace("public", "");

  // Access the secondary images
  const secondaryImages = req.files["secondary_images"];
  const secondaryImagePaths = secondaryImages.map((image) =>
    image.path.replace(/\\/g, "/").replace("public", "")
  );

  // Log or use the paths as needed
  // console.log("Primary Image Path:", primaryImagePath);
  // console.log("Secondary Image Paths:", secondaryImagePaths);
  let { user_id, template_id } = req.params;
  let {
    product_name,
    product_category,
    buying_price,
    selling_price,
    discount,
    discount_expire_date,
    varient_labels,
    quantitys,
    product_description,
    product_additional_information,
    attributes_title,
    attribute_value,
  } = req.body;

  let varient_combinations = req.body.varient_combinations
    ? JSON.parse(req.body.varient_combinations)
    : "";
  let attributes = [];
  for (let i = 0; i < attributes_title.length; i++) {
    if (attributes_title[i] != "" && attribute_value[i] != "") {
      let da = [attributes_title[i], attribute_value[i]];
      attributes.push(da);
    }
  }
  const category_table = `product_category_table_of_user_${user_id}_template_${template_id}`;
  const product_table = `product_table_of_user_${user_id}_template_${template_id}`;

  const collection1 = mongoose.connection.collection(category_table);
  const collection2 = mongoose.connection.collection(product_table);

  console.log("template: " + template_id + "user_id: " + user_id);
  const existingCategory = await collection1.findOne({
    user_id: user_id,
    name: product_category,
    template_id: template_id,
  });
  console.log("existing category present", existingCategory);

  let categoryId;
  if (existingCategory != null) {
    categoryId = existingCategory._id;
  } else {
    const cate_data = {
      name: product_category,
      user_id: user_id,
      template_id: template_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    let category_n = await collection1.insertOne(cate_data);
    console.log("new category newly created");
    categoryId = category_n.insertedId;
  }

  let data = {
    user_id: user_id,
    template_id: template_id,
    product_name: product_name,
    category_id: categoryId,
    buying_price: buying_price,
    selling_price: selling_price,
    discount: discount,
    discount_expire_date: discount_expire_date,
    varient_labels: varient_labels,
    varient_combinations: varient_combinations,
    quantitys: quantitys,
    product_description: product_description,
    product_additional_information: product_additional_information,
    attributes: attributes,
    primary_image: primaryImagePath,
    secondary_images: secondaryImagePaths,
  };

  const product = await collection2.insertOne(data);
  req.flash("success", "successfully saved the Product to the database");
  res.redirect(`/inventory/${user_id}/${template_id}/add_product`);
};
const productCategory = (req, res) => {
  const user_id = req.params.user_id;
  const template_id = req.params.template_id;
  res.render("product/product_category", {
    user_id: user_id,
    template_id: template_id,
  });
};
const orderListView = (req, res) => {
  let user_id = req.params.user_id;
  let template_id = req.params.template_id;
  res.render("product/order_list", {
    user_id: user_id,
    template_id: template_id,
  });
};
const productListView = async (req, res) => {
  let user_id = req.params.user_id;
  let template_id = req.params.template_id;

  const product_table = `product_table_of_user_${user_id}_template_${template_id}`;
  const collection2 = mongoose.connection.collection(product_table);
  let products = await collection2.find();
  products = await products.toArray();
  res.render("product/product_list", {
    user_id: user_id,
    template_id: template_id,
    products: products,
  });
};
const getProductByUserId_TemplateId = async (req, res) => {
  const userId = req.params.user_id;
  const templateId = req.params.template_id;
  const product_table = `product_table_of_user_${userId}_template_${templateId}`;
  const collection1 = await mongoose.connection.collection(product_table);
  const result = await collection1.find({
    user_id: userId,
    template_id: templateId,
  });
  const products = await result.toArray();
  res.send(products);
};

// Edit single product
const editProductView = async (req, res) => {
  let user_id = req.params.user_id;
  let template_id = req.params.template_id;
  let product_id = req.params.product_id;
  const category_table = `product_category_table_of_user_${user_id}_template_${template_id}`;
  const product_table = `product_table_of_user_${user_id}_template_${template_id}`;
  const collection1 = mongoose.connection.collection(category_table);
  const collection2 = mongoose.connection.collection(product_table);
  let categories = await collection1.find({
    user_id: user_id,
    template_id: template_id,
  });
  categories = await categories.toArray();
  const product = await collection2.findOne({
    _id: new ObjectId(product_id),
  });

  res.render("product/edit_product", {
    user_id,
    template_id,
    product_id,
    categories,
    product,
  });
};
// Post Edited product
const postEditProduct = async (req, res) => {
  let user_id = req.params.user_id;
  let template_id = req.params.template_id;
  let product_id = req.params.product_id;

  const category_table = `product_category_table_of_user_${user_id}_template_${template_id}`;
  const product_table = `product_table_of_user_${user_id}_template_${template_id}`;

  const collection1 = mongoose.connection.collection(category_table);
  const collection2 = mongoose.connection.collection(product_table);
  const product = await collection2.findOne({
    _id: new ObjectId(product_id),
  });

  let primaryImagePath;
  if (req.files["primary_image"] != undefined) {
    const primaryImage = req.files["primary_image"][0];
    primaryImagePath = primaryImage.path
      .replace(/\\/g, "/")
      .replace("public", "");
  } else {
    primaryImagePath = product.primary_image;
  }
  let secondaryImagePaths = [];
  const storeImgUrl = req.body.storeImgUrl;
  if (req.files["secondary_images"] != undefined || storeImgUrl != undefined) {
    const secondaryImages = req.files["secondary_images"];

    if (secondaryImages) {
      secondaryImagePaths = secondaryImages.map((image) =>
        image.path.replace(/\\/g, "/").replace("public", "")
      );
    }
    if (storeImgUrl) {
      let imageUrlArray = JSON.parse(storeImgUrl);
      let filteredArr_2 = product.secondary_images.filter(
        (item) => !imageUrlArray.includes(item)
      );
      for (let i = 0; i < filteredArr_2.length; i++) {
        secondaryImagePaths.push(filteredArr_2[i]);
      }
    }
  } else {
    secondaryImagePaths = product.secondary_images;
  }

  let {
    product_name,
    product_category,
    buying_price,
    selling_price,
    discount,
    discount_expire_date,
    varient_labels,
    quantitys,
    product_description,
    product_additional_information,
    attributes_title,
    attribute_value,
  } = req.body;

  if (varient_labels == undefined) {
    varient_labels = product.varient_labels;
  }
  let varient_combinations = req.body.varient_combinations;
  if(varient_combinations == ""){
    varient_combinations = product.varient_combinations;
  }else{
    varient_combinations = JSON.parse(varient_combinations);
  }

  let attributes = [];
  for (let i = 0; i < attributes_title.length; i++) {
    if (attributes_title[i] != "" && attribute_value[i] != "") {
      let da = [attributes_title[i], attribute_value[i]];
      attributes.push(da);
    }
  }

  const existingCategory = await collection1.findOne({
    user_id: user_id,
    name: product_category,
    template_id: template_id,
  });

  let categoryId;
  if (existingCategory != null) {
    categoryId = existingCategory._id;
  } else {
    const cate_data = {
      name: product_category,
      user_id: user_id,
      template_id: template_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    let category_n = await collection1.insertOne(cate_data);
    console.log("new category newly created");
    categoryId = category_n.insertedId;
  }
  let data = {
    user_id: user_id,
    template_id: template_id,
    product_name: product_name,
    category_id: categoryId,
    buying_price: buying_price,
    selling_price: selling_price,
    discount: discount,
    discount_expire_date: discount_expire_date,
    varient_labels: varient_labels,
    varient_combinations: varient_combinations,
    quantitys: quantitys,
    product_description: product_description,
    product_additional_information: product_additional_information,
    attributes: attributes,
    primary_image: primaryImagePath,
    secondary_images: secondaryImagePaths,
  };
  console.log("data", data);

  const objectId = new ObjectId(product_id);

  const result = await collection2.updateOne({ _id: objectId }, { $set: data });

  console.log("result = ", result.acknowledged);
  if (result.acknowledged == true) {
    res.redirect(`/inventory/${user_id}/${template_id}/product_list`);
  }
};

// delete service method
const deleteProduct = async (req, res) => {
  const { user_id, template_id, product_id } = req.params;

  const productObjectId = new ObjectId(product_id);


  let product_collection = `product_table_of_user_${user_id}_template_${template_id}`;
  const product_table = mongoose.connection.collection(product_collection);

  let delete_one_record_from_productTable = await product_table.deleteOne({ _id: serviceObjectId });

  try {

    if (delete_one_record_from_productTable.deletedCount === 1) {
    
      res.redirect(`../product_list`);

    }
    else {
      console.log('Not Deleted');

    }
  }

  catch (err) {
    console.log(err);

  }
}


module.exports = {
  addProductView,
  orderListView,
  productListView,
  createProduct,
  getProductByUserId_TemplateId,
  productCategory,
  editProductView,
  postEditProduct,
  deleteProduct
};
