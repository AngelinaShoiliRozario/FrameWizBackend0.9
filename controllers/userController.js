const userTemplateInfo = require("../models/userTemplateInfoModel");

const userSiteListView = async (req, res) => {
  let user_id = req.params.user_id;
  let template_id = req.params.template_id;

  try {
    let sites = await userTemplateInfo
      .find({ user_id: user_id})
      .exec();

    res.render("user-dashboard/site_list", {
      user_id: user_id,
      template_id: template_id,
      sites: sites ? sites : [],
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { userSiteListView };
