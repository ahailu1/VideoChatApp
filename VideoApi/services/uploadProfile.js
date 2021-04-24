const fs = require("fs");
const path = require("path");
const { app, router } = require("../config/express");

const saveFile = async (file, username) => {
  const location = path.resolve(path.join(__dirname, "../public/images"));
  const imagePath = `/srv/profile/${username}--profilepicture.jpg`;
  const relativePath = `/${username}--profilepicture.jpg`;
  try {
    const imageFile = await Buffer.from(file, "base64");
    const writeFile = await fs.writeFile(`${imagePath}`, imageFile, (err) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
    });
    return imagePath;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = saveFile;
