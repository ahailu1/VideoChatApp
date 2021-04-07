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

const Sidebar = ({userdata, dispatch,followList, followers,following,handleLogout,refreshStatus,setRefresh,  ...props}) => {

    let [socket, initSocket] = useState(io(`${process.env.REACT_APP_SITE_URL}`));
    let [key, setKey] = useState('#link2');
    let [arrow, setArrow] = useState(true);
    let [modalState, setModal] = useState(false);

    let [friendInfo, setFriendInfo] = useState({})

    let setActiveKey = (key) => {
        setKey(key);
      }
      let toggleSidebar = () => {
        setArrow(!arrow);
      }
      let toggleModal = () => {
          setModal(true);
      }

      let initVideoChat = (username, user_id, bio, date, onlineStatus) => {
        let friendInfo = {
          username,
          user_id,
          bio,
          isOnline: onlineStatus,
          date,
          hasRequested:true
        }
        try{
          setFriendInfo(friendInfo);
        } catch(err) {
        }
      }
      

    return (
        <Tab.Container className = {styles.container__alltabs} activeKey = {key}>   
        <Row className = {styles.container__row} noGutters = {true}>
        <VideoModal userdata = {userdata} setFriendInfo = {setFriendInfo} setModal = {setModal} socket = {socket} show = {modalState} onHide = {() => setModal(false)} setActiveKey = {setActiveKey}/>
           <Col lg = {arrow ? 2 : 1} className = {styles.container__first}>
           <Col sm = {2} xs = {4} lg = {12} className = {styles.container__image}>
             {    
             arrow ? <>
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
           <ListBar arrow = {arrow} setActiveKey = {setActiveKey} tabKey = {key}/>
           </Col>
           <Logout lg = {12} handleLogout = {handleLogout} arrow = {arrow}/>
           </Col>
           <Col className = {`${styles.container__column__tabcontent}`} lg = {10}>
           <Tab.Content className = {styles.container__tabcontent}>
               <Tab.Pane eventKey="#link1" className = {styles.container__tabpane__videochat}>
                 <VideoUi friend_id = {friendInfo.user_id} socket = {socket} userdata = {userdata} myFollowers = {followers} hasRequested = {friendInfo.hasRequested} hasAccepted = {friendInfo.hasAccepted}
                 render = {() => {
                   if(Object.keys(friendInfo).length === 0) {
                     return <Userbar/>
                   } else {
                     return <Userbar hasAccepted = {friendInfo.hasAccepted} isOnline = {friendInfo.isOnline} username = {friendInfo.username} bio = {friendInfo.bio} friend_id = {friendInfo.user_id} date = {friendInfo.date} />
                   }
                 }} />
               </Tab.Pane>
               <Tab.Pane eventKey="#link2" className = {styles.container__tabpane__friends}>
               <FriendLayout refreshStatus = {refreshStatus} setRefresh = {setRefresh} followList = {followList} socket = {socket} initVideoChat = {initVideoChat} setActiveKey = {setActiveKey} userdata = {userdata} myFollowers = {followers} myFollowing = {following} dispatch = {dispatch}/>
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