import React, {useEffect, useState} from 'react';
import {ListGroup,Button,Col, Spinner,Dropdown, DropdownButton,Modal,Row, Image } from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './modal.module.scss';
const VideoModal = ({setActiveKey,socket,userdata,setModal,onHide,setFriendInfo, ...props}) => {

    useEffect(() => {
        setVid();
    });
    let [modalInfo, setModalInfo] = useState({});

    let setVid = () => {
        let {user_id} = userdata;
        socket.on(`init_video_${user_id}`,(data) => {
          let {recipient_id,sender_id, username} = data;
            let friendInfo = {
                user_id: sender_id,
                username: username,
                recipient_id: recipient_id
            }
            setModalInfo(friendInfo);
            setModal(true);   
        });
      }
    let acceptRequest = () => {
        let {user_id, username, recipient_id} = modalInfo;
        let data = {
            sender_id: userdata.user_id,
            recipient_id : user_id,
        }
        let profile = {
            user_id,
            username,
            recipient_id,
            hasAccepted: true,
        }
        setActiveKey('#link1');
        setFriendInfo(profile);
        onHide();
        socket.emit('confirmRequest', data);
    }
    let declineButton = () => {
        let {user_id, username, recipient_id} = modalInfo;
        let data = {
            sender_id: userdata.user_id,
            recipient_id : user_id,
        }
        onHide();
        socket.emit('declineRequest', data);

    }


    return (
    <Modal {...props} size = 'md' aria-labelledby="contained-modal-title-vcenter" className = {styles.modal} animation = {true}>

<Row className = {styles.container__heading}>

<Col className = {styles.container__headingcontent}>
<p className = {styles.modal__heading}>Chat Request</p>
<FontAwesomeIcon icon = 'video' className = {styles.modal__icon}/>
</Col>

</Row>

<Row className = {styles.container__row}>

    <Col className = {styles.container__image} lg = {2} xl = {6}>
    <Image className = {styles.modal__image} src = '/test123--profilepicture.jpg' rounded />
    
    <div className = {styles.container__username}>
    <span className = {styles.modal__username}>{modalInfo.username} </span>
    </div>

    </Col>

    <Col className = {styles.container__message} lg = {3} xl = {6}>
   
    <Col xl = {12} className = {styles.container__content}>
    <p className = {styles.modal__text}>
    <span className = {styles.modal__username}>{modalInfo.username} </span>
    <span>has requested to video call you</span>
    </p>
    </Col>

   <Col className = {styles.container__button} xl = {12}>
   <Button onClick={acceptRequest} className = {styles.modal__button}>Accept</Button>
   <Button onClick={declineButton} className = {styles.modal__button}>Decline</Button>   
   </Col>
   <svg viewBox="50 50 410 400" xmlns="http://www.w3.org/2000/svg" width="100%" className= {styles.svg}>
   <path id="blob" d="M432.5,322.5Q366,395,288.5,408.5Q211,422,152,374Q93,326,79,243.5Q65,161,134.5,104Q204,47,278,84Q352,121,425.5,185.5Q499,250,432.5,322.5Z" fill="#272727"></path>
   </svg>
   </Col>
   </Row>

</Modal>
    )
}

export default VideoModal;