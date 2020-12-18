import React from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
export default class Video extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            socket : null,
            video: null,
            loading: true,
            apiKey: 'mB98j6brC6Zza73Hs2onFe5Fh',
            apiKeySecret : 'yirBKGgGn0IwCEixrfod4dbB3PJJK2X8DAyL6jSD9DstRLy11N',
            bearerToken : 'AAAAAAAAAAAAAAAAAAAAALfDJgEAAAAAnHbxN%2Fb42QTed54Ao0XEwf%2FJytc%3D7L6LUDYhlpKDSaKG7ezA6cN0gVVl3IlHP8PgZjX4xxp3q8kd4s',
        }
    }

 async componentDidMount(){
    await this.initSocket();
    await this.getRequests();
}
   peerCall = async () => {
    let iceServers = await axios.get('http://localhost:5000/getservers/icecandidate'); 
       let peerConnection = new RTCPeerConnection(iceServers);
       let socket = this.state.socket;
    //signalling channel

       socket.on('peerMessage',async el => {
            if(el.peerAnswer){
                let createDescription = new RTCSessionDescription(el.peerAnswer);
                await peerConnection.setRemoteDescription(createDescription);
            }
        });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', offer);

};
handleSubmit = (e) => {
    e.preventDefault();
    let msg = e.target.mymsg.value;
    console.log(msg);
    let data= {
        username: 'ahailu',
        message: msg,
    }
    this.state.socket.emit('message', data);
}
initSocket = async () => {
    
const socket = await io('http://localhost:5000');
this.setState({socket: socket});
}
    mycb = (stream) => {
        return (
            <video width = "420" height = "500" controls>
            <source type = "video/mp4" src = {stream} />    
            </video>
        )
    }

 getRequests = async () => {

    let constraints = {
        'video' : true,
        'audio' : true,
    }
   let stream = await navigator.mediaDevices.getUserMedia(constraints);
    //this.setState({video: stream, loading: false});
    let myvid = document.getElementById('videoaz');
    setTimeout(() => {
        myvid.srcObject = stream;
        myvid.srcObject.getTracks().forEach(el => {
            el.stop();
        })
    }, 5000)
    myvid.srcObject = stream;
    //myvid.play();
    console.log(myvid);    
}   




  render (){
    return (
        <div>
            <form onSubmit = {this.handleSubmit}>
            <input type = 'text' name = 'mymsg'/>
        <button type = 'submit' >send</button>
            </form>
            
            <video id = "videoaz" playsInline width = "420" height = "500" controls>
    <source type = "video/mp4" src = {this.state.video} />    
    </video>
        
            <h1>hello world</h1>
        </div>
    )
} 
}