import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from 'socket.io-client';
import SetIcon from './toggleicon';
import styles from './myvideo.module.scss';
const VideoUi = (props) => {

   let [socket, initSocket] = useState(io(`http://${process.env.REACT_APP_SITE_URL}`));
   let [inputVal, setInput] = useState('');
   let [iceServers, setServers] = useState([]);
   let [countdown, setTimer] = useState(15);
   let [thisStream, setStream] = useState('');
   let [screen, toggleScreen] = useState(true);
   let [thisMic, toggleMic] = useState(true);
   let [thisVideo, toggleVideo] = useState(true);


    useEffect(  () => {
        fetchData();
    }, []);

let fetchData = async () => {
    await initIceServers();
    await initMediaDevice();
    await peerAnswer();
    timer(10);
}

let makeOffer = async (username, recipient, peerConnection) => {
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log(username + 'what a phaggot')
    console.log(recipient + 'what a phaggot')

    let data = {
        offer: offer,
        username : username,
        recipient: recipient,
    }
    socket.emit('initsession', data )
}
const handleRequest = async (e)=> {
    e.preventDefault();
    let inputVal = e.target.request.value;   
    console.log(props.userdata);
    let {username} = props.userdata;
    console.log(username + 'phaggot')
    let message = {
        username : username,
        recipient: inputVal,
        sender: username,
        offer: 'myoffer',
        anwer: 'myansew'
    }
    let myServers = iceServers; 
    console.log(myServers);
    let peerConnection = new RTCPeerConnection(myServers);
    await makeOffer(username, inputVal, peerConnection);
    await initStream();
    await initRemoteTracks();
}

    let initStream = async () => {
        let openDevices = await navigator.mediaDevices.getUserMedia({
            'video': true,
            'audio': true
        });
        let initIce = new RTCPeerConnection(iceServers);
        openDevices.getTracks().forEach(el => {
            console.log(el);
        initIce.addTrack(el, openDevices)
        });
    }
    let initRemoteTracks = () => {
        const remoteStream = new MediaStream();
        const remoteVideo = document.getElementById('friendvid');
        console.log(remoteVideo)
        let peerConnection = new RTCPeerConnection(iceServers);
        remoteVideo.srcObject = remoteStream;
        peerConnection.addEventListener('track', async (event) => {
            remoteStream.addTrack(event.track, remoteStream);
        });
    }
    let initIceServers = async () => {
        let {username} = props.userdata;
        let config = {
            url: `http://localhost:5000/api/iceservers/${username}`,
            method: 'get',
            data: {
                username: username
            }
        }
        try {
            let iceServer = await axios(config);
            let servers = iceServer.data.iceServers;
            let peerConnection = new RTCPeerConnection(servers);
            let {username} = props.userdata;
            setServers(servers);
            console.log(username + 'still here')
        socket.on(`${username}`, async data => {   
            if(data.recipient === username ){
                let answer = data.answer;
                let remoteDescription = new RTCSessionDescription(answer);
                await peerConnection.setRemoteDescription(remoteDescription);
             }
            });
        } catch (err) {
        }
}

    let peerAnswer = async () => {
        let peerConnection = new RTCPeerConnection(iceServers);
        let {username} = props.userdata;
        console.log('peer answer activated')
        socket.on(`${username}`, async (info) => {
            if(info.recipient === username){
                peerConnection.setRemoteDescription(new RTCSessionDescription(info.offer));
                const answer = await peerConnection.createAnswer();
                let recipient = info.username;
                alert(recipient);
                alert('hello');
                await peerConnection.setLocalDescription(answer);
                let data = {
                    username: username,
                    recipient: recipient,
                    answer: answer 
                }
                socket.emit('initsession', data)        
            }
        })
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
               
                console.log(videoTracks);
                await edit.applyConstraints(deviceId);
                console.log(edit);
                let vid = document.getElementById('myvid');
                
                vid.srcObject = item;
                return item;
            } catch(err) {
                throw new Error(err);
            }
    }

    let timer =  (item) => {
        if(item > 0){
            setTimeout(() => {
                item--
                setTimer(item);
                return timer(item);
    
            }, 1000);
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
            <Col className = {styles.container__column} noGutters = {true} lg = {4}>
<form name = "submitform" onSubmit = {handleRequest}>

<input type = "text" name = "request"/>
<Button type = "submit">Submit</Button>

</form>

    <video autoplay playsinline controls="false" id = 'myvid'>
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
        </div>
        </Col>
        <Col lg = {4}>
        <video autoplay playsinline controls="false" id = 'friendvid'>
    <source type = "video/mpg"/>
    </video>
        </Col>
        </Row>
    )
}

export default VideoUi;