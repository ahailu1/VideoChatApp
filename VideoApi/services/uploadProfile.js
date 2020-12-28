let {app, router} = require('../config/express');
let fs = require('fs');
let path = require('path');
let saveFile = async (file, username) => {
    let location = path.resolve(path.join(__dirname, '../../videoUI/public/'));
     let imagePath = `${location}/${username}--profilepicture.jpg`;
     let relativePath = `/${username}--profilepicture.jpg`;
     console.log(relativePath);
    try {
        let imageFile = await Buffer.from(file, 'base64');
        let writeFile = await fs.writeFile(imagePath, imageFile, (err) => {
        });
        console.log(relativePath);
        return relativePath;
    } catch (e) {
        res.status(422).send({error: 'invalid'});
        throw new Error(e);
    }
}

module.exports = saveFile;