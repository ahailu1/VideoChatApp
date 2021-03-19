import React, {useState, useEffect} from 'react';
import {Col, Button, Row, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './loadingvideo.module.scss';


const LoadVideo = () => {


    let loadingScreen = () => {
       
       return (
       <Col className = {styles.container__video} xl = {12}>
       <p className = {styles.video__text}>Waiting for Response...</p>
        <Spinner animation = 'border' className = {styles.video__spinner}/>                
        </Col>
       )    
}


    return(
            loadingScreen()
    )
}

export default LoadVideo;