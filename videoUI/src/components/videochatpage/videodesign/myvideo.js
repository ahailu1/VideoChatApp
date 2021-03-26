import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {initMediaDevice,getIceServers} from '../helpers/initVideo';
import SetIcon from './toggleicon';
import styles from './myvideo.module.scss';
import LoadVideo from './loadingvideo';
const VideoUi = ({friend_id,socket,userdata,myFollowers,hasAccepted, ...props}) => {
   let [countdown, setTimer] = useState(15);
   let [recipientId, setRecipientId] = useState('');
   let [thisStream, setStream] = useState('');
   let [myPeerConnection, setPeerConnection] = useState('');
    let [acceptedRequest, setRequest] = useState(false);
   let [thisMic, toggleMic] = useState(true);
   let [iceServer, setServers] = useState([]);
   let [thisVideo, toggleVideo] = useState(true);

    useEffect(() => {
        fetchData(userdata);
        fetchRequest();
    }, []);

    useEffect(() => {
                if(friend_id !== undefined){
                    console.log(friend_id + 'is not defined mothafucka')
                    listenForOffer();
                }
                if(myPeerConnection !== '' && thisStream !== ''){
                    console.log('we connected');
                    thisStream.getTracks().forEach(el => {
                        myPeerConnection.addTrack(el, thisStream)
                    });
                }
                if(acceptedRequest === true || hasAccepted === true){
                    initStream(friend_id);
                    testConnection();
                    setRemoteStream();
                }
    }, [friend_id]);
        let testConnection = () => {
            myPeerConnection.addEventListener('connectionstatechange', e => {
            });
        }

    let fetchRequest = () => {
        let {user_id} = userdata;
        socket.on(`confirm_request_with_${user_id}`, (data) => {
            let {recipient_id, sender_id} = data;
            setRequest(true);
            setRecipientId(sender_id);
        });
    }
    let fetchData = async ({user_id}) => {
        let stream = await initMediaDevice();
      let {peerConnection, iceServers} = await getIceServers(user_id);
        setPeerConnection(peerConnection);
        setServers(iceServers);
        setStream(stream);
        let video = document.getElementById('myvid');
        video.srcObject = stream;
        video.play();
}
let listenForOffer = () => {
    let {user_id} = userdata;
    socket.on(`initStream_offer_${user_id}`, async data => {
    if(data.type === 'offer'){
                    myPeerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                    let answer = await myPeerConnection.createAnswer();
                    await myPeerConnection.setLocalDescription(answer);
                    let recipient_id = data.sender;
                    let info = {
                        sender: user_id,
                        recipient_id: recipient_id,
                        answer: answer,
                        isOnline: true,
                        type: 'answer',
                    }
                    socket.emit('initStream', info);
                }
        });  
}
        let setRemoteStream = () => {
            let remoteStream = new MediaStream();
            let remoteVid = document.getElementById('friendvid');
            remoteVid.srcObject = remoteStream;
            myPeerConnection.addEventListener('track', async(e) => {
                remoteStream.addTrack(e.track, remoteStream);
            });
        }

    let toggleIcons = (iconname) => {
        if(iconname === 'video'){
            toggleVideo(!thisVideo);
            thisStream.getVideoTracks().forEach(el => {
                el.enabled = !thisVideo;
            });
            toggleVideo(!thisVideo);
        } else if (iconname === 'mic'){
            toggleMic(!thisMic);
            thisStream.getAudioTracks().forEach(el => {
                el.enabled = !thisMic;
            })
        } else {
        }
    }

    let initStream = async (friend_id) => {
        let {user_id} = userdata;
        socket.on(`initStream_answer_${user_id}`, async (data) => {
            if(data.type === 'answer'){
                let remoteDescription = new RTCSessionDescription(data.answer);
                await myPeerConnection.setLocalDescription(remoteDescription);
            }
        });
        let myOffer = await myPeerConnection.createOffer();
        await myPeerConnection.setLocalDescription(myOffer);
        let info = {
            sender: user_id,
            recipient_id: friend_id,
            offer: myOffer,
            type: 'offer'
        }
        socket.emit('initStream', info);
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

        <Col lg = {5} className = {styles.container__column__video}>
            {
                acceptedRequest === true || hasAccepted === true ?
                <video autoPlay playsInline controls id = 'friendvid' className = {styles.vid} width = "100%">
                <source type = "video/mpg"/>
                </video>
                : <LoadVideo/>
            }
        </Col>

        </Col>
        
        <Col lg = {3} className = {styles.container__column__sidebar}>
        {props.render()}
        </Col>
        
        </Row>
    )
}

export default VideoUi;