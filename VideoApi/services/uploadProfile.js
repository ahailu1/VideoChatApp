let {app, router} = require('../config/express');
let fs = require('fs');
let path = require('path');
let saveFile = async (file, username) => {
    let location = path.resolve(path.join(__dirname, '../public/images'));
    console.log(location)
     let imagePath = `${location}/${username}--profilepicture.jpg`;
     console.log(imagePath);
     let relativePath = `/${username}--profilepicture.jpg`;
     console.log(imagePath);
    try {
        let imageFile = await Buffer.from(file, 'base64');
        let writeFile = await fs.writeFile(`${imagePath}`, imageFile, (err) => {
        console.log('here baby')
        if(err){
            console.log(err);
            throw new Error(err);
        }
        });
        return imagePath;
    } catch (e) {
        console.log('fucking error buddy');
        res.status(422).send({error: 'invalid'});
        throw new Error(e);
    }
}

module.exports = saveFile;