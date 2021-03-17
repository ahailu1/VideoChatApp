import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from 'socket.io-client';
import SetIcon from './toggleicon';
import styles from './myvideo.module.scss';
const VideoUi = ({userInfo,userdata,myFollowers, ...props}) => {
   let [countdown, setTimer] = useState(15);
   let [thisStream, setStream] = useState('');
   let [thisMic, toggleMic] = useState(true);
   let [thisVideo, toggleVideo] = useState(true);
    let [onlineUsers, setAsOnline] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    let fetchData = async () => {
    await initMediaDevice();
}

    let initMediaDevice = async () => {
            try {
                let devices = await navigator.mediaDevices.enumerateDevices();
                let deviceId = devices[2].toJSON();
                console.log(deviceId);
                let constraints = {
                    'video': true,
                    'audio' : {
                        'deviceId': deviceId,
                        'echoCancellation': true
                    }
                }
                let item = await navigator.mediaDevices.getUserMedia(constraints);
                setStream(item);
                let edit = item.getAudioTracks()[0];
                let videoTracks = item.getVideoTracks();
                await edit.applyConstraints(deviceId);
                let vid = document.getElementById('myvid');
                vid.srcObject = item;
                vid.play();
                return item;
            } catch(err) {
                throw new Error(err);
            }
    }

    let toggleIcons = (iconname) => {
        if(iconname === 'video'){
            toggleVideo(!thisVideo);
            thisStream.getVideoTracks().forEach(el => {
                el.enabled = !thisVideo;
            })
        } else if (iconname === 'mic'){
            toggleMic(!thisMic);

            thisStream.getAudioTracks().forEach(el => {
                el.enabled = !thisMic;
            })
        } else {

        }

    }

    return (
        <Row className = {styles.container__videopage}>

            <Col xl = {9} className = {styles.container__column__wrapper}>
            <Col lg = {5} className = {styles.container__column__video}>
    <video autoPlay playsInline controls id = 'myvid' className = {styles.vid} width = "100%">
    <source type = "video/mpg"/>
    </video>

        <div className = {styles.container__icon}>
            <SetIcon icon = {thisVideo} iconName = 'video' callBack = { () => {toggleIcons('video') }}/>
            <SetIcon icon = {thisMic} iconName = 'microphone' callBack = { () => {toggleIcons('mic') }}/>
        </div>
        </Col>

        <Col lg = {2} className = {styles.container__column__count}>
        <div className = {styles.container__count}>
            <p className = {styles.text}>{countdown}</p>
            <p className = {styles.text}>{userInfo}</p>
     
        </div>
        <div>
                </div>
        </Col>
        <Col lg = {4} className = {styles.container__column__video}>
        <video autoPlay playsInline controls="false" id = 'friendvid' width = "100%">
    <source type = "video/mpg"/>
    </video>
    {onlineUsers.length > 0 && onlineUsers.map(el => {
            return <h1>{el}</h1>
        })}
        </Col>
        </Col>
        <Col lg = {3} className = {styles.container__column__sidebar}>
        {props.render()}
        </Col>
        </Row>
    )
}

export default VideoUi;