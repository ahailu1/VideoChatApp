import React, {useState, useEffect, useReducer} from 'react';
import {Row,Nav, Col, Container,ListGroup, Collapse,Spinner, Tab} from 'react-bootstrap';
import VideoUi from './videodesign/myvideo';
import Bio from '../videochatpage/dashboard/bio';
import FriendLayout from './friends/friendlayout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Profilepicture from './dashboard/profilepicture';
import Userbar from './rightsidebar/userbar';
import Searchbar from './searchbar/search';
import styles from './videochat.module.scss';
import Logout from './dashboard/logout';
import ListBar from './dashboard/listgroup';
import RequestNotification from './notifications/Requestnotification';
const Initvideo = ({userdata,handleLogout,tabKey = '#link2', ...props}) => {

let [userInfo, setUserInfo] = useState({})
let [loaded, setLoading] = useState(false);
let [key, setKey] = useState('#link2');

let modifyState = (myFriendsList, action) => {
  switch(action.type){
    case 'follow' :
      return {
        following: myFriendsList.following.concat(action.data),
        followers: myFriendsList.followers
      }
    case 'initFriendsList' : 
    return {
      followers: action.followers,
      following: action.following
    }
    case 'unfollow' : 
    let newList = myFriendsList.following.filter(el => {
      return el !== action.data
    })
    return {
      following: newList,
      followers: myFriendsList.followers
    }
  }
}
let friendsList = {
  following: [],
  followers: []
}
  let [arrow, setArrow] = useState(true);
  let [myFriendsList, dispatch] = useReducer(modifyState, friendsList)
let toggleSidebar = () => {
  setArrow(!arrow);
}
let initVideoChat = (username, user_id, bio, date) => {
  let userInfo = {
    username,
    user_id,
    bio,
    date
  }
  setLoading(false);
  try{
    setUserInfo(userInfo);
    console.log(userInfo);
    setLoading(true);
  } catch(err) {
    setLoading(false);
  }
}
useEffect(() => {
  console.log(props);
    fetchFriendsList(userdata);
}, []);

let setActiveKey = (key) => {
  setKey(key);
}
let fetchFriendsList = async ({user_id}) => {
  setLoading(false);
    try {
        let {data} = await axios.get(`${process.env.REACT_APP_SITE_URL}/api/friendsId/${user_id}`);
        let following  = [];
        let followers  = [];
        if(data.length > 0) {
          data.forEach(el => {
            if(el.followers !== null){
              followers.push(el.followers);
            }
            if(el.following !== null){
              following.push(el.following)
            }
          });
        }
        dispatch({type: 'initFriendsList', followers:followers, following:following});
        setLoading(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
}

return(

    <Tab.Container className = {styles.container__alltabs} activeKey = {key}>

 <Row className = {styles.container__row} noGutters = {true}>
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
          <VideoUi userdata = {userdata}
          render = {() => {
            if(Object.keys(userInfo).length === 0) {
              console.log('returning your fucking bio')
              return <Userbar/>
            } else {
              console.log(userInfo);
              return <Userbar username = {userInfo.username} bio = {userInfo.bio} user_id = {userInfo.user_id} date = {userInfo.date} />
            }
          }} />
        </Tab.Pane>
        <Tab.Pane eventKey="#link2" className = {styles.container__tabpane__friends}>
        <FriendLayout initVideoChat = {initVideoChat} setActiveKey = {setActiveKey} userdata = {userdata} myFollowers = {myFriendsList.followers} myFollowing = {myFriendsList.following} dispatch = {dispatch}/>
        </Tab.Pane>

        <Tab.Pane eventKey="#link3" className = {styles.container__tabpane__notifications}>
          <RequestNotification userdata = {userdata} myFollowers = {myFriendsList.followers} myFollowing = {myFriendsList.following} dispatch = {dispatch} />
        </Tab.Pane>
        <Tab.Pane eventKey="#link">
        </Tab.Pane>
        <Tab.Pane eventKey= {`#search`} className = {styles.container__tabpane__search}>
          <Searchbar userdata = {userdata} myFollowers = {myFriendsList.followers} myFollowing = {myFriendsList.following} dispatch = {dispatch} />
        </Tab.Pane>
        </Tab.Content>
    </Col>
    </Row>
    </Tab.Container>
)
}
export default Initvideo;