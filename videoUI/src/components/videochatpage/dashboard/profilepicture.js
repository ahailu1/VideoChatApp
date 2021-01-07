import React, {useState, useEffect} from 'react';
import {Form,Image, Row, Col, InputGroup, FormControl, Button,Container, Tab, Nav} from 'react-bootstrap';
import styles from './profilepicture.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
const Profilepicture = (props) => {


  let [imageUrl, setImage] = useState('/test123--profilepicture.jpg');


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
  let {username} = props.userdata;
  let item = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(item);
  reader.onload = () => {
    let sendFile = reader.result;
    let bytesOnly = sendFile.split(',')[1];
    console.log(bytesOnly);
    let config = {
      url: `http://localhost:5000/dashboard/uploadprofile/${username}`,
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
      //setImage(path);

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
}


return (
<>
<Col sm = {2} xs = {4} lg = {12} className = {styles.container__image}>

<Image src = {imageUrl !== "" ? imageUrl : "/logo192.png"} thumbnail className = {styles.imageaz} />
<FontAwesomeIcon type = "submit" icon = "pencil-alt" className = {styles.icon} onClick = {handleFileSelect} />
</Col>
</>
)
}

export default Profilepicture;