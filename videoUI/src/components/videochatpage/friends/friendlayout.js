import React, { useState, useEffect } from 'react';
import styles from './friendlayout.module.scss';
import {Container, Row, Col, Image, Button, Tabs, Tab, Spinner} from 'react-bootstrap';
import axios from 'axios';
import DisplayProfile from '../notifications/displayProfile';
import RenderButton from '../utilities/addbutton';
import VideoButton from '../utilities/videochatbutton';
const FriendLayout = ({userdata,myFollowers, myFollowing,setActiveKey,initVideoChat,dispatch,socket, ...props}) => {

  useEffect(() => {
      fetchFriendsList();

  }, [myFollowers, myFollowing]);

    let [friendsList, setAllFriends] = useState([]);
    let [onlineUsers, setAsOnline] = useState([]);

useEffect(() => {
testOnline();
testOffline();
}, []);

    useEffect(() => {
      let {user_id} = userdata;
      let myinfo = {
          user_id: user_id,
          isOnline: true
      }
      socket.emit('isOnline', myinfo);
  }, [onlineUsers]);

  let fetchFriendsList = async () => {
    let {user_id} = userdata;
    try{
      let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendinfo/${user_id}`);
      console.log(data);
      console.log(myFollowers)
      setAllFriends(data);
    } catch (err) {
      throw new Error(err)
    }
  }
  let testOnline =  () => {
    
    socket.on('connect', () => {
        let {user_id} = userdata;
        let data = {
            user_id: user_id,
            isOnline: true
        }
        socket.emit('isOnline',data);
    });
    socket.on('onlineStatus', (data) => {
        let friend_id = data.user_id;
    if(myFollowers.includes(friend_id)){
             setAsOnline(prev => {
                 let newarr = [...prev];
                 if(newarr.includes(friend_id)){
                     return prev;
                 } else {
                    newarr = newarr.concat(friend_id);
                    console.log([newarr, friend_id]);
                    return [...newarr];   
                 }
            });
    }
});
}
let testOffline = () => {
socket.on('isOffline', (data) => {
    let user_id = data.user_id;       
 
    setAsOnline(prev => {
        let offlineArr = [...prev].filter(el => {
            return el != user_id;
        });
        return [...offlineArr];
    });
});
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
<Col xl = {{span: 9, offset: 0}} >
{friendsList.length > 0 && friendsList.map(el => {
  console.log([onlineUsers, myFollowing, myFollowers])
        if(el.followers !== null){
          return <DisplayProfile socket = {socket} onlineStatus = {onlineUsers.includes(el.followers) ? true : false} callback = {dispatch} user_id = {el.followers} myFollowing = {myFollowing} myFollowers = {myFollowers} friendsList = {true} username = {el.username} date = {el.creation_date} render = { () => {return null}} />
        } 
      })}
</Col>
    </Row>
  </Tab>

  <Tab eventKey="profile" title="Following">
    <Row>

      {friendsList.length > 0 && friendsList.map(el => {
        let date = new Date(el.creation_date).toLocaleDateString();
          if(el.following !== null){
          return( 
          <>
                <Col lg = {10} xl = {{span: 10, offset: 0}}>
          
           <DisplayProfile onlineStatus = {onlineUsers.includes(el.following) ? true : false} myFollowers = {myFollowers} myFollowing = {myFollowing} user_id = {el.following} username = {el.username} date = {date} render = { () => {
            return <RenderButton userdata = {userdata} user_id = {el.following} callback = {dispatch} callbackData = 'unfollow' loading = {true} />}} friendsList = {true} />
            </Col>
            <Col xl = {2} className = {styles.column__following}>
            <VideoButton socket = {socket} userdata = {userdata} initVideoChat = {initVideoChat} setActiveKey = {setActiveKey} username = {el.username} user_id = {el.following} bio = {el.bio} date = {date}/>
            </Col>
          </>  
          )
          }
      })}     
    </Row>
  </Tab>
  </Tabs>
  </Col>

  </Row>
  </Container>
    )

}

export default FriendLayout