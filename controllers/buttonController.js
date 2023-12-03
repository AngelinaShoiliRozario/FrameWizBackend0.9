const ButtonModel = require("../models/buttonModel");
const ButtonCategory = require("../models/buttonCategoryModel");

async function getAddBtnView(req, res) {
  try {
    const btns = await ButtonModel.find();
    const btnCategories = await ButtonCategory.find();
    const success_msg = req.flash('success');
    console.log(btnCategories);
    res.render("upload_btn", { title: "Upload Button Content", buttons: btns,categories : btnCategories,success_msg:success_msg });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal server error");
  }
}

// Function to get all products
async function getAllButtons(req, res) {
  try {
    const btns = await ButtonModel.find();
    res.status(200).json(btns);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to create a new product
async function createButton(req, res) {
  try {
    const btnCategory = req.body.btn_category;
    const btnCode = req.body.btn_code;
    const status = req.body.status;
    let buttonCategory;
    const existingButtonCategory = await ButtonCategory.findOne({
      
      name: btnCategory 
    });
    if (existingButtonCategory) {
    }else{
      buttonCategory = await ButtonCategory.create({ name: btnCategory });
    }
    const button =await ButtonModel.create({
      category: existingButtonCategory.id ? existingButtonCategory.id : buttonCategory.id ,
      code: btnCode,
      status: status=="on" ? 1 : 0,
    });
    const referer = req.header("Referer"); // Get the referer URL from the request header
    // console.log(referer);
    if (referer) {
      req.flash("success", "successfully saved the button to the database");
      res.redirect("/buttons/"); // Redirect to the referer URL
    } else {
      res.redirect("/"); // If no referer is found, redirect to the root page or a default URL
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message});
  }
}


async function updateButton(req, res, next) {
  let id = req.params.id;
  const btn = await ButtonModel.findById({_id:id});
  res.render('edit_btn',{'btn':btn});
}

module.exports = { getAllButtons, createButton, getAddBtnView,updateButton };

// function createButton(req, res) {
//   try {
//     const btnCategory = req.body.btn_category;
//     const btnCode = req.body.btn_code;
//     const status = req.body.status;

//     const btnImage = req.file;

//     if (btnImage) {
//       const { filename, path } = btnImage;
//       const imageUrl = `/images/buttons/${filename}`; // URL where the image can be accessed
//       // Save the image URL to the database
//       const button = ButtonModel.create({
//         category: btnCategory,
//         code: btnCode,
//         status: 1,
//         btn_img_url: imageUrl, // Store the image URL in the database
//       });
//       const referer = req.header('Referer'); // Get the referer URL from the request header
//       if (referer) {
//         res.redirect('/buttons/'); // Redirect to the referer URL
//       } else {
//         res.redirect('/'); // If no referer is found, redirect to the root page or a default URL
//       }

//     } else {
//       // No image was uploaded
//       console.log("No image uploaded.");
//       res.status(400).json({ error: "No image uploaded" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
