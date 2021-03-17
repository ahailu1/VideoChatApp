import React,{useState, useEffect} from 'react';
import {ListGroup,Col, Spinner,Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './videobutton.module.scss';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import VideoModal from '../utilities/modal';

let VideoButton  = ({userdata, setActiveKey,initVideoChat,username, user_id, bio, date,socket, ...props}) => {
//
    //username, user_id, bio, date
let returnVidPage = () => {
    let myrequest =  {
        user_id : userdata.user_id,
        isOnline: true,
        username:userdata.username,
        startVid: true
    }
    setActiveKey('#link1');
    initVideoChat(username, user_id,bio,date);
    socket.emit('initVideo', myrequest);
}


    return (
        <>
        <Col xl = {12} className = {styles.container__column}>
            <div className = {styles.container__icon}>
            <FontAwesomeIcon icon = 'video' className = {styles.icon__video} onClick = {returnVidPage}/>

            </div>
        </Col>
        </>
    )
}

export default VideoButton;