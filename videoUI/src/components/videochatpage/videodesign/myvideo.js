import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {initMediaDevice,getIceServers} from '../helpers/initVideo';
import SetIcon from './toggleicon';
import styles from './myvideo.module.scss';
import LoadVideo from './loadingvideo';
const VideoUi = ({friend_id,socket,userdata,myFollowers,toggleFriendInfo, hasAccepted = false,hasRequested = false, ...props}) => {
   let [declineMessage, setDeclineRequest] = useState('');
   let [thisStream, setStream] = useState('');
   let [thisOffer, setThisOffer] = useState(false);
   let [thisAnswer, setThisAnswer] = useState(false);
   let [myPeerConnection, setPeerConnection] = useState('');
   let [acceptedRequest, setRequest] = useState(false);
   let [iceServer, setServers] = useState([]);
   let [permissionError, setError] = useState(false);
   let [terminateStatus, setTerminate] = useState(false);
    useEffect ( () => {
        if(terminateStatus === true){

            if(thisStream !== undefined){
                thisStream.getTracks().forEach(track => {
                });
            }
            myPeerConnection.restartIce();
            setPeerConnection('');
            setStream('');
            setDeclineRequest('video ended');
             setRequest(false);
             setThisOffer(false);
             setThisAnswer(false);
             setTerminate(false);
             toggleFriendInfo({});
            } else {
                if(hasAccepted === true){
                }
                if(hasRequested === true){
                    
                }

                setDeclineRequest('');
                initScreen();
            }
    }, [terminateStatus]);

    useEffect(() => {
        if(hasAccepted === true && myPeerConnection !== '' && thisStream !== ''){
            initNegotiation();
            //if i accept video request, make an offer; 
            setDeclineRequest('');
            initStream(friend_id);
             addIceCandidates();
        }
        //if i accept a video chat request
    }, [hasAccepted, myPeerConnection]);

    useEffect(() => {
        if(myPeerConnection !== '' && thisStream !== ''){
            if(thisStream !== undefined){
                thisStream.getTracks().forEach(el => {
                    myPeerConnection.addTrack(el, thisStream);
                });
            }
              let video = document.getElementById('myvid');
              console.log(video);
              video.srcObject = thisStream;
              video.play();
            }
        
    }, [myPeerConnection, thisStream]);

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

    let initNegotiation = () => {
        myPeerConnection.onnegotiationneeded =  async (e) => {
            
        };
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
                setRequest(prev => {
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
                  console.log('just got terminated buddy');
            setTerminate(true);
                    });
    }

    let addIceCandidates = () => {
        let {user_id} = userdata;

        myPeerConnection.onicecandidate = (e) => {
            if(e.candidate == null) {
            return;
            }
                let iceCandidates = {
                    iceCandidate: e.candidate,
                    recipient_id: friend_id,
                }
                socket.emit('initIceCandidate', iceCandidates);
                myPeerConnection.onicecandidate = null;
            }  
      myPeerConnection.addEventListener('connectionstatechange', e => {
        if(e.srcElement.connectionState === 'connected'){
            console.log(' we connected boyo adadssdakdassad');
        }
});

      socket.on(`iceCandidate_to_${user_id}`, async data => {
        if(data.iceCandidate){
            try{
                    let item = myPeerConnection.iceGatheringState;
                    console.log(item);
                        await myPeerConnection.addIceCandidate(data.iceCandidate);
               
            } catch (err) {
                myPeerConnection.restartIce();
                console.log(err)
            }
        }
      });
    }


    let fetchData = async ({user_id}) => {
        try{
            let stream = await initMediaDevice(setError);
            let {peerConnection, iceServers} = await getIceServers(user_id);
              await setPeerConnection(peerConnection);
              await setServers(iceServers);
              setStream(stream);
        } catch (err) {
            setError(true);
        }
}
let listenForOffer = async () => {
    let {user_id} = userdata;
    socket.on(`initStream_offer_${user_id}`, async data => {
    if(data.type === 'offer'){
        if(thisOffer === false){
            setThisOffer(async offer => {
                if(offer === false){
                    await myPeerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
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
                    console.log(info);
                    console.log('just got an offer now im gonna send an answer to the offer');
                    socket.emit('initStream', info);

                } else {
                    return true
                }
            });
        }
                    }
        });  
}
        let setRemoteStream = () => {
                let remoteStream = new MediaStream();
                        myPeerConnection.ontrack = async(e) => {
                            await remoteStream.addTrack(e.track, remoteStream);
                        }
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
        console.log(friend_id);
        console.log([hasAccepted, hasRequested, 'hello im testing']);
        let {user_id} = userdata;
        let myOffer = await myPeerConnection.createOffer();
                    await myPeerConnection.setLocalDescription(myOffer);
                    let info = {
                        sender: user_id,
                        recipient_id: friend_id,
                        offer: myOffer,
                        type: 'offer'
                    }
                    console.log(myOffer);
                    console.log('about to send offer')
                    socket.emit('initStream', info); 
        socket.on(`initStream_answer_${user_id}`, async (data) => {
            if (data.type === 'answer') {
                console.log('received an answer to my offer')
                if(thisAnswer === false){
                    setThisAnswer(async state => {
                        if(state === false){
                            try {
                                    let remoteDescription = new RTCSessionDescription(data.answer);
                                    console.log(myPeerConnection.signalingState + ' is the state');
                                    await myPeerConnection.setRemoteDescription(remoteDescription);            
                                    return true;

                            } catch (err) {
                                console.log(err);
                            }
                        } else {
                            return true;
                        }
                    })
            
                }
            }
        });
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