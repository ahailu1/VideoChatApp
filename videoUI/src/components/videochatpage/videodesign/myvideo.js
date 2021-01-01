import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Col, Button} from 'react-bootstrap';
import io from 'socket.io-client';
const VideoUi = (props) => {

   let [socket, initSocket] = useState(io('http://localhost:5000'));
   let [inputVal, setInput] = useState('');
   let [iceServers, setServers] = useState([]);
    useEffect(  () => {
        fetchData();
    }, []);

let fetchData = async () => {
    await initIceServers();
    await initMediaDevice();
    await peerAnswer();
    testSocket();

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
    let testSocket = () => {
        console.log(socket);
        socket.on('testing', (data) => {
            console.log('its owrking');
            alert('its working');
        })
    }


    let initIceServers = async () => {
        let {username} = props.userdata;
        let config = {
            url: 'http://localhost:5000/iceservers/:username',
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
                console.log(answer);
                console.log('still here')
                console.log(data);
                let remoteDescription = new RTCSessionDescription(answer);
                await peerConnection.setRemoteDescription(remoteDescription);
             }
            });
        } catch (err) {

            throw new Error(err);
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
                let item = await navigator.mediaDevices.getUserMedia({video:true, audio: true});
                let devices = await navigator.mediaDevices.enumerateDevices();
                let vid = document.getElementById('myvid');
                vid.srcObject = item;
                return item;
            } catch(err) {
                throw new Error(err);
            }
    }


    return (
        <Col>
<h1>hello world</h1>

<form name = "submitform" onSubmit = {handleRequest}>

<input type = "text" name = "request"/>
<Button type = "submit">Submit</Button>

</form>

    <video autoplay playsinline controls="false" id = 'myvid'>
    <source type = "video/mpg"/>
    </video>

    <video autoplay playsinline controls="false" id = 'friendvid'>
    <source type = "video/mpg"/>
    </video>
        </Col>
        
    )
}

export default VideoUi;