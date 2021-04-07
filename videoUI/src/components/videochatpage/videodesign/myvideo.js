import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {initMediaDevice,getIceServers} from '../helpers/initVideo';
import SetIcon from './toggleicon';
import styles from './myvideo.module.scss';
import LoadVideo from './loadingvideo';
const VideoUi = ({friend_id,socket,userdata,myFollowers,hasAccepted = false,hasRequested = false, ...props}) => {
   let [recipientId, setRecipientId] = useState('');
   let [thisStream, setStream] = useState('');
   let [myPeerConnection, setPeerConnection] = useState('');
    let [acceptedRequest, setRequest] = useState(false);
   let [iceServer, setServers] = useState([]);

    useEffect(() => {
        fetchData(userdata);
        fetchRequest();
    }, []);

    useEffect(() => {

    }, [thisStream])
    //once accepted load ice servers;

    useEffect(() => {
        console.log([hasAccepted, myPeerConnection, 'phaggot', friend_id])
        if(hasAccepted === true && myPeerConnection !== '' && thisStream !== ''){
            console.log([friend_id, hasAccepted, 'blah testing']);
            addIceCandidates();
            listenForOffer();
             initStream(friend_id);
        }
        //if i accept a video chat request
    }, [hasAccepted]);

    useEffect(() => {
    // if my request is accepted
                if(myPeerConnection !== '' && thisStream !== ''){
                    addIceCandidates();

                }
                console.log(acceptedRequest + 'is the damn value');

                if(acceptedRequest === true){
                    console.log(acceptedRequest);
                    console.log('right here idiot');
                    addIceCandidates();
                    listenForOffer();
                    testConnection();
                    setRemoteStream();
                }
    }, [acceptedRequest]);

        let testConnection = () => {
            myPeerConnection.addEventListener('connectionstatechange', e => {
                if(e.connectionState === 'connected'){
                    alert('hello world phaggot');
                }
            });
        }

    let fetchRequest = () => {
        let {user_id} = userdata;
        socket.on(`confirm_request_with_${user_id}`, (data) => {
            let {recipient_id, sender_id} = data;
            //if request is not true, seti t to true and then listen
            if(acceptedRequest !== true){
                let data = {
                    sender_id: recipient_id,
                    recipient_id : sender_id,
                }
                console.log(acceptedRequest)
                setRequest(prev => {
                    console.log(prev);
                    console.log(acceptedRequest)
                    if(prev !== true){
                        socket.emit('confirmRequest', data);
                        return true;
                    } else {
                        return true;
                    } 
                });
            }
        });
    }

    let addIceCandidates = () => {
        let {user_id} = userdata;
        myPeerConnection.addEventListener('icecandidate', (e) => {
            if(e.candidate){
                let iceCandidates = {
                    iceCandidate: e.candidate,
                    recipient_id: friend_id,
                }
                console.log(e.candidate);
                socket.emit('initIceCandidate', iceCandidates)
            }  
      });
      socket.on(`iceCandidate_to_${user_id}`, async data => {
        if(data.iceCandidate){
            try{
                await myPeerConnection.addIceCandidate(data.iceCandidate);
            } catch (err) {
                console.log('error')
            }
        }
      });
    }
    let fetchData = async ({user_id}) => {
        let stream = await initMediaDevice();
      let {peerConnection, iceServers} = await getIceServers(user_id);
        stream.getTracks().forEach(el => { 
            peerConnection.addTrack(el, stream);
        });
        setPeerConnection(peerConnection);
        setServers(iceServers);
        setStream(stream);
        let video = document.getElementById('myvid');
        video.srcObject = stream;
        video.play();
}
let listenForOffer = async () => {
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
            remoteVid.play();
        }

   

    let initStream = async (friend_id) => {
        let {user_id} = userdata;
        socket.on(`initStream_answer_${user_id}`, async (data) => {
            if(data.type === 'answer'){
                let remoteDescription = new RTCSessionDescription(data.answer);
                await myPeerConnection.setRemoteDescription(remoteDescription);
                console.log('got an answer ass hole');
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
            <SetIcon stream = {thisStream} iconName = 'video'/>
            <SetIcon stream = {thisStream}  iconName = 'microphone'/>
            <SetIcon stream = {thisStream} iconName = 'phone'/>

        </div>
        </Col>

        <Col lg = {{span: 5, offset: 1}} className = {styles.container__column__video}>
            {
                acceptedRequest === true || hasAccepted === true ?
                <video autoPlay playsInline controls id = 'friendvid' className = {styles.vid} width = "100%">
                <source type = "video/mpg"/>
                </video>
                : <LoadVideo initVideo = {hasRequested}/>
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