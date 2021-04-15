import React from 'react';
import {Col } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './videobutton.module.scss';

let VideoButton  = ({userdata, setActiveKey,initVideoChat,username, user_id, bio, date,socket, ...props}) => {
//
    //username, user_id, bio, date
let returnVidPage = () => {
    let myrequest =  {
        sender_id : userdata.user_id,
        isOnline: true,
        recipient_id: user_id,
        username:userdata.username,
        startVid: true
    }
    setActiveKey('#link1');
    initVideoChat(username, user_id,bio,date, true);
    socket.emit('initVideo', myrequest);
}


    return (
        <>
        <Col xl = {12} className = {styles.container__column} sm = {12}>
            <div className = {styles.container__icon}>
            <FontAwesomeIcon icon = 'video' className = {styles.icon__video} onClick = {returnVidPage}/>

            </div>
        </Col>
        </>
    )
}

export default VideoButton;