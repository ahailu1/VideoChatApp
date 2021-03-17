let {app, router} = require('../config/express');
let fs = require('fs');
let path = require('path');
let saveFile = async (file, username) => {
    let location = path.resolve(path.join(__dirname, '../public/images'));
     let imagePath = `${location}/${username}--profilepicture.jpg`;
     let relativePath = `/${username}--profilepicture.jpg`;
    try {
        let imageFile = await Buffer.from(file, 'base64');
        let writeFile = await fs.writeFile(`${imagePath}`, imageFile, (err) => {
        if(err){
            console.log(err);
            throw new Error(err);
        }
        });
        return imagePath;
    } catch (e) {
        res.status(422).send({error: 'invalid'});
        throw new Error(e);
    }
}

module.exports = saveFile;