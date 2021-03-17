import React, {useState, useEffect, useReducer} from 'react';
import {Row,Nav,Button, Col, Container,ListGroup, Collapse,Spinner, Tab} from 'react-bootstrap';
import Bio from '../dashboard/bio';
import FriendLayout from '../friends/friendlayout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import VideoModal from '../utilities/modal';
import io from 'socket.io-client';
import VideoUi from '../videodesign/myvideo';
import styles from './videochat.module.scss';
import Profilepicture from '../dashboard/profilepicture';
import Userbar from '../rightsidebar/userbar';
import Searchbar from '../searchbar/search';
import Logout from '../dashboard/logout';
import ListBar from '../dashboard/listgroup';
import RequestNotification from '../notifications/Requestnotification';

const Sidebar = ({userdata, dispatch, followers,following,handleLogout, ...props}) => {

    let [socket, initSocket] = useState(io(`${process.env.REACT_APP_SITE_URL}`));
    let [key, setKey] = useState('#link2');
    let [arrow, setArrow] = useState(true);
    let [modalState, setModal] = useState(true);

    let [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        setVid();
    });

    let setActiveKey = (key) => {
        setKey(key);
      }
      let toggleSidebar = () => {
        setArrow(!arrow);
      }
      let toggleModal = () => {
          setModal(true);
      }

      let initVideoChat = (username, user_id, bio, date) => {
        let userInfo = {
          username,
          user_id,
          bio,
          date
        }
        try{
          setUserInfo(userInfo);
        } catch(err) {
        }
      }
      let setVid = () => {
        socket.on('initVideo', data => {
            let {user_id, username} = data;
            let userInfo = {
                user_id,
                username
            }
            setUserInfo(userInfo);
            setModal(true);   
         console.log(modalState);
        });
      }

    return (
        <Tab.Container className = {styles.container__alltabs} activeKey = {key}>
   
        <Row className = {styles.container__row} noGutters = {true}>
            <VideoModal show = {modalState} onHide = {() => setModal(false)} setActiveKey = {setActiveKey} username = {userInfo.username}/>
           <Col lg = {arrow ? 2 : 1} className = {styles.container__first}>
           <Col sm = {2} xs = {4} lg = {12} className = {styles.container__image}>
             {    arrow ? <>
                     <Profilepicture userdata = {userdata}/>  
                     <Bio userdata = {userdata} />  
                     </>
                     :  null
             }
           </Col> 
           <Col lg = {12} className = {`${styles.container__icon} ${!arrow && styles.toggled}`} onClick = {toggleSidebar}>
             <div className = {`${styles.icon__div} ${!arrow && styles.toggled}`}>
       
             {arrow ?   <FontAwesomeIcon icon = 'arrow-left' className = {`${styles.icon} `}/>
       :   <FontAwesomeIcon icon = 'arrow-right' className = {`${styles.icon} ${!arrow && styles.toggled}`}/>
       }
           </div>
           </Col>
           <Col lg = {12} className = {styles.container__columnaz}>
           <ListBar arrow = {arrow} setActiveKey = {setActiveKey} key = {key}/>
           </Col>
           <Logout lg = {12} handleLogout = {handleLogout} arrow = {arrow}/>
           </Col>
           <Col className = {styles.container__column__tabcontent} lg = {10}>
           <Tab.Content className = {styles.container__tabcontent}>
               <Tab.Pane eventKey="#link1" className = {styles.container__tabpane__videochat}>
                 <VideoUi socket = {socket} userdata = {userdata} myFollowers = {followers}
                 render = {() => {
                   if(Object.keys(userInfo).length === 0) {
                     return <Userbar/>
                   } else {
                     return <Userbar username = {userInfo.username} bio = {userInfo.bio} user_id = {userInfo.user_id} date = {userInfo.date} />
                   }
                 }} />
               </Tab.Pane>
       
               <Tab.Pane eventKey="#link2" className = {styles.container__tabpane__friends}>
               <FriendLayout socket = {socket} initVideoChat = {initVideoChat} setActiveKey = {setActiveKey} userdata = {userdata} myFollowers = {followers} myFollowing = {following} dispatch = {dispatch}/>
               </Tab.Pane>
       
               <Tab.Pane eventKey="#link3" className = {styles.container__tabpane__notifications}>
                 <RequestNotification userdata = {userdata} myFollowers = {followers} myFollowing = {following} dispatch = {dispatch} />
               </Tab.Pane>
               <Tab.Pane eventKey= {`#search`} className = {styles.container__tabpane__search}>
                 <Searchbar userdata = {userdata} myFollowers = {followers} myFollowing = {following} dispatch = {dispatch} />
               </Tab.Pane>
               </Tab.Content>
           </Col>
           </Row>
           </Tab.Container>
    )
}

export default Sidebar;