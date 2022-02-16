import React, {useState, useEffect} from 'react';
import {Col, Button, Row, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './loadingvideo.module.scss';

const LoadVideo = ({initVideo = false, requestMessage}) => {


    let loadingScreen = (initVideo) => {
       let item = <p className = {styles.video__text}>to start a video chat please go to your friendslist and then click on the video icon</p>
    let startVid = (  <>
<p className = {styles.video__text}>{ requestMessage !== '' ? requestMessage :  'Waiting for Response...'}</p> :
{              requestMessage === '' ?  <Spinner animation = 'border' className = {styles.video__spinner}/>
: null     
}      </>           
    );
        
       return (
       <Col className = {styles.container__video} xl = {12}>
           {initVideo ? startVid : item}
        </Col>
       )    
}


    return(
            loadingScreen(initVideo)
    )
}

export default LoadVideo;