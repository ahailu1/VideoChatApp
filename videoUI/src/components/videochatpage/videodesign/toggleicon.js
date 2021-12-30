import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './icon.module.scss';
import {Button, Col} from 'react-bootstrap';
let SetIcon = ({stream,iconName,initScreen,myPeerConnection, setRequest,setTerminate, toggleFriendInfo,socket,friend_id, userdata, ...props}) => {
    // change state of props
    let [myIcon, toggleIcon] = useState(false);
    
    let toggleIcons = (iconName) => {
        if(iconName === 'video'){
            stream.getVideoTracks().forEach(el => {
                if(myIcon === false){
                    el.enabled = false;
                } else {
                    el.enabled = true;
                }
            });
            toggleIcon(!myIcon);

        }  
        if(iconName === 'microphone'){
            stream.getAudioTracks().forEach(el => {
                if(myIcon === false){
                    el.enabled = false;
                } else {
                    el.enabled = true;
                }            });
            toggleIcon(!myIcon);

        }
        if(iconName === 'phone') {

           toggleIcon(!myIcon);
    }
    }

let terminateStream = async () => {
    
    toggleIcon(!myIcon);
    setTerminate(true);
        if(friend_id !== undefined){
            let {user_id} = userdata;
            let friendName = friend_id;
            let data = {
                sender_id: user_id,
                recipient_id: friendName
            }
            socket.emit('terminateVideo', data);;

        }

}
let displayIcon = () => {
     let iconContainer = <div className = {`${styles.container__iconfont} ${myIcon && styles.toggled}`} onClick = {() => {toggleIcons(iconName)}}>
          <FontAwesomeIcon icon = {`${iconName}`}/>
          </div>  
    
    let iconVideo = 
        <div>
                <div className = {`col ${styles.container__iconfont} ${myIcon && styles.togglephone}`} onClick = {() => {toggleIcons(iconName)}}>
                  <FontAwesomeIcon icon = {`${iconName}`} className = {`${styles.icon__phone} ${myIcon && styles.toggled}`}/>
                  </div>
                  { myIcon &&
                  <div className = {`col ${styles.container__phone} ${myIcon && styles.toggled}`} >
        <div className = {styles.container__message}>end video-call?</div>
        <div className = {styles.container__button}>
        <Button size = 'sm' onClick = {terminateStream} className = {styles.button}>Yes</Button>             
        <Button size = 'sm' className = {styles.button} onClick = {() => {toggleIcons(iconName)}}>no</Button>

            </div>
                  </div>   
                  
                  }
        </div>


        if(iconName !== 'phone'){
            return (
                    iconContainer
                ) 
        } else {
            return (
                iconVideo
            )
        }
    }

return (
        displayIcon()
    )


}

export default SetIcon;