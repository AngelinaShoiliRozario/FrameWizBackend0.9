const mongoose = require("mongoose");
const addServiceView = (req, res) => {
  const user_id = req.params.user_id;
  const template_id = req.params.template_id;
  const success_msg = req.flash("success");

  res.render("service/add_service", { user_id, template_id, success_msg });
};
const createService = async (req, res) => {
  let service_name = req.body["service_name"];
  let service_description = req.body["service_description"];
  let service_price = req.body["service_price"];
  let service_days = req.body["service_days"];
  let service_times = req.body["service_times"];
  // console.log("service date : ", service_days);
  // console.log("service date : ", service_times);

  const last_day_arr = JSON.parse(service_days).map((outerArray) => {
    return outerArray.filter((innerArray) => {
      return innerArray.some((element) => element !== null);
    });
  });
  const last_time_arr = JSON.parse(service_times).map((outerArray) => {
    return outerArray.filter((innerArray) => {
      return innerArray.some((element) => element !== null);
    });
  });

  let service_category = req.body["service_category"];
  const { user_id, template_id } = req.params;

  const service_table = `services_of_user_${user_id}_template_${template_id}`;
  const category_table = `services_category_of_user_${user_id}_template_${template_id}`;

  const collection1 = mongoose.connection.collection(service_table);
  const cate_collection = mongoose.connection.collection(category_table);

  for (let i = 0; i < service_name.length; i++) {
    const primaryImage = req.files.filter(
      (file) => file.fieldname === `primary_image[${i}]`
    );
    const secondaryImages = req.files.filter(
      (file) => file.fieldname === `secondary_images[${i}]`
    );
    let primaryImagePath;

    if (primaryImage) {
      primaryImagePath = primaryImage.map((image) =>
        image.path.replace(/\\/g, "/").replace("public", "")
      );
    }
    let secondaryImagePaths;
    if (secondaryImages) {
      secondaryImagePaths = secondaryImages.map((image) =>
        image.path.replace(/\\/g, "/").replace("public", "")
      );
    }

    const existingCategory = await cate_collection.findOne({
      name: service_category[i],
      template_id: template_id,
      user_id: user_id,
    });
    let serviceCategoryId;
    if (existingCategory != null) {
      console.log("existing service category present");
      serviceCategoryId = existingCategory._id;
    } else {
      const cate_data = {
        name: service_category[i],
        user_id: user_id,
        template_id: template_id,
        created_at: new Date(),
        updated_at: new Date(),
      };
      let category_n = await cate_collection.insertOne(cate_data);
      serviceCategoryId = category_n.insertedId;
    }
    let data = {
      user_id: user_id,
      template_id: template_id,
      primary_image: primaryImagePath,
      secondary_images: secondaryImagePaths ? secondaryImagePaths : [],
      name: service_name[i],
      price: service_price[i],
      description: service_description[i],
      service_days: last_day_arr[i],
      service_times: last_time_arr[i],
      service_category_id: serviceCategoryId,
    };
    const service = await collection1.insertOne(data);
  }
  req.flash("success", "successfully saved the Service to the database");
  res.redirect(`/service/${user_id}/${template_id}`);
};
const serviceListView = async (req, res) => {
  const user_id = req.params.user_id;
  const template_id = req.params.template_id;
  const service_table = `services_of_user_${user_id}_template_${template_id}`;
  const collection1 = mongoose.connection.collection(service_table);
  let services = await collection1.find({});
  services = await services.toArray();
  res.render("service/service_list", {
    user_id: user_id,
    template_id: template_id,
    services: services ? services : [],
  });
};
const appointmentListView = (req, res) => {
  const user_id = req.params.user_id;
  const template_id = req.params.template_id;
  res.render("service/appointment_list", {
    user_id: user_id,
    template_id: template_id,
  });
};
const getAllServicesByCategory = async (req, res) => {
  let { user_id, template_id } = req.params;
  const service_table = `services_of_user_${user_id}_template_${template_id}`;
  const category_table = `services_category_of_user_${user_id}_template_${template_id}`;
  console.log(category_table);
  const collection1 = mongoose.connection.collection(service_table);
  const cate_collection = mongoose.connection.collection(category_table);
  let categories_with_services = await cate_collection.aggregate([
    {
      $lookup: {
        from: service_table,
        localField: "_id", // The field from the "categories" collection
        foreignField: "service_category_id", // The field from the "services" collection
        as: "services",
      },
    },
  ]);
  categories_with_services = await categories_with_services.toArray();
  res.send({ service_categories_with_service: categories_with_services });
};

module.exports = {
  addServiceView,
  serviceListView,
  appointmentListView,
  createService,
  getAllServicesByCategory,
};
