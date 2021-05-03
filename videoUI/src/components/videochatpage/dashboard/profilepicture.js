import React, {useState, useEffect} from 'react';
import {Image} from 'react-bootstrap';
import styles from './profilepicture.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
const Profilepicture = ({userdata, ...props}) => {

  let {username} = userdata;
  let [imageUrl, setImage] = useState(`${process.env.REACT_APP_SITE_URL}/src/components/images/profile/${username}--profilepicture.jpg`);


let fileSelector = () =>{
  let file = document.createElement('input');
  file.setAttribute('type', 'file');
  file.setAttribute('accept', 'image/png, image/jpeg');
  file.setAttribute('name', 'imageupload');
  file.onchange = handleChange;
  console.log(file);
  return (file);
}

let handleChange = (e) => {
  let {username} = userdata;
  let item = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(item);
  reader.onload = () => {
    let sendFile = reader.result;
    let bytesOnly = sendFile.split(',')[1];
    console.log(bytesOnly);
    let config = {
      url: `${process.env.REACT_APP_SITE_URL}/api/dashboard/uploadprofile/${username}`,
      method: 'PUT',
      data : {
        username: username,
        file: bytesOnly,
      }
    }
    axios(config).then(el => {
      console.log(el.data);
      let path = el.data.path;
      let newPath = path.split('videoChatApp');
      console.log(path);

    }).catch(err => {
      console.log(err);
    });

  }
  
}

let handleFileSelect = (e) => {
e.preventDefault();
  let file = fileSelector().click();
  let name = e.target;
  console.log(name);
  let fileReader = new FileReader();
  setImage(`${process.env.REACT_APP_SITE_URL}/src/components/images/profile/${username}--profilepicture.jpg`);
}

return (
<>
<Image src = {imageUrl} thumbnail className = {styles.imageaz} />
<FontAwesomeIcon type = "submit" icon = "pencil-alt" className = {styles.icon} onClick = {handleFileSelect} />
</>
)
}

export default Profilepicture;