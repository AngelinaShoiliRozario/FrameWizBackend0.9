const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

async function getAddSectionView(req, res) {
  res.render("add-section/add_section");
}

async function addSectionToDB(req, res) {
  try {
    const table_1_name = req.body.sectionType + "_sections_data";
    const table_2_name = req.body.sectionType + "_sections";
    const path = req.file.path;

    // Find the index of 'public' in the path
    const publicIndex = path.indexOf("public");

    // Extract the substring after 'public'
    const substringAfterPublic = path.substring(
      publicIndex + "public".length + 1
    );
    const finalPath = substringAfterPublic.replace(/\\/g, "/"); // Replace backslashes with forward slashes

    // Get a reference to the collection
    const collection1 = mongoose.connection.collection(table_1_name);
    const collection2 = mongoose.connection.collection(table_2_name);
    // Check if the collection exists
    let section_id_c;

    // Add data to the collection
    const data = {
      section_data: req.body.htmlCode.replace(/\s+/g, " ").trim(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    await collection1.insertOne(data, async (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
      } else {
        section_id_c = await result.insertedId;
        // Add data to the collection
        const data = {
          image_url: finalPath,
          caption: req.body.sectionName,
          section_id: section_id_c,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await collection2.insertOne(data, (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
          }
        });
      }
    });
    res.send({ succ: "successfully saved in the database" });
  } catch (e) {
    res.send({ err: "unable to save to database" });
  }
}

async function getSectionByType(req, res) {
  try {
    const table_name = req.params.sectionType + "_sections";
    // console.log(table_name);
    const collection1 = mongoose.connection.collection(table_name);
    const collectionData = await collection1.find().toArray();
    res.json({section_data:collectionData});
  } catch (e) {
    res.send([]);
  }
}
async function getSectionByTypeID(req, res) {
  try {
    const section_id = new ObjectId(req.params.section_id);
    const table_name = req.params.section_type + "_sections_data";
    const collection1 = mongoose.connection.collection(table_name);
    const collectionData = await collection1.findOne({_id:section_id});
    res.json(collectionData);
  } catch (e) {
    res.send([]);
  }
}
module.exports = { getAddSectionView, addSectionToDB, getSectionByType,getSectionByTypeID };
