import React, {useState} from 'react';
import {ListGroup,Button, Spinner,Dropdown, DropdownButton,Modal, Image } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './modal.module.scss';
const VideoModal = ({onHide,setActiveKey,username, ...props}) => {

    let acceptButton = () => {
        setActiveKey('#link1');
        onHide();

    }


    return (
    <Modal {...props} size = 'lg' aria-labelledby="contained-modal-title-vcenter" className = {styles.modal} animation = {false}>


<div className = {styles.container__modal}>


<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className = {styles.svg}>
  <path fill="#272727" d="M44.5,-55C59.1,-50.7,73.3,-39.5,75.4,-26.1C77.5,-12.7,67.4,3,58.4,15.3C49.3,27.6,41.2,36.6,31.6,48C22.1,59.5,11,73.5,-2,76.2C-14.9,78.9,-29.9,70.3,-45,60.6C-60.1,50.9,-75.4,40.2,-81.1,25.6C-86.9,11.1,-83,-7.3,-73.7,-20.1C-64.3,-32.9,-49.4,-40.2,-36.1,-44.9C-22.9,-49.7,-11.5,-52.1,1.7,-54.5C15,-56.9,29.9,-59.3,44.5,-55Z" transform="translate(100 100)" />
</svg>


<div>
<Image className = {styles.modal__image} src = '/test123--profilepicture.jpg' />

</div>





<div>

<Button onClick={acceptButton}>Close</Button>

<Button onClick={onHide}>Close</Button>
</div>
</div>
    </Modal>
    )
}

export default VideoModal;