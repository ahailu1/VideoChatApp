import axios from 'axios';

export let initMediaDevice = async () => {
    try {
        let devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices);
        let deviceId = devices[2].toJSON();
        
        let constraints = {
            'video': true,
            'audio' : {
                'deviceId': deviceId,
                'echoCancellation': true
            }
        }
        let item = await navigator.mediaDevices.getUserMedia(constraints);
        let edit = item.getAudioTracks()[0];
        await edit.applyConstraints(deviceId);
        return item;
    } catch(err) {
        throw new Error(err);
    }
}
export let getIceServers = async (user_id) => {
   let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/iceservers/${user_id}`);
    let iceServers = data.iceServers;
    console.log(iceServers);
    let config = {
        'iceServers': iceServers,
    }
    let peerConnection = new RTCPeerConnection(config);
    return {
        iceServers,
        peerConnection
    }
}