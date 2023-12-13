const Template = require("../models/templateModel");
const userTemplateInfoModel = require("../models/userTemplateInfoModel");

async function createUserTemplateInformation(req, res) {

  let user_id = req.body.user_id;
  let template_id = req.body.template_id;
  let index_file = req.body.index_file;
  let directory = req.body.directory;
  let pages = req.body.pages;
  let template_name = req.body.template_name;
  let template_category_id = req.body.template_category_id;
  let thumbnail = req.body.thumbnail;


  let data = {
    user_id: user_id,
    pages: pages,
    directory: directory,
    template_id: template_id,
    index_file: index_file,
    template_name: template_name,
    template_category_id: template_category_id,
    thumbnail: thumbnail,
  };
  console.log(data);

  try {
    const result = await userTemplateInfoModel.findOne({
      user_id,
      template_id,
    });

    if (result) {
      console.log("Document found:", result);
      console.log("need to redirect to the route only");
    } else {
      console.log("No document found for user_id and template_id.");
      const newDocument = await userTemplateInfoModel.create(data);
      console.log("New document created:", newDocument);
    }
    const redirectUrl = `https://phpstack-858192-4120901.cloudwaysapps.com/basic_client_editor.html?userId=${user_id}&templateId=${template_id}&media=${directory}`;

   
    res.send({success: true, redirectUrl: redirectUrl });
    

  } catch (error) {
    res.send({success: false, redirectUrl: null });
    console.error("Error while querying MongoDB:", error.message);
    throw error;
  }
}
async function getUserTemplateInformationByID(req, res) {
  const user_id = req.params.user_id;
  const template_id = req.params.template_id;
  try {
    const userTemplate = await userTemplateInfoModel.find({user_id,template_id});
    if (!userTemplate) {
      return res.status(404).send({"success": false});
    }
    res.send(userTemplate);
  } catch (error) {
    console.error(error);
    res.status(500).send({"success": false});
  }
}
async function getAllUserTemplateInformations(req, res) {
  try {
      const templates = await userTemplateInfoModel.find({});
      res.send(templates);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = {
  createUserTemplateInformation,
  getUserTemplateInformationByID,
  getAllUserTemplateInformations,
};
