import React, { useState, useEffect } from 'react';
import styles from './friendlayout.module.scss';
import {Container, Row, Col, Image, Button, Tabs, Tab, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {onlineStatus} from '../helpers/onlinestatus';
import DisplayProfile from '../notifications/displayProfile';
import RenderButton from '../utilities/addbutton';
import VideoButton from '../utilities/videochatbutton';
const FriendLayout = ({userdata,myFollowers,followList, myFollowing,setActiveKey,initVideoChat,dispatch,socket,setRefresh, refreshStatus, ...props}) => {
    let [friendsList, setAllFriends] = useState([]);
    let [onlineUsers, setAsOnline] = useState([]);
useEffect(() => {
  onlineStatus(socket,userdata,myFollowers, setAsOnline);
}, []);

useEffect( async () => {
  let {user_id} = userdata;
  let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendinfo/${user_id}`);
  setAllFriends(data);
}, [myFollowers, myFollowing]);

    useEffect(() => {
      let {user_id} = userdata;
      let myinfo = {
          user_id: user_id,
          isOnline: true
      }
      socket.emit('isOnline', myinfo);
  }, [onlineUsers]);

  let displayFriendsList = (friendsList, followType) => {
 if(friendsList.length > 0){
      return (friendsList.map((el, index, arr) => {
        let action;
        let type;
        let date = new Date(el.creation_date).toLocaleDateString();
          if(el[followType] !== null){
            if(!(myFollowing.includes(el[followType]))){
                type = 'follow back';
                action = 'follow';
            } else {
              type = 'following';
              action = 'unfollow';
            }
          return ( 
          <>
         <Col lg = {10} xl = {{span: 8, offset: 0}} className = {`${styles.container__profile}`} md = {10} sm = {10}>
          <DisplayProfile onlineStatus = {onlineUsers.includes(el[followType]) ? true : false} myFollowers = {myFollowers} myFollowing = {myFollowing} user_id = {el[followType]} username = {el.username} date = {date} render = { () => {
            return <RenderButton type = {type} userdata = {userdata} user_id = {el[followType]} callback = {dispatch} callbackData = {action} />}} friendsList = {true} />
            </Col>
            <Col xl = {2} className = {styles.column__following} lg = {2} md = {2} sm = {2}>
            <VideoButton socket = {socket} userdata = {userdata} initVideoChat = {initVideoChat} setActiveKey = {setActiveKey} username = {el.username} user_id = {el[followType]} bio = {el.bio} date = {date}/>
            </Col>
          </>  
          )
          }
      })
      )
    }
  }
    return(
        <Container className = {styles.container} fluid>
               <Row>
          <Col xl = {{span: 11, offset: 0}} className = {styles.container__header}>
          <div className = {` d-flex flex-direction-column align-items-center ${styles.notification__header__container}`}>
            <p className = {styles.text__header}>Friends</p>
        <FontAwesomeIcon icon = 'cog' className = {styles.text__icon} />        
            </div>
          </Col>
      </Row>
      <Row className = {styles.row}>

      <Col xl = {{span: 12, offset: 0}}>
            
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className = {styles.container__tabs} >
  <Tab eventKey="home" title="Followers">
    <Row>
{displayFriendsList(friendsList, 'followers')}
    </Row>
  </Tab>
  <Tab eventKey="profile" title="Following">
    <Row>                      
    {displayFriendsList(friendsList, 'following')}
    </Row>
  </Tab>
  </Tabs>
  </Col>
  </Row>
  </Container>
    )
}
export default FriendLayout