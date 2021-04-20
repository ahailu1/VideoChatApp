import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {initMediaDevice,getIceServers} from '../helpers/initVideo';
import SetIcon from './toggleicon';
import styles from './myvideo.module.scss';
import LoadVideo from './loadingvideo';
const VideoUi = ({friend_id,socket,userdata,myFollowers,toggleFriendInfo, hasAccepted = false,hasRequested = false, ...props}) => {
   let [recipientId, setRecipientId] = useState(false);
   let [declineMessage, setDeclineRequest] = useState('');
   let [thisStream, setStream] = useState('');
   let [myPeerConnection, setPeerConnection] = useState('');
   let [acceptedRequest, setRequest] = useState(false);
   let [iceServer, setServers] = useState([]);
   let [permissionError, setError] = useState(false);
   let [terminateStatus, setTerminate] = useState(false);
    useEffect ( () => {
        if(terminateStatus === true){
            thisStream.getTracks().forEach(track => {
                track.stop();
            });
            myPeerConnection.restartIce();
            setPeerConnection('');
            setStream('');
            setDeclineRequest('video ended');
             console.log([myPeerConnection, thisStream, terminateStatus, acceptedRequest])
             setRequest(false);
             setTerminate(false);
             toggleFriendInfo({});
            } else {
                console.log([myPeerConnection, thisStream, terminateStatus, acceptedRequest]);
                setDeclineRequest('');
                initScreen();
            }
    }, [terminateStatus]);

    useEffect(() => {
        if(hasAccepted === true && myPeerConnection !== '' && thisStream !== ''){
            //if i accept video request, make an offer; 
            setDeclineRequest('');
            initStream(friend_id);
             addIceCandidates();
        }
        //if i accept a video chat request
    }, [hasAccepted, myPeerConnection]);

    useEffect(() => {
    // if my request is accepted
                if(acceptedRequest === true && myPeerConnection !== ''){
                    listenForOffer();
                    addIceCandidates();
                    setRemoteStream();
                }
    }, [acceptedRequest, myPeerConnection]);

    let videoInput = useRef(null);

    let queryDevice = async () => {   
        window.location.reload();
    }
    let initScreen = async () => {
        await fetchData(userdata);
         await fetchRequest();
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
        socket.on(`decline_request_with_${user_id}`, data => {
                setDeclineRequest('User is busy');
        });
        socket.on(`terminate_video_with_${user_id}`, async data => {       
                  
            setTerminate(true);
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
      myPeerConnection.addEventListener('connectionstatechange', e => {
        if(e.srcElement.connectionState === 'connected'){
            setRecipientId(true);  
        }
});
      socket.on(`iceCandidate_to_${user_id}`, async data => {
        if(data.iceCandidate){
            try{
                await myPeerConnection.addIceCandidate(data.iceCandidate);
            } catch (err) {
                console.log(err)
            }
        }
      });
    }

    let fetchData = async ({user_id}) => {
        try{
            let stream = await initMediaDevice(setError);
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
        } catch (err) {
            setError(true);
        }
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
                        myPeerConnection.addEventListener('track', async(e) => {
                            remoteStream.addTrack(e.track, remoteStream);
                        });
                videoInput.current.srcObject = remoteStream;
                videoInput.current.play();
        }

    let InitRemoteVid = () => {
        let videoChat = (
            <video autoPlay playsInline controls id = 'friendvid' ref = {videoInput} className = {styles.vid} width = "100%">
            <source type = "video/mpg"/>
            </video>
            );
        
        if( (acceptedRequest === true || hasAccepted === true) ){
            return (
                videoChat
            )
        } else {
            return <LoadVideo initVideo = {hasRequested} requestMessage = {declineMessage}/>
        }
            
    }    

    let initStream = async (friend_id) => {
        let {user_id} = userdata;
        socket.on(`initStream_answer_${user_id}`, async (data) => {
            if (data.type === 'answer') {
                let remoteDescription = new RTCSessionDescription(data.answer);
                await myPeerConnection.setRemoteDescription(remoteDescription);
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
        <Col xl = {12} className = {`${styles.container__video} ${permissionError && styles.toggled}`}>
        <video autoPlay playsInline controls id = 'myvid' className = {styles.vid} width = "100%">
    <source type = "video/mpg"/>
    </video>
        </Col>
        <Col className = {`${styles.container__error} ${permissionError && styles.toggled} ${permissionError && 'd-flex flex-column justify-content-center align-items-center'}`}>
            <p>There might have been a permission error. Please Click icon and allow for access to your device's video and/or microphone</p>
        <FontAwesomeIcon icon = 'redo' className = {styles.icon} onClick = {queryDevice} />
        </Col>


        <Col className = {styles.container__icon}>
            <SetIcon stream = {thisStream} iconName = 'video'/>
            <SetIcon stream = {thisStream}  iconName = 'microphone'/>
            <SetIcon stream = {thisStream} myPeerConnection = {myPeerConnection} userdata = {userdata} friend_id = {friend_id} socket = {socket} initScreen = {initScreen} iconName = 'phone' setRequest = {setRequest} toggleFriendInfo = {toggleFriendInfo} setTerminate = {setTerminate}/>
        </Col>

        </Col>

        <Col lg = {{span: 5, offset: 1}} className = {styles.container__column__video}>
        

        {
        
        InitRemoteVid()
        
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