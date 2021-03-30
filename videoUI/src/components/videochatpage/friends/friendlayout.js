import React, { useState, useEffect } from 'react';
import styles from './friendlayout.module.scss';
import {Container, Row, Col, Image, Button, Tabs, Tab, Spinner} from 'react-bootstrap';
import axios from 'axios';
import {onlineStatus} from '../helpers/onlinestatus';
import DisplayProfile from '../notifications/displayProfile';
import RenderButton from '../utilities/addbutton';
import VideoButton from '../utilities/videochatbutton';
const FriendLayout = ({userdata,myFollowers,followList, myFollowing,setActiveKey,initVideoChat,dispatch,socket, ...props}) => {
  useEffect(() => {
    console.log(followList);
  }, [myFollowers, myFollowing]);

    let [friendsList, setAllFriends] = useState([]);
    let [onlineUsers, setAsOnline] = useState([]);

useEffect(() => {
  onlineStatus(socket,userdata,myFollowers, setAsOnline);
}, []);

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
                <Col lg = {10} xl = {{span: 8, offset: 0}} className = {`${styles.container__profile}`}>
          
           <DisplayProfile onlineStatus = {onlineUsers.includes(el[followType]) ? true : false} myFollowers = {myFollowers} myFollowing = {myFollowing} user_id = {el[followType]} username = {el.username} date = {date} render = { () => {
            return <RenderButton type = {type} userdata = {userdata} user_id = {el[followType]} callback = {dispatch} callbackData = {action} />}} friendsList = {true} />
            </Col>
            <Col xl = {2} className = {styles.column__following}>
            <VideoButton socket = {socket} userdata = {userdata} initVideoChat = {initVideoChat} setActiveKey = {setActiveKey} username = {el.username} user_id = {el[followType]} bio = {el.bio} date = {date}/>
            </Col>
          </>  
          )
          }
      }))
    } 
  }
    return(
        <Container className = {styles.container} fluid>
               <Row>
          <Col xl = {{span: 10, offset: 1}} className = {styles.container__header}>
          <h1>Friends</h1>
          </Col>
      </Row>
      <Row className = {styles.row}>
      <Col xl = {{span: 10, offset: 1}}>
            
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className = {styles.container__tabs} >
  <Tab eventKey="home" title="Followers">
    <Row>
{displayFriendsList(followList, 'followers')}
    </Row>
  </Tab>
  <Tab eventKey="profile" title="Following">
    <Row>                      
    {displayFriendsList(followList, 'following')}
    </Row>
  </Tab>
  </Tabs>
  </Col>
  </Row>
  </Container>
    )
}
export default FriendLayout