const Template = require("../models/templateModel");
const TemplateCategory = require("../models/templateCategoryModel");

async function createTemplate(req, res) {
  let name = req.body.template_name;
  let page_details = req.body.page_details;
  let category = req.body.template_category;
  let directory = req.body.directory;
  let index_file = req.body.directory + "/index.html";
  let thumbnail = req.body.thumbnail;
  const existingCategory = await TemplateCategory.findOne({ name: category });
  let categoryId;
  if (existingCategory) {
    categoryId = existingCategory._id;
  } else {
    const newCategory = await TemplateCategory.create({ name: category });
    categoryId = newCategory._id;
  }
  

  let data = {
    name: name,
    page_details: page_details,
    category: categoryId,
    thumbnail: thumbnail,
    directory: directory,
    index_file: index_file,
  };
  let template = await Template.create(data);
  res.send({"success": true});
}
async function getTemplateByID(req, res) {
    const _id = req.params.id;
    try {
      const template = await Template.findById(_id);
      if (!template) {
        return res.status(404).send({"success": false});
      }
      res.send(template);
    } catch (error) {
      console.error(error);
      res.status(500).send({"success": false});
    }
}
async function getAllTemplates(req, res) {
    try {
        const templates = await Template.find({});
        res.send(templates);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}
async function getAllTemplateCategories(req, res) {
    try {
        const templateCategories = await TemplateCategory.find({});
        res.send(templateCategories);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

module.exports = { createTemplate, getTemplateByID, getAllTemplates,getAllTemplateCategories };
